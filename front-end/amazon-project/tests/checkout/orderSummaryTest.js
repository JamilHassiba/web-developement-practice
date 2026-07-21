import renderOrderSummary from '../../scripts/checkout/orderSummary.js';
import { cart, loadFromStorage } from '../../scripts/data/cart.js';

describe('Test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: productId1,
                quantity: 2,
                deliveryOptionId: '1',
            }, {
                id: productId2,
                quantity: 1,
                deliveryOptionId: '1',
            }]);
        });
        spyOn(localStorage, 'setItem');

        loadFromStorage();

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-header-quantity"></div>
            <div class="js-checkout-items"></div>
            <div class="js-order-summary-container"></div>
        `;
        
        renderOrderSummary();
    });

    it('Displays the cart', () => {
        expect(
            document.querySelectorAll('.js-checkout-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-item-quantity-container-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-item-quantity-container-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('Removes a cart item', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-checkout-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-checkout-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-checkout-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId2);
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });
});
