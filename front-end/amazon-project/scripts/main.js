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
        <img class="product-stars-rating" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count">${product.rating.count}</div>
      </div>
      <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
      <select class="product-count-selector">
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
      <button class="add-to-cart-button">Add to Cart</button>
    </div>
`});

console.log(productsHTML);
document.querySelector('.products-grid').innerHTML = productsHTML;
