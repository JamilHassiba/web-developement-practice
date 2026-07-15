import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-stars-rating" 
        src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count">${product.rating.count}</div>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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
      <button class="add-to-cart-button js-add-to-cart-button" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
`});

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // Get product id
      const id = button.dataset.productId;

      // Get selected quantity
      const quantity = Number(
        document.querySelector(`.js-product-quantity-selector-${id}`).value
      );
      
      // Check if product is already in cart
      let matchingProduct;
      cart.forEach((product) => {
        if (product.id === id) {
          matchingProduct = product;
        }
      });

      // Increase product quantity if already in cart
      if (matchingProduct) {
        matchingProduct.quantity += quantity;
      }
      // Add to cart otherwise
      else {
        cart.push({
          id,
          quantity
        });
      }
    });
  });
