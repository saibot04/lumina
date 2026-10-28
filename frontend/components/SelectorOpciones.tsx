"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SelectorProps {
  opciones: string[];
  seleccionInicial: string;
}

export default function SelectorOpciones({ opciones, seleccionInicial }: SelectorProps) {
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState(seleccionInicial);
  const menuRef = useRef<HTMLDivElement>(null);

  // Truco para que el menú se cierre si hacés clic afuera
  useEffect(() => {
    const handleClickFuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón principal */}
      <button 
        onClick={() => setAbierto(!abierto)}
        className="bg-[#fccb30] text-black text-[11px] font-medium px-4 py-1.5 rounded uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 active:scale-95"
      >
        {seleccion}
        <span className="text-[8px] opacity-70">▼</span>
      </button>

      {/* Menú desplegable */}
      {abierto && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded shadow-2xl z-50 overflow-hidden">
          {opciones.map((opcion, index) => (
            <div
              key={index}
              onClick={() => {
                setSeleccion(opcion);
                setAbierto(false);
              }}
              className={`px-4 py-3 text-xs cursor-pointer hover:bg-white/10 transition-colors ${
                seleccion === opcion ? 'text-[#fccb30] font-medium' : 'text-gray-300'
              }`}
            >
              {opcion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}