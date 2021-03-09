import React from 'react'

export default function Currency({ based, currenciesNameList, currencyName, currencyRate, removeCurrency }) {
  const getCompleteName = (shortName) => {
    const name = currenciesNameList.find(name => name.shortName === shortName);
    return name.completeName;
  }
  return (
    <div className="mx-4 mt-2 border border-gray-300 text-gray-700 flex flex-row justify-between items-stretch rounded">
      <div className="flex-1 m-2">
        <div className="flex flex-row justify-between">
          <p>{currencyName}</p>
          <p>{(currencyRate * based).toFixed(4)}</p>
        </div>
        <div>
          <i className="text-xs font-bold">{currencyName} - { currenciesNameList.length > 0 &&
          getCompleteName(currencyName)
          }</i>
        </div>
        <div>
          <i className="text-xs">1 USD = {currencyName} {currencyRate}</i>
        </div>
      </div>
      <div className="w-px bg-gray-300"></div>
      <div className="my-auto mx-2 text-center">
        <button className="focus:outline-none" onClick={() => removeCurrency(currencyName)}>(-)</button>
      </div>
    </div>
  )
}
