import { products } from '../../data/products.js';
import { formatPrice } from '../utilities/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import renderPaymentSummary from "../checkout/paymentSummary.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateItemQuantity,
  updateItemDeliveryId,
} from '../../data/cart.js';

export default function renderOrderSummary() {
  // Update the header's cart quantity
  updateCartQuantity();
  
  // Render each cart item summary
  let cartHTML = '';
  cart.forEach((cartItem) => {
    let matchingProduct = products.find(product => cartItem.id === product.id);
    cartHTML += `
      <div class="checkout-item-container js-checkout-item-container-${matchingProduct.id}">
        <div class="selected-date">Delivery date: ${getDeliveryDate(cartItem.deliveryOptionId)}</div>
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
            ${generateDeliveryHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  cartHTML = cartHTML || `
    <div class="empty-cart-container">
      <div class="empty-cart-text">Your cart is empty.</div>
      <a href="index.html">
        <button class="view-products-button primary-button">View products</button>
      </a>
    </div>
  `;

  document.querySelector('.js-checkout-items').innerHTML = cartHTML;
  
  function generateDeliveryHTML(product, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = getDeliveryDate(deliveryOption.id);

      const price = Number(formatPrice(deliveryOption.priceCents));
      let priceString;
      if (price) {
        priceString = `$${price} - Shipping`;
      } else {
        priceString = 'FREE Shipping';
      }

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id ? 'checked' : '';

      html += `
        <div class="delivery-option-container js-delivery-option-container"
          data-cart-item-id="${cartItem.id}"
          data-selected-delivery-id="${deliveryOption.id}">
          <input type="radio" name="${product.id}" ${isChecked}>
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-shipping">${priceString}</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // Update delivery detials when option is selected
  document.querySelectorAll('.js-delivery-option-container')
    .forEach((optionElem) => {
      optionElem.addEventListener('click', () => {
        const {cartItemId, selectedDeliveryId} = optionElem.dataset;
        updateItemDeliveryId(cartItemId, selectedDeliveryId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // Display number input and save link when update link is clicked
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

  // Update cart item when save link is clicked
  document.querySelectorAll('.js-save-link')
    .forEach((saveLinkElem) => {
      saveLinkElem.addEventListener('click', () => {
        saveQuantity(saveLinkElem.dataset.id);
      });
    });

  // Update cart item when enter is clicked in number input
  document.querySelectorAll('.js-quantity-input')
    .forEach((inputElem) => {
      inputElem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          saveQuantity(inputElem.dataset.id);
        }
      });
    });

  // Remove item from cart when delete link is clicked
  document.querySelectorAll('.js-delete-link')
    .forEach((deleteLinkElem) => {
      deleteLinkElem.addEventListener('click', () => {
        const itemId = deleteLinkElem.dataset.id;
        removeFromCart(itemId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  function updateCartQuantity() {
    document.querySelector('.js-header-quantity').innerText = calculateCartQuantity();
  }

  function saveQuantity(itemId) {
    const checkoutContainer = document.querySelector(`.js-checkout-item-container-${itemId}`)
    checkoutContainer.classList.remove('is-editing-quantity');

    const inputedQuantity = Number(checkoutContainer.querySelector('input').value);
    if (inputedQuantity === 0) {
      removeFromCart(itemId);
      renderOrderSummary();
      renderPaymentSummary();
    } else if (inputedQuantity < 0) {
      alert("Not a valid quantity");
    } else {
      updateItemQuantity(itemId, inputedQuantity);
      renderOrderSummary();
      renderPaymentSummary();
    }
  }

  function getDeliveryDate(deliveryOptionId) {
    const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    return deliveryDate.format('dddd, MMMM D');
  }

}
