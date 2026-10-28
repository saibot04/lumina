import React from 'react';

interface FilaProps {
  titulo: string;
  descripcion: string;
  accion: React.ReactNode;
}

export default function FilaConfiguracion({ titulo, descripcion, accion }: FilaProps) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
      <div className="pr-4">
        <p className="text-white text-sm font-medium mb-1">{titulo}</p>
        <p className="text-gray-500 text-xs">{descripcion}</p>
      </div>
      <div className="flex-shrink-0">
        {accion}
      </div>
    </div>
  );
}