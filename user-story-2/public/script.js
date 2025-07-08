const currencyData = [
  { currency: "AUD", amount: "AUD 1,100.00" },
  { currency: "MYR", amount: "MYR 899.00" },
  { currency: "GBP", amount: "GBP 56,000.00" },
  { currency: "EUR", amount: "EUR 5,388.00" },
];

let sortState = {
  currency: "none",
  amount: "none",
};

function parseAmount(amountStr) {
  // Remove currency code and spaces
  const numberPart = amountStr.replace(/^[A-Z]{3}\s/, "");

  // Remove commas (thousand separators)
  return parseFloat(numberPart.replace(/,/g, ""));
}

// Sort data by currency (string sort)
function sortByCurrency(data, order) {
  return [...data].sort((a, b) => {
    const comparison = a.currency.localeCompare(b.currency);
    return order === "asc" ? comparison : -comparison;
  });
}

function sortByAmount(data, order) {
  return [...data].sort((a, b) => {
    const amountA = parseAmount(a.amount);
    const amountB = parseAmount(b.amount);
    const comparison = amountA - amountB;
    return order === "asc" ? comparison : -comparison;
  });
}

function updateSortIcons(activeColumn, order) {
  const currencyIcon = document.querySelector("#sortCurrency .sort-icon");
  const amountIcon = document.querySelector("#sortAmount .sort-icon");

  // Reset icons
  currencyIcon.textContent = "";
  amountIcon.textContent = "";

  // Set active icon
  if (activeColumn === "currency") {
    currencyIcon.textContent = order === "asc" ? "↑" : "↓";
  } else if (activeColumn === "amount") {
    amountIcon.textContent = order === "asc" ? "↑" : "↓";
  }
}

function renderTable(data) {
  const tbody = document.getElementById("currencyTableBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${row.currency}</td>
            <td>${row.amount}</td>
        `;
    tbody.appendChild(tr);
  });
}

function handleCurrencySort() {
  // Reset amount sort state
  sortState.amount = "none";

  if (sortState.currency === "none" || sortState.currency === "desc") {
    sortState.currency = "asc";
  } else {
    sortState.currency = "desc";
  }

  const sortedData = sortByCurrency(currencyData, sortState.currency);
  renderTable(sortedData);
  updateSortIcons("currency", sortState.currency);
}

function handleAmountSort() {
  // Reset currency sort state
  sortState.currency = "none";

  if (sortState.amount === "none" || sortState.amount === "desc") {
    sortState.amount = "asc";
  } else {
    sortState.amount = "desc";
  }

  const sortedData = sortByAmount(currencyData, sortState.amount);
  renderTable(sortedData);
  updateSortIcons("amount", sortState.amount);
}

function init() {
  renderTable(currencyData);

  document
    .getElementById("sortCurrency")
    .addEventListener("click", handleCurrencySort);
  document
    .getElementById("sortAmount")
    .addEventListener("click", handleAmountSort);
}

document.addEventListener("DOMContentLoaded", init);

