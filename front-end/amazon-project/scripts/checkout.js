import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatPrice } from './utilities/money.js';

let cartHTML = '';
cart.forEach((cartItem) => {
  let matchingProduct = products.find((product) => cartItem.id === product.id);
  cartHTML += `
    <div class="checkout-item-container js-checkout-item-container-${matchingProduct.id}">
      <div class="selected-date">Delivery date: Tuesday, July 21</div>
      <div class="checkout-item-inner-grid">
        <div class="item-image-container">
          <img src=${matchingProduct.image}>
        </div>
        <div class="item-description-container">
          <div class="item-name">${matchingProduct.name}</div>
          <div class="item-price">$${formatPrice(matchingProduct.priceCents)}</div>
          <div class="item-quantity">
            Quantity: ${cartItem.quantity}
              <span class="link">Update</span>
              <span class="link js-delete-link" data-id="${matchingProduct.id}">Delete</span>
          </div>
        </div>
        <div class="delivery-options-container">
          <div class="delivery-option-title">Choose a delivery option:</div>
          <div class="delivery-option-container">
            <input type="radio" name="${matchingProduct.id}" checked>
            <div>
              <div class="delivery-option-date">Monday, July 27</div>
              <div class="delivery-option-shipping">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option-container">
            <input type="radio" name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Tuesday, July 21</div>
              <div class="delivery-option-shipping">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option-container">
            <input type="radio" name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Friday, July 17</div>
              <div class="delivery-option-shipping">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-checkout-items').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((deleteLinkElem) => {
    deleteLinkElem.addEventListener('click', () => {
      const deleteItemId = deleteLinkElem.dataset.id;
      removeFromCart(deleteItemId);
      document.querySelector(
        `.js-checkout-item-container-${deleteItemId}`
      ).remove();
    });
  });
