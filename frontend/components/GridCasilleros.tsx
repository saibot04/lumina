"use client";

import PosterCard from "@/components/PosterCard";

interface ItemPeli {
    id: number;
    title: string;
}

interface GridProps {
    titulo: string;
    items: ItemPeli[];
    onAgregarClick: (index: number) => void;
    onVerMas?: () => void;
}

export default function GridCasilleros({ titulo, items, onAgregarClick, onVerMas }: GridProps) {
    // Mostramos siempre los primeros 4 casilleros principales estilo Letterboxd
    const casilleros = [0, 1, 2, 3];

    return (
        <section className="mb-10 bg-[#141414]/40 border border-white/5 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs uppercase tracking-wider text-[#fccb30] font-medium">{titulo}</h2>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-500 uppercase">Total: {items.length} películas</span>
                    {onVerMas && items.length > 0 && (
                        <button 
                            onClick={onVerMas}
                            className="text-xs text-[#fccb30] hover:underline uppercase tracking-wider"
                        >
                            Ver todas →
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {casilleros.map((index) => {
                    const peli = items[index];

                    return (
                        <div key={index} className="aspect-[2/3] rounded-lg overflow-hidden border border-white/10 bg-black/40 relative group">
                            {peli ? (
                                // Si hay película, se muestra el póster que al hacer clic te lleva a su ruta oficial
                                <div className="w-full h-full hover:scale-105 transition-transform">
                                    <PosterCard id={peli.id} title={peli.title} />
                                </div>
                            ) : (
                                // Si está vacío, muestra el casillero con el "+" para añadir
                                <button 
                                    onClick={() => onAgregarClick(index)}
                                    className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#fccb30] hover:border-[#fccb30]/50 transition-all cursor-pointer group-hover:bg-white/5"
                                >
                                    <span className="text-2xl font-light mb-1">+</span>
                                    <span className="text-[10px] uppercase tracking-wider">Añadir</span>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}