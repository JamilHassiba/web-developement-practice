import { cart, calculateCartQuantity } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatPrice } from '../utilities/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

const TAX = 0.1;

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
    <button class="place-order-button primary-button">Place your order</button>
  `;
  document.querySelector('.js-order-summary-container').innerHTML = paymentHTML;

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
        return total + deliveryOption.priceCents * cartItem.quantity;
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