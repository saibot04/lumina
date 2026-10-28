"use client";
import React, { useState } from 'react';

export default function Toggle({ activoInicial = false }: { activoInicial?: boolean }) {
  // Maneja si está encendido o apagado localmente
  const [activo, setActivo] = useState(activoInicial);

  return (
    <div 
      onClick={() => setActivo(!activo)} 
      className={`w-10 h-5 rounded-full relative cursor-pointer transition-opacity ${activo ? 'bg-[#fccb30] opacity-90 hover:opacity-100' : 'bg-gray-600 hover:bg-gray-500'}`}
    >
      <div className={`w-3.5 h-3.5 rounded-full absolute top-[3px] transition-all ${activo ? 'bg-black right-1' : 'bg-white left-1'}`}></div>
    </div>
  );
}