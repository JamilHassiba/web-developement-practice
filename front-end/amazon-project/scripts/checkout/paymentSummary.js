import { cart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatPrice } from '../utilities/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { TAX } from '../data/tax.js';

export default function renderPaymentSummary() {
  let paymentHTML = `
    <div class="order-summary-title">Order Summary</div>
    <div class="order-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div>$${formatPrice(calculateItemsTotal())}</div>
    </div>
    <div class="order-summary-row">
      <div>Shipping & handling:</div>
      <div>$${formatPrice(calculateDeliveryTotal())}</div>
    </div>
    <div class="order-summary-row order-subtotal">
      <div>Total before tax:</div>
      <div>$${formatPrice(calculateBeforeTaxTotal())}</div>
    </div>
    <div class="order-summary-row">
      <div>Estimated tax (10%):</div>
      <div>$${formatPrice(calculateTax())}</div>
    </div>
    <div class="order-summary-row order-total">
      <div>Order total:</div>
      <div>$${formatPrice(calculateOrderTotal())}</div>
    </div>
    <button class="primary-button place-order-button js-place-order-button">
      Place your order
    </button>
  `;
  document.querySelector('.js-order-summary-container').innerHTML = paymentHTML;

  if (cart.length === 0) {
    document.querySelector('.js-place-order-button')
      .classList.add('place-order-button-empty');
  } else {
    document.querySelector('.js-place-order-button')
      .classList.remove('place-order-button-empty');
  }

  function calculateItemsTotal() {
    return cart.reduce((total, cartItem) => {
        const matchingProduct = products.find(product => product.id === cartItem.id);
        return total + matchingProduct.priceCents * cartItem.quantity;
      }, 0);
  }

  function calculateDeliveryTotal() {
    return cart.reduce((total, cartItem) => {
        const deliveryOption = deliveryOptions
          .find(option => option.id === cartItem.deliveryOptionId);
        return total + deliveryOption.priceCents;
      }, 0);
  }

  function calculateBeforeTaxTotal() {
    return calculateItemsTotal() + calculateDeliveryTotal();
  }

  function calculateTax() {
    return calculateBeforeTaxTotal() * TAX;
  }

  function calculateOrderTotal() {
    return calculateBeforeTaxTotal() + calculateTax();
  }
}