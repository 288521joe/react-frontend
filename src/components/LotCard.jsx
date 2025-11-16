import React from "react";

export default function LotCard() {
  return (
    <div className="w-full h-full border rounded-xl p-3 bg-white shadow-md flex flex-col">

      <div className="text-2xl font-bold mb-2 border p-2 text-center rounded">
        LOT mark code
      </div>

      <div className="flex-1 border rounded-xl flex items-center justify-center my-4 bg-gray-100">
        <p className="text-xl text-gray-700 text-center">
          QR code <br /> Image
        </p>
      </div>

      <div className="flex items-center mt-3">
        <div className="w-10 h-10 bg-orange-500 rounded mr-5"></div>
        <p className="text-lg font-semibold">LOT mark Error</p>
      </div>

    </div>
  );
}
