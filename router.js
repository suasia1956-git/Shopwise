// Tiny hash-based client-side router: no page reloads between views
export function startRouter(routes, notFound, outlet) {
  const compiled = routes.map(([pattern, handler]) => {
    const keys = [];
    const re = new RegExp("^" + pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), "([^/]+)")) + "$");
    return { re, keys, handler };
  });
  function resolve() {
    const path = (location.hash.slice(1) || "/").split("?")[0];
    for (const { re, keys, handler } of compiled) {
      const m = path.match(re);
      if (m) {
        const params = {};
        keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
        handler(outlet, params);
        window.scrollTo(0, 0);
        return;
      }
    }
    notFound(outlet);
  }
  addEventListener("hashchange", resolve);
  resolve();
}
