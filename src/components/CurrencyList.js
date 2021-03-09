import React, { useState } from 'react'
import AddCurrency from './AddCurrency'
import Currency from './Currency'

export default function CurrencyList() {
  let [currencies, setCurrencies] = useState([]);

  const storeNewCurrencyByName = (name) => {
    console.log(name);
  }

  return (
    <div className="wrapper">
      <div className="flex flex-col">
        <div className="m-4">
          <i className="text-xs text-gray-700 mb-2">USD - United States Dollars</i>
          <div className="flex flex-row justify-between font-bold text-gray-700">
            <p>USD</p>
            <p>10.000</p>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div>
          <Currency />
        </div>
        <div className="sticky bottom-0">
          <AddCurrency storeNewCurrencyByName={storeNewCurrencyByName} />
        </div>
      </div>
    </div>
  )
}
