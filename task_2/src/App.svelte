<script>
  import { onMount } from "svelte";
  import Switcher from "./assets/switch_icon.png";

  let amountFrom = 0;
  let amountTo = 0;
  let currencyFrom = "USD";
  let currencyTo = "EUR";
  let exchangeRate = 0;
  let updatingField = ""; 

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${currencyFrom}`
      );
      const data = await response.json();
      exchangeRate = data.rates[currencyTo];
      updateConversion();
    } catch (error) {
      console.log("Error fetching exchange rate:", error);
    }
  };

  const updateConversion = () => {
    if (updatingField !== "amountFrom") {
      amountTo = parseFloat((amountFrom * exchangeRate).toFixed(2));
    } else {
      amountFrom = parseFloat((amountTo / exchangeRate).toFixed(2));
    }
  };

  onMount(fetchExchangeRate);

  $: updateConversion();

  const handleAmountFromInput = () => {
    updatingField = "amountFrom";
    fetchExchangeRate();
  };

  const handleAmountToInput = () => {
    updatingField = "amountTo";
    fetchExchangeRate();
  };

  const handleCurrencyFromChange = () => {
    fetchExchangeRate();
  };

  const handleCurrencyToChange = () => {
    fetchExchangeRate();
  };
</script>

<main>
  <h1>Конвертер валют Svelte</h1>
  <div class="from-to">
    <div>
      <label>
        <select bind:value={currencyFrom} on:change={handleCurrencyFromChange}>
          <option value="USD">USD - Доллар США</option>
          <option value="EUR">EUR - Евро</option>
          <option value="RUB">RUB - Рубль</option>
          <option value="CNY">CNY - Юань</option>
          <option value="AMD">AMD - Арм. драм</option>
        </select>
      </label>
    </div>
    <div class="swither-container">
      <img src={Switcher} alt="" />
    </div>
    <div>
      <label>
        <select bind:value={currencyTo} on:change={handleCurrencyToChange}>
          <option value="USD">USD - Доллар США</option>
          <option value="EUR">EUR - Евро</option>
          <option value="RUB">RUB - Рубль</option>
          <option value="CNY">CNY - Юань</option>
          <option value="AMD">AMD - Арм. драм</option>
        </select>
      </label>
    </div>
  </div>
  <div class="from-to">
    <div>
      <label>
        {currencyFrom}:<br />
        <input
          type="number"
          bind:value={amountFrom}
          on:input={handleAmountToInput}
        />
      </label>
    </div>
    <div>
      <label>
        {currencyTo}:<br />
        <input
          type="number"
          bind:value={amountTo}
          on:input={handleAmountFromInput}
        />
      </label>
    </div>
  </div>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
  }
  .from-to {
    display: flex;
    flex-shrink: 1;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
  }
  .from-to > div {
    margin-right: 30px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  input[type="number"] {
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .swither-container {
    width: 25px;
  }
  .swither-container img {
    width: 100%;
    height: auto;
  }
  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  @media (max-width: 500px) {
    .from-to > div:last-child {
      margin-right: 0;
    }
    .swither-container {
      display: none;
    }
  }
  
  @media (max-width: 350px) {
    .from-to > div {
      margin-right: 0;
    }
    .swither-container {
      display: none;
    }
  }
</style>
