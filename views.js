import { products, categories } from "./data.js";
import * as store from "./store.js";

const money = n => "₹" + n.toLocaleString("en-IN");
const state = { q: "", cat: "All", sort: "default" };

function card(p) {
  return `<article class="card">
    <a href="#/product/${p.id}" class="pic" style="background:${p.color}" aria-label="${p.name}">${p.icon}</a>
    <div class="info">
      <h3><a href="#/product/${p.id}">${p.name}</a></h3>
      <span class="muted">${p.category} · ⭐ ${p.rating}</span>
      <span class="price">${money(p.price)}</span>
      <button class="btn" data-add="${p.id}">Add to cart</button>
    </div></article>`;
}

export function home(outlet) {
  outlet.innerHTML = `
    <div class="tools">
      <input id="q" type="search" placeholder="Search products…" aria-label="Search" value="${state.q}">
      <select id="cat" aria-label="Category">${categories.map(c => `<option ${c === state.cat ? "selected" : ""}>${c}</option>`).join("")}</select>
      <select id="sort" aria-label="Sort">
        <option value="default">Sort: Featured</option>
        <option value="low" ${state.sort === "low" ? "selected" : ""}>Price: Low to High</option>
        <option value="high" ${state.sort === "high" ? "selected" : ""}>Price: High to Low</option>
        <option value="rating" ${state.sort === "rating" ? "selected" : ""}>Top rated</option>
      </select>
    </div>
    <div id="grid" class="grid"></div>`;

  const grid = outlet.querySelector("#grid");
  function draw() {
    let list = products.filter(p =>
      (state.cat === "All" || p.category === state.cat) &&
      p.name.toLowerCase().includes(state.q.toLowerCase()));
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    grid.innerHTML = list.length ? list.map(card).join("") : `<p class="muted">No products match your search.</p>`;
  }
  outlet.querySelector("#q").oninput = e => { state.q = e.target.value; draw(); };
  outlet.querySelector("#cat").onchange = e => { state.cat = e.target.value; draw(); };
  outlet.querySelector("#sort").onchange = e => { state.sort = e.target.value; draw(); };
  grid.onclick = e => { const id = e.target.dataset.add; if (id) store.add(+id); };
  draw();
}

export function product(outlet, { id }) {
  const p = products.find(x => x.id === +id);
  if (!p) return notFound(outlet);
  outlet.innerHTML = `
    <p><a href="#/" class="muted">← Back to shop</a></p>
    <div class="detail">
      <div class="pic big" style="background:${p.color}">${p.icon}</div>
      <div>
        <h1>${p.name}</h1>
        <p class="muted">${p.category} · ⭐ ${p.rating}</p>
        <p>${p.desc}</p>
        <p class="price">${money(p.price)}</p>
        <button class="btn" id="add">Add to cart</button>
      </div>
    </div>`;
  outlet.querySelector("#add").onclick = () => store.add(p.id);
}

export function cart(outlet) {
  function draw() {
    const items = store.getCart().map(i => ({ ...products.find(p => p.id === i.id), qty: i.qty }));
    if (!items.length) {
      outlet.innerHTML = `<div class="center"><h2>Your cart is empty</h2><a class="btn" href="#/">Start shopping</a></div>`;
      return;
    }
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    outlet.innerHTML = `<h1>Your cart</h1>
      ${items.map(i => `<div class="row">
        <span>${i.icon} <strong>${i.name}</strong><br><span class="muted">${money(i.price)}</span></span>
        <span class="qty"><button data-q="${i.id}" data-d="-1" aria-label="Decrease">−</button>${i.qty}<button data-q="${i.id}" data-d="1" aria-label="Increase">+</button></span>
        <strong>${money(i.price * i.qty)}</strong></div>`).join("")}
      <div class="row"><h2>Total</h2><h2>${money(total)}</h2></div>
      <button class="btn ghost" id="clear">Clear cart</button>`;
    outlet.onclick = e => {
      if (e.target.dataset.q) { store.changeQty(+e.target.dataset.q, +e.target.dataset.d); draw(); }
      if (e.target.id === "clear") { store.clear(); draw(); }
    };
  }
  draw();
}

export function notFound(outlet) {
  outlet.innerHTML = `<div class="center"><h2>Page not found</h2><a class="btn" href="#/">Go home</a></div>`;
}
