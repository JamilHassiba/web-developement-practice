import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { TAX_RATE } from '../utils/moneyUtils.js';

export function calculateItemsTotal() {
    return cart.reduce((total, cartItem) => {
        const matchingProduct = products.find(product => product.id === cartItem.id);
        return total + matchingProduct.priceCents * cartItem.quantity;
      }, 0);
  }

export function calculateDeliveryTotal() {
    return cart.reduce((total, cartItem) => {
        const deliveryOption = deliveryOptions
            .find(option => option.id === cartItem.deliveryOptionId);
        return total + deliveryOption.priceCents;
        }, 0);
}

export function calculateBeforeTaxTotal() {
    return calculateItemsTotal() + calculateDeliveryTotal();
}

export function calculateTax() {
    return calculateBeforeTaxTotal() * TAX_RATE;
}

export function calculateOrderTotal() {
    return calculateBeforeTaxTotal() + calculateTax();
}
