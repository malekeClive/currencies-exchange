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
          <form onSubmit={addNewCurrency} className="flex flex-row justify-between px-4">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
            <input type="submit" value="Submit" className="text-sm" />
          </form>
          :
          <button onClick={() => setIsClicked(true)} className="w-full text-sm border border-gray-300">(+) Add More Currencies</button>
      }
    </div>
  )
}
