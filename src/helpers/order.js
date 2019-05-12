
const getTotalAmount = (shoppingCartItems) => {
  let totalAmount = 0;
  shoppingCartItems.map((item) => {
    totalAmount += parseFloat(item.sub_total);
  });
  return totalAmount;
};

export default getTotalAmount;
