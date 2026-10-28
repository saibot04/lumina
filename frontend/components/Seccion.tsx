import React from 'react';

export default function Seccion({ titulo, children }: { titulo: string, children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-[#fccb30] text-sm tracking-widest uppercase font-medium mb-6">
        {titulo}
      </h2>
      {/* Acá adentro se van a inyectar las filas de configuración automáticamente */}
      {children}
    </section>
  );
}