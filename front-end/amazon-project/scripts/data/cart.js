export let cart;

loadFromStorage();

export function addToCart(id, quantity=1) {
  // Check if product is already in cart
  let matchingItem = cart.find((cartItem) => cartItem.id === id);

  // Increase product quantity if already in cart
  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  // Add to cart otherwise
  else {
    cart.push({
      id,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(itemId) {
  cart = cart.filter(cartItem => cartItem.id !== itemId);
  saveToStorage();
}

export function calculateCartQuantity() {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

export function updateItemQuantity(itemId, newQuantity) {
  cart.find(cartItem => cartItem.id === itemId).quantity = newQuantity;
  saveToStorage();
}

export function updateItemDeliveryId(itemId, deliveryOptionId) {
  cart.find(cartItem => cartItem.id === itemId).deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadFromStorage() {
  cart = JSON.parse((localStorage.getItem('cart'))) || [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
