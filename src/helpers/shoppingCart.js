const calculateSubTotal = (cartItem) => {
  let subTotal = 0;
  const { price, discounted_price: discountedPrice } = cartItem.dataValues.Product;
  const { quantity } = cartItem.dataValues;
  if (discountedPrice === '0.00') {
    subTotal = price * quantity;
  } else {
    subTotal = discountedPrice * quantity;
  }
  return subTotal.toFixed(2).toString();
};

const getCart = (cartItems) => {
  const cart = [];
  cartItems.forEach((cartItem) => {
    const subTotal = calculateSubTotal(cartItem);
    const itemDetails = {
      item_id: cartItem.dataValues.item_id,
      name: cartItem.dataValues.Product.dataValues.name,
      attributes: cartItem.dataValues.attributes,
      price: cartItem.dataValues.Product.price,
      quantity: cartItem.dataValues.quantity,
      product_id: cartItem.dataValues.Product.dataValues.product_id,
      sub_total: subTotal,
      added_on: cartItem.dataValues.added_on,
      discounted_price: cartItem.dataValues.Product.discounted_price
    };
    cart.push(itemDetails);
  });
  return cart;
};

export default getCart;
