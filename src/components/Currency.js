import React from 'react'

export default function Currency() {
  return (
    <div className="m-4 border border-gray-300 text-gray-700 flex flex-row justify-between items-stretch">
      <div className="flex-1 m-2">
        <div className="flex flex-row justify-between">
          <p>IDR</p>
          <p>123.000.000</p>
        </div>
        <div>
          <i className="text-xs font-bold">IDR - Indonesian Rupiah</i>
        </div>
        <div>
          <i className="text-xs">1 USD = IDR 14.000.000</i>
        </div>
      </div>
      <div className="w-px bg-gray-300"></div>
      <div className="my-auto mx-2 text-center">
        (-)
      </div>
    </div>
  )
}
