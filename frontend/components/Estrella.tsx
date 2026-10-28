const PATH =
"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

export default function Estrella({
llena = 1,
tamano = "h-5 w-5",
}: {
llena?: number;
tamano?: string;
}) {
const ancho = Math.max(0, Math.min(1, llena)) * 100;

return (
    <span className={`relative inline-block shrink-0 ${tamano}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" className={`absolute left-0 top-0 fill-white/20 ${tamano}`}>
        <path d={PATH} />
    </svg>
    <span
        className="absolute left-0 top-0 h-full overflow-hidden"
        style={{ width: `${ancho}%` }}
    >
        <svg viewBox="0 0 24 24" className={`max-w-none fill-primary ${tamano}`}>
        <path d={PATH} />
        </svg>
    </span>
    </span>
);
}