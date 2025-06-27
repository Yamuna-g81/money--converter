const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

// Load currency list
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

currencies.forEach(currency => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert Currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    resultDiv.textContent = `Converted Amount: ${converted} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching exchange rates.";
  }
}
