import React, { useState } from 'react'

export default function AddCurrency({ storeNewCurrencyByName }) {
  let [isClicked, setIsClicked] = useState(false);
  let [name, setName] = useState("");

  const addNewCurrency = () => {
    setIsClicked(false);
    storeNewCurrencyByName(name);
    setName("");
  }

  return (
    <div>
      {
        isClicked ?
          <form onSubmit={addNewCurrency} className="flex flex-row justify-between py-3 px-4">
            <input type="text" value={name} placeholder="Currency Name" onChange={(e) => setName(e.target.value)} className="flex-1 px-1 border border-gray-300 bg-gray-100 outline-none hover:bg-gray-50" />
            <div className=" inline-block w-2 h-full bg-gray-900"></div>
            <input type="submit" value="Submit" className="p-2 text-sm font-bold text-gray-700 cursor-pointer bg-gray-300 hover:bg-gray-50" />
          </form>
          :
          <button onClick={() => setIsClicked(true)} className="w-full border py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">(+) Add More Currencies</button>
      }
    </div>
  )
}
