export const copyURL = (url?: string) => {
  const el = document.createElement("input");
  el.value = url || window.location.href;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
