// helper/getDiscountToken.js
export async function getDiscountToken(col, userId) {
    const discountData = await getQueryData(col, "user_id", userId);
    return discountData?.[0]?.token || null;
  }
  