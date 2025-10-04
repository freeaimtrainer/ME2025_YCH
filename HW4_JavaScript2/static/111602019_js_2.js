document.addEventListener("DOMContentLoaded", () => {
    const checkAll = document.getElementById("checkAll");
    const itemChecks = document.querySelectorAll(".item-check");
    const totalEl = document.getElementById("total");

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
            calcTotal();
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