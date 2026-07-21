import { cart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatPrice } from '../utils/moneyUtils.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import {
  calculateItemsTotal,
  calculateDeliveryTotal,
  calculateBeforeTaxTotal,
  calculateTax,
  calculateOrderTotal
} from './paymentCalculations.js';

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
}
