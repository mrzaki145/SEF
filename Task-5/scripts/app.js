const cart = [];
const DOM = {
  products: document.querySelector(".products"),
  cartItems: document.querySelector(".cart__items"),
  itemsCount: document.querySelector(".cart__items-count"),
  totalPrice: document.querySelector(".total-price"),
};

DOM.products.addEventListener("click", clickHandler);

function clickHandler(e) {
  if (e.target.tagName != "BUTTON") return;

  const product = e.target.closest(".product");
  updateCart(product);
}

function updateCart(product) {
  const productId = product.dataset.productId;
  const selectedProduct = cart.find((item) => item.id == productId);

  if (selectedProduct) {
    ++selectedProduct.amount;
    updateSelectedItem(selectedProduct);
  } else {
    const productInfo = {
      amount: 1,
      id: productId,
      thumb: product.querySelector(".product__thumb").src,
      name: product.querySelector(".product__name").textContent,
      price: Number(product.querySelector(".product__price").textContent),
    };

    addNewItem(productInfo);
    cart.push(productInfo);
  }

  updateItemsCount();
  updateTotalPrice();
}

function addNewItem(productInfo) {
  const itemsHTML = `
    <div class="item" data-item-id="${productInfo.id}">
      <img
        class="item__thumb"
        src="${productInfo.thumb}"
        alt="${productInfo.name}"
      />
      <div class="item__info">
        <div>
          <h3 class="item__name">${productInfo.name}</h3>
          <p class="item__amount">Qty: ${productInfo.amount}</p>
        </div>
        <p class="item__price price">${formatPrice(
          productInfo.price * productInfo.amount
        )}</p>
      </div>
    </div>
  `;

  DOM.cartItems.insertAdjacentHTML("beforeend", itemsHTML);
}

function updateSelectedItem(product) {
  const selectedItemEle = document.querySelector(
    `[data-item-id="${product.id}"]`
  );

  selectedItemEle.querySelector(
    ".item__amount"
  ).textContent = `Qty: ${product.amount}`;
  selectedItemEle.querySelector(".item__price").textContent = formatPrice(
    product.price * product.amount
  );
}

function updateItemsCount() {
  DOM.itemsCount.textContent = `${cart.length} ${
    cart.length == 1 ? "item" : "Items"
  } in cart`;
}

function updateTotalPrice() {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  DOM.totalPrice.textContent = formatPrice(totalPrice);
}

function formatPrice(n) {
  return n.toLocaleString("en-us");
}
