import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let cartHTML = '';
cart.forEach((cartItem) => {
  products.forEach((product) => {
    if (cartItem.id === product.id) {
      cartHTML += `
        <div class="checkout-item-container">
          <div class="selected-date">Delivery date: Tuesday, July 21</div>
          <div class="checkout-item-inner-grid">
            <div class="item-image-container">
              <img src=${product.image}>
            </div>
            <div class="item-description-container">
              <div class="item-name">${product.name}</div>
              <div class="item-price">$${(product.priceCents / 100).toFixed(2)}</div>
              <div class="item-quantity">Quantity: ${cartItem.quantity} Update Delete</div>
            </div>
            <div class="delivery-options-container">
              <div class="delivery-option-title">Choose a delivery option:</div>
              <div class="delivery-option-container">
                <input type="radio">
                <div>
                  <div class="delivery-option-date">Monday, July 27</div>
                  <div class="delivery-option-shipping">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option-container">
                <input type="radio">
                <div>
                  <div class="delivery-option-date">Tuesday, July 21</div>
                  <div class="delivery-option-shipping">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option-container">
                <input type="radio">
                <div>
                  <div class="delivery-option-date">Friday, July 17</div>
                  <div class="delivery-option-shipping">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });
});

document.querySelector('.js-checkout-items').innerHTML = cartHTML;
