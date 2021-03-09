import React, { useState, useEffect } from 'react'
import AddCurrency from './AddCurrency'
import Currency from './Currency'

export default function CurrencyList() {
  const USD_BASED = 10000;
  let [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };
    const url = "https://api.exchangeratesapi.io/latest?symbols=USD,GBP";

    const getCurrencies = async () => {
      let storedCurrencies = [];
      const fetchUrl = await fetch(url, options);
      const response = await fetchUrl.json();
      for (const currency in response.rates) {
        storedCurrencies.push({name: currency, rate: response.rates[currency]})
      }
      setCurrencies(storedCurrencies);
    }

    getCurrencies();

    return () => {
      abortCtrl.abort();
    };
  }, [])

  const storeNewCurrencyByName = (name) => {
    console.log(name);
  }

  const renderListCurrencies = () => {
    return currencies.map((currency, idx) => {
      return (
        <Currency key={idx} currencyName={currency.name} currencyRate={currency.rate} based={USD_BASED} />
      )
    })

  }

  return (
    <div className="wrapper">
      <div className="flex flex-col h-full">
        <div className="m-4">
          <i className="text-xs text-gray-700 mb-2">USD - United States Dollars</i>
          <div className="flex flex-row justify-between font-bold text-gray-700">
            <p>USD</p>
            <p>{USD_BASED}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="relative flex-1">
          <div className="scroll-currencies-wrapper">
            {renderListCurrencies()}
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <AddCurrency storeNewCurrencyByName={storeNewCurrencyByName} />
      </div>
    </div>
  )
}
