document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("tbody tr").forEach(row => {
    const stock = parseInt(row.querySelector(".stock").textContent);
    const price = parseInt(row.querySelector(".price").textContent);
    const qtyInput = row.querySelector(".qty");
    const subtotalEl = row.querySelector(".subtotal");

    function updateSubtotal() {
      let qty = parseInt(qtyInput.value) || 1;
      if (qty < 1) qty = 1;
      if (qty > stock) qty = stock;
      qtyInput.value = qty;
      subtotalEl.textContent = qty * price;
    }

    row.querySelector(".plus").addEventListener("click", () => {
      if (parseInt(qtyInput.value) < stock) qtyInput.value++;
      updateSubtotal();
    });

    row.querySelector(".minus").addEventListener("click", () => {
      if (parseInt(qtyInput.value) > 1) qtyInput.value--;
      updateSubtotal();
    });

    qtyInput.addEventListener("blur", updateSubtotal);
  });
});