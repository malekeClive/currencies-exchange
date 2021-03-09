import React, { useState, useEffect } from 'react'
import AddCurrency from './AddCurrency'
import Currency from './Currency'

export default function CurrencyList() {
  let [baseCurrency, setBaseCurrency] = useState(1);
  let [currencies, setCurrencies] = useState([]);
  let [currenciesName, setCurrenciesName] = useState([]);

  let [preventSpamClick, setPreventSpamClick] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };
    const url = "https://api.exchangeratesapi.io/latest?symbols=IDR,GBP";

    const getCurrencies = async () => {
      let storedCurrencies = [];
      const fetchUrl = await fetch(url, options);
      const response = await fetchUrl.json();
      for (const currency in response.rates) {
        storedCurrencies.push({ shortName: currency, rate: response.rates[currency] })
      }
      setCurrencies(storedCurrencies);
    }

    getCurrencies();

    return () => {
      abortCtrl.abort();
    };
  }, [])

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };
    const url = "http://openexchangerates.org/api/currencies.json";

    const getCurrenciesName = async () => {
      let storedNames = [];
      const fetchUrl = await fetch(url, options);
      const nameList = await fetchUrl.json();
      for (const name in nameList) {
        storedNames.push({ shortName: name, completeName: nameList[name]})
      }
      setCurrenciesName(storedNames);
    }

    getCurrenciesName();

    return () => {
      abortCtrl.abort();
    }
  }, [])

  const storeNewCurrencyByName = async (shortName) => {
    if (preventSpamClick) {
      console.log("eitss");
      return;
    }

    setPreventSpamClick(true);
    try {
      const url = `https://api.exchangeratesapi.io/latest?symbols=${shortName.toUpperCase()}`;
      const getCurrency = await fetch(url);
      if (getCurrency.status === 400) {
        throw new Error('Not found');
      }

      const response = await getCurrency.json();
      isCurrencyExistOnList(response.rates)
      setPreventSpamClick(false);
      
    } catch (error) {
      setPreventSpamClick(false);
      console.log(error.message);
    }
  }

  const isCurrencyExistOnList = (rates) => {
    const findCurrency = currencies.find(currency => currency.shortName === Object.keys(rates)[0]);
    if (findCurrency) return;

    const newCurrency = {
      shortName: Object.keys(rates)[0],
      rate: Object.values(rates)[0],
    }

    setCurrencies(prev => [...prev, newCurrency]);
  }

  const removeCurrencyFromList = (name) => {
    const newList = currencies.filter(currency => currency.shortName !== name);
    setCurrencies(newList);
  }


  const renderListCurrencies = () => {
    if (currencies.length > 0) {
      return currencies.map((currency, idx) => {
        return (
          <Currency
            key={idx}
            based={baseCurrency}
            currenciesNameList={currenciesName}
            currencyName={currency.shortName}
            currencyRate={currency.rate}
            removeCurrency={removeCurrencyFromList}
          />
        )
      })
    }

    return (
      <div className="text-center mt-2">No currencies added</div>
    )
  }

  return (
    <div className="wrapper">
      <div className="flex flex-col h-full">
        <div className="m-4">
          <i className="text-xs text-gray-700 mb-2">USD - United States Dollars</i>
          <div className="flex flex-row justify-between font-bold text-gray-700">
            <p className="flex-1">USD</p>
            <input className="w-24 outline-none bg-gray-100 text-right" type="number" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} />
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
