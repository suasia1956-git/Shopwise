import { startRouter } from "./router.js";
import * as store from "./store.js";
import { home, product, cart, notFound } from "./views.js";

store.onChange(items => {
  document.getElementById("cartCount").textContent = items.reduce((s, i) => s + i.qty, 0);
});

startRouter(
  [["/", home], ["/product/:id", product], ["/cart", cart]],
  notFound,
  document.getElementById("app")
);
