// Cart state, persisted in localStorage (with a safe fallback)
let cart = [];
try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch { cart = []; }
const listeners = [];
const save = () => {
  try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {}
  listeners.forEach(fn => fn(cart));
};
export const getCart = () => cart;
export const onChange = fn => { listeners.push(fn); fn(cart); };
export function add(id) {
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  save();
}
export function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  cart = cart.filter(i => i.qty > 0);
  save();
}
export function clear() { cart = []; save(); }
