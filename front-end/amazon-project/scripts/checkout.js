import { cart, removeFromCart, calculateCartQuantity, updateItemQuantity } from '../data/cart.js';
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
          <div class="item-quantity-container">
            Quantity: 
              <span class="item-quantity-label js-item-quantity-label">${cartItem.quantity}</span>
              <span class="link update-link js-update-link" data-id="${matchingProduct.id}">Update</span>
              <input type="number" class="quantity-input js-quantity-input"
                data-id="${matchingProduct.id}" min="0">
              <span class="link save-link js-save-link" data-id="${matchingProduct.id}">Save</span>
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

document.querySelectorAll('.js-update-link')
  .forEach((updateLinkElem) => {
    updateLinkElem.addEventListener('click', () => {
      const itemId = updateLinkElem.dataset.id;

      const checkoutContainer = document.querySelector(`.js-checkout-item-container-${itemId}`)
      checkoutContainer.classList.add('is-editing-quantity');

      const itemQuantity = Number(checkoutContainer.querySelector('.js-item-quantity-label').innerText);
      checkoutContainer.querySelector('input').value = itemQuantity;
    });
  });

document.querySelectorAll('.js-save-link')
  .forEach((saveLinkElem) => {
    saveLinkElem.addEventListener('click', () => {
      saveQuantity(saveLinkElem.dataset.id);
    });
  });

document.querySelectorAll('.js-quantity-input')
  .forEach((inputElem) => {
    inputElem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveQuantity(inputElem.dataset.id);
      }
    });
  });

document.querySelectorAll('.js-delete-link')
  .forEach((deleteLinkElem) => {
    deleteLinkElem.addEventListener('click', () => {
      const itemId = deleteLinkElem.dataset.id;
      removeFromCart(itemId);
      removeItemFromHTML(itemId);
      updateCartQuantity();
    });
  });

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-header-quantity').innerText = cartQuantity;
}

updateCartQuantity();

function removeItemFromHTML(itemId) {
  document.querySelector(
      `.js-checkout-item-container-${itemId}`
    ).remove();
}

function saveQuantity(itemId) {
  const checkoutContainer = document.querySelector(`.js-checkout-item-container-${itemId}`)
  checkoutContainer.classList.remove('is-editing-quantity');

  const inputedQuantity = Number(checkoutContainer.querySelector('input').value);
  if (inputedQuantity === 0) {
    removeFromCart(itemId);
    removeItemFromHTML(itemId);
  } else if (inputedQuantity < 0) {
    alert("Not a valid quantity");
  } else {
    checkoutContainer.querySelector('.js-item-quantity-label').innerText = inputedQuantity;
    updateItemQuantity(itemId, inputedQuantity);
    updateCartQuantity();
  }
}
