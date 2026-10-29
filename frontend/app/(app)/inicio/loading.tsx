export default function Cargando() {
    return (
        <div className="space-y-10">
            <div className="min-h-[320px] animate-pulse rounded-xl bg-white/5 md:min-h-[400px]" />

            {[1, 2].map((fila) => (
                <div key={fila} className="space-y-3">
                    <div className="h-6 w-40 animate-pulse rounded bg-white/5" />
                    <div className="flex gap-3 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map((c) => (
                            <div
                                key={c}
                                className="aspect-[2/3] w-28 shrink-0 animate-pulse rounded-md bg-white/5 sm:w-32 lg:w-36"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}