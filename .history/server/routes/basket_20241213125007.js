

// DELETE handler
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

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in the basket" });
    }

    const findItem = { ...userBasket.items[itemIndex] };
    let newItems = [...userBasket.items];

    if (findItem?.count === 1) {
      // Ürünü tamamen sepetten çıkar
      newItems = newItems.filter((item) => item.id !== product_id);
    } else {
      // Ürün sayısını azalt
      const newCount = findItem?.count - 1;

      const newItem = {
        ...findItem,
        count: newCount,
        ageSize, // ageSize eklendi
        amount: +(+findItem.price * newCount).toFixed(2),
      };

      newItems[itemIndex] = newItem;
    }

    const totalAmount = +newItems
      .reduce((sum, item) => sum + parseFloat(item.amount), 0)
      .toFixed(2);

    // İndirim kontrolü ve uygulama
    const { discountApplied, discountTotal } = await applyDiscountIfAvailable(
      decodedToken.userId,
      totalAmount
    );

    const newdData = {
      items: newItems,
      total_count: newItems.reduce((sum, item) => sum + item.count, 0),
      total_item: newItems.length,
      user_id: decodedToken.userId,
      total_amount: totalAmount,
      ...(discountApplied && { discount_total: discountTotal }), // İndirim uygulanmışsa yeni alan eklenir
    };

    const data = await uptData(col, userBasket.id, newdData);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
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
