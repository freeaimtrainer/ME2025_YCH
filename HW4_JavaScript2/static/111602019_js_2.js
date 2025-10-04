document.addEventListener("DOMContentLoaded", () => {
  const checkAll = document.getElementById("checkAll");
  const itemChecks = document.querySelectorAll(".item-check");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout");

  function calcTotal() {
    let total = 0;
    document.querySelectorAll("tbody tr").forEach(row => {
      const checkbox = row.querySelector(".item-check");
      if (checkbox.checked) {
        total += parseInt(row.querySelector(".subtotal").textContent);
      }
    });
    totalEl.textContent = total;
  }

  checkAll.addEventListener("change", () => {
    itemChecks.forEach(chk => chk.checked = checkAll.checked);
    calcTotal();
  });

  itemChecks.forEach(chk => {
    chk.addEventListener("change", () => {
      checkAll.checked = [...itemChecks].every(c => c.checked);
      calcTotal();
    });
  });

  document.querySelectorAll("tbody tr").forEach(row => {
    const price = parseInt(row.querySelector(".price").textContent);
    const qtyInput = row.querySelector(".qty");
    const subtotalEl = row.querySelector(".subtotal");

    function stock() {
      return parseInt(row.querySelector(".stock").textContent);
    }

    function updateSubtotal() {
      let qty = parseInt(qtyInput.value) || 1;
      if (qty < 1) qty = 1;
      if (qty > stock()) qty = stock();
      qtyInput.value = qty;
      subtotalEl.textContent = qty * price;
      calcTotal();
    }

    row.querySelector(".plus").addEventListener("click", () => {
      if (parseInt(qtyInput.value) < stock()) qtyInput.value++;
      updateSubtotal();
    });

    row.querySelector(".minus").addEventListener("click", () => {
      if (parseInt(qtyInput.value) > 1) qtyInput.value--;
      updateSubtotal();
    });

    qtyInput.addEventListener("blur", updateSubtotal);
  });


  checkoutBtn.addEventListener("click", () => {
    const total = parseInt(totalEl.textContent);
    if (total > 0) {
      let details = "感謝您的購買，您購買的產品如下:\n";
      document.querySelectorAll("tbody tr").forEach(row => {
        const chk = row.querySelector(".item-check");
        if (chk.checked) {
          const name = row.cells[1].textContent;
          const qty = parseInt(row.querySelector(".qty").value);
          const price = parseInt(row.querySelector(".price").textContent);
          details += `${name} * ${qty}\n`;

          let stockEl = row.querySelector(".stock");
          let newStock = parseInt(stockEl.textContent) - qty;
          stockEl.textContent = newStock;

          if (newStock > 0) {
            row.querySelector(".qty").value = 1;
            row.querySelector(".subtotal").textContent = price * 1;
          } else {
            row.querySelector(".qty").value = 0;
            row.querySelector(".subtotal").textContent = 0;
          }

          chk.checked = false;
        }
      });
      details += `總計: $${total}元`;
      alert(details);
      checkAll.checked = false;
      calcTotal();
    }
  });
});