import React from 'react';

export default function PerfilVacio({ mensaje }: { mensaje: string }) {
    return (
        <div className="text-center py-16 text-gray-500 text-sm bg-[#141414]/30 border border-white/5 rounded-lg">
            {mensaje}
        </div>
    );
}