import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";



async function applyDiscount(userId, totalAmount) {
  try {
    const discountCol = await getFirestoreCollection("discount");
    const userDiscount = await discountCol.where("user_id", "==", userId).get();

    if (!userDiscount.empty) {
      // Kullanıcının indirim tokenı varsa %20 indirim uygula
      const discountData = userDiscount.docs[0].data();
      if (discountData.token) {
        const discountedAmount = +(totalAmount * 0.8).toFixed(2); // %20 indirim
        return discountedAmount;
      }
    }
    return totalAmount; // İndirim yoksa orijinal tutarı döndür
  } catch (error) {
    console.error("Error applying discount:", error);
    return totalAmount; // Hata durumunda orijinal tutarı döndür
  }
}

// GET handler
export async function handlerAddProductCardGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const [{ user_id, ageSize, ...data }] = await getQueryData( // ageSize eklendi
      col,
      "user_id",
      decodedToken.userId
    );

    res.status(200).json(response(data));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// POST handler
export async function handlerAddProductCardPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const { product_id, ageSize } = req.body; // ageSize eklendi

    const card = await getQueryData(col, "user_id", decodedToken.userId);
    const userBasket = card?.[0];

    let newItem;
    let newItems;

    const itemIndex = userBasket.items.findIndex(
      (item) => item.id === product_id
    );

    if (itemIndex == -1) {
      const product = await getDataID(ROUTER.PRODUCTS, product_id);

      newItem = {
        ...product,
        count: 1,
        ageSize, // ageSize 
        amount: +product.price,
      };

      newItems = [...userBasket.items, newItem];
    } else {
      const findItem = { ...userBasket.items[itemIndex] };

      newItems = [...userBasket.items];

      const newCount = findItem?.count + 1;

      newItem = {
        ...findItem,
        count: newCount,
        ageSize, // ageSize eklendi
        amount: +(+findItem.price * newCount).toFixed(2),
      };

      newItems[itemIndex] = newItem;
    }

    const newdData = {
      items: newItems,
      total_count: newItems.reduce((sum, item) => sum + item.count, 0),
      total_item: newItems.length,
      user_id: decodedToken.userId,
      total_amount: +newItems
        .reduce((sum, item) => sum + parseFloat(item.amount), 0)
        .toFixed(2),
    };

    const data = await uptData(col, userBasket.id, newdData);

    // Tüm sepet 50 dakika sonra otomatik olarak silinsin
    setTimeout(async () => {
      try {
        // Sepeti boşalt
        await uptData(col, userBasket.id, emptyBasket(decodedToken.userId, ageSize)); 
        console.log(`Basket for user ID ${decodedToken.userId} cleared after 50 minutes.`);
      } catch (error) {
        console.error("Error clearing basket after 50 minutes:", error);
      }
    }, 3000000); // 50 dakika = 3000000 ms

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// DELETE handler
export async function handlerDeleteProductCard(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const { product_id, ageSize } = req.body; // ageSize eklendi

    const card = await getQueryData(col, "user_id", decodedToken.userId);
    const userBasket = card?.[0];

    const itemIndex = userBasket.items.findIndex(
      (item) => item.id === product_id
    );

    if (itemIndex == -1) {
      res.status(404).json({ error: "Product is undefined" });
    }

    const findItem = { ...userBasket.items[itemIndex] };

    let newItems = [...userBasket.items];

    if (findItem?.count === 1) {
      newItems = newItems.filter((item) => item.id !== product_id);
    } else {
      const newCount = findItem?.count - 1;

      const newItem = {
        ...findItem,
        count: newCount,
        ageSize, // ageSize eklendi
        amount: +(+findItem.price * newCount).toFixed(2),
      };

      newItems[itemIndex] = newItem;
    }

    const newdData = {
      items: newItems,
      total_count: newItems.reduce((sum, item) => sum + item.count, 0),
      total_item: newItems.length,
      user_id: decodedToken.userId,
      total_amount: +newItems
        .reduce((sum, item) => sum + parseFloat(item.amount), 0)
        .toFixed(2),
    };

    const data = await uptData(col, userBasket.id, newdData);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Clear handler
export async function handlerClearProductCardPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  const decodedToken = verifyJWT(idToken);

  try {
    const { basket_id, ageSize } = req.body; // ageSize eklendi

    if (!basket_id) {
      res.status(404).json({ error: "Invalid basket id" });
    }

    const { user_id, ...data } = await uptData(
      col,
      basket_id,
      emptyBasket(decodedToken.userId, ageSize) // ageSize eklendi
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
