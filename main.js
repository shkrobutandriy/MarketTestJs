const products = document.getElementById("products");
const carts = document.getElementById("cart");
const inBascet = document.getElementById("inBasket");
const openCart = document.querySelector(".basket");
const market = {
  productsAll: [
    {
      name: "Potato",
      price: 20.25,
      image: "img/potato.jfif",
      id: 1,
      itemNumber: 0,
    },
    {
      name: "Lemon",
      price: 30,
      image: "img/lemons.jpg",
      id: 2,
      itemNumber: 0,
    },
    {
      name: "Cherry",
      price: 100,
      image: "img/cherry.jpg",
      id: 3,
      itemNumber: 0,
    },
    {
      name: "Tomato",
      price: 80,
      image: "img/tomato.jfif",
      id: 4,
      itemNumber: 0,
    },
    {
      name: "Pineapple",
      price: 90,
      image: "img/pinaapple.jfif",
      id: 5,
      itemNumber: 0,
    },
    {
      name: "Apple",
      price: 45,
      image: "img/apple.jfif",
      id: 6,
      itemNumber: 0,
    },
  ],
  renderProducts() {
    products.innerHTML = "";
    this.productsAll.forEach((product) => {
      const productBtn = `
    <div class="item" data-product-id="${product.id}">
    <button class="product-btn"><img src=${
      product.image
    } alt=""><p class="name-product">${
        product.name
      }</p><span class="price-product">${product.price.toFixed(
        2
      )}$</span></button>
    <div class="quantity_minus_plus">
    <button id="minus" class="minus" data-minus-id="${
      product.id
    }"><img src="img/minus.png" alt=""></button><span id="itemNumber">${
        product.itemNumber
      }</span><button id="plus" class="plus" data-plus-id="${
        product.id
      }"><img src="img/plus.png" alt=""></button>
    </div>
      <button class="buy" id="buy" data-buy-id="${product.id}">Buy</button>
    </div>
    `;
      products.innerHTML += productBtn;
    });
  },
  decreaseItemNumber(id) {
    this.productsAll.forEach((item) => {
      if (item.id === id && item.itemNumber > 0) {
        item.itemNumber -= 1;
      }
    });
  },
  increaseItemNumber(id) {
    this.productsAll.forEach((item) => {
      if (item.id === id) {
        item.itemNumber += 1;
      }
    });
  },
  cart: {
    items: [],
    getItems() {
      return this.items;
    },
    changeList() {
      products.classList.toggle("active");
      inBascet.classList.toggle("active");
    },
    renderCart() {
      carts.innerHTML = "";
      this.items.forEach((product, index) => {
        let sum = product.price * product.quantity;
        const cartBtn = `
    <div class="item" data-product-id="${product.id}">
    <button data-remove="${index}" class="removeItem">remove</button>
    <button class="product-btn"><img src=${
      product.image
    } alt=""><p class="name-product">${
          product.name
        }</p><span class="price-product">${product.price.toFixed(
          2
        )}$</span></button>
    <div class="quantity_minus_plus">
    <button id="minus" class="minus" data-minus-bas="${
      product.id
    }"><img src="img/minus.png" alt=""></button><span id="itemNumber">${
          product.quantity
        }</span><button id="plus" class="plus" data-plus-bas="${
          product.id
        }"><img src="img/plus.png" alt=""></button>
    <span id="sum" class="sum">$${sum.toFixed(2)}</span>
    `;
        carts.innerHTML += cartBtn;
      });
    },
    add(id) {
      for (const itemInBasket of this.items) {
        if (itemInBasket.id === id) {
          for (const item of market.productsAll) {
            if (item.id === id) {
              itemInBasket.quantity += item.itemNumber;
              item.itemNumber = 0;
              return;
            }
          }
        }
      }
      market.productsAll.forEach((item) => {
        if (id === item.id && item.itemNumber !== 0) {
          const newProduct = {
            ...item,
            quantity: item.itemNumber,
          };
          this.items.push(newProduct);
          item.itemNumber = 0;
        }
      });
    },
    remove(i) {
      const { items } = this;
      items.forEach(({ name }, index) => {
        if (index === i) {
          items.splice(index, 1);
        }
      });
    },
    clear() {
      this.items = [];
    },
    countTotalPrice() {
      const { items } = this;
      let total = 0;
      items.forEach(({ price, quantity }) => {
        total += price * quantity;
      });
      return total;
    },
    increaseQuartity(id) {
      this.items.forEach((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
      });
    },
    decreaseQuartity(id) {
      this.items.forEach((item, index) => {
        if (item.id === id && item.quantity > 1) {
          item.quantity -= 1;
          return;
        }
        if (item.id === id && item.quantity <= 1) {
          this.remove(index);
          this.renderCart();
          this.totalBasket();
        }
      });
    },
    totalBasket() {
      let result = document.querySelector("#result");
      result.innerHTML = this.items.length;
    },
  },
};

market.renderProducts();
products.addEventListener("click", (e) => {
  const minus = +e.target.dataset.minusId;
  market.decreaseItemNumber(minus);
  market.renderProducts(market.productsAll);
});

products.addEventListener("click", (e) => {
  market.increaseItemNumber(+e.target.dataset.plusId);
  market.renderProducts(market.productsAll);
});
products.addEventListener("click", (e) => {
  market.cart.add(+e.target.dataset.buyId);
  market.cart.totalBasket();
  market.renderProducts();
});
openCart.addEventListener("click", (e) => {
  market.cart.renderCart();
  market.cart.changeList();
});
carts.addEventListener("click", (e) => {
  market.cart.increaseQuartity(+e.target.dataset.plusBas);
  market.cart.renderCart(market.productsAll);
});
carts.addEventListener("click", (e) => {
  market.cart.decreaseQuartity(+e.target.dataset.minusBas);
  market.cart.renderCart(market.productsAll);
});
carts.addEventListener("click", (e) => {
  market.cart.remove(+e.target.dataset.remove);
  market.cart.renderCart(market.productsAll);
  market.cart.totalBasket();
});
