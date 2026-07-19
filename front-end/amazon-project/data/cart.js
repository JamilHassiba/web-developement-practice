export let cart = JSON.parse((localStorage.getItem('cart'))) || [];

export function addToCart(id) {
  // Get selected quantity
  const quantity = Number(
    document.querySelector(`.js-product-quantity-selector-${id}`).value
  );
  
  // Check if product is already in cart
  let matchingProduct;
  cart.forEach((product) => {
    if (product.id === id) {
      matchingProduct = product;
    }
  });

  // Increase product quantity if already in cart
  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  }
  // Add to cart otherwise
  else {
    cart.push({
      id,
      quantity
    });
  }

  saveToStorage();
}

export function removeFromCart(id) {
  cart = cart.filter(cartItem => cartItem.id !== id );
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
