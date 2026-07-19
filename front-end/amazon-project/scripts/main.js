import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import { formatPrice } from "./utilities/money.js";

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name two-line-limit">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-stars-rating" 
        src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count">${product.rating.count}</div>
      </div>
      <div class="product-price">
        $${formatPrice(product.priceCents)}
      </div>
      <select class="product-quantity-selector 
      js-product-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src=images/icons/checkmark.png>
        <span>Added</span>
      </div>
      <button class="add-to-cart-button primary-button js-add-to-cart-button" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
`});

document.querySelector('.products-grid').innerHTML = productsHTML;

const timeoutIds = {}; // global object for displayAddedMessage
document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      addToCart(id);
      updateCartQuantity();
      displayAddedMessage(id);
    });
  });

function updateCartQuantity() {
  // Calculate total cart quantity
  let cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  // Update header cart quantity
  document.querySelector('.header-cart-quantity')
    .innerText = cartQuantity;
}

function displayAddedMessage(id) {
  const addedElement = document.querySelector(`.js-added-to-cart-${id}`)
  addedElement.classList.add('added-to-cart-shown');

  if (timeoutIds[id])
    clearTimeout(timeoutIds[id]);
  
  timeoutIds[id] = setTimeout(() => {
    addedElement.classList.remove('added-to-cart-shown');
  }, 2000);
}
