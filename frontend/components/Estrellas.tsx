import Estrella from "./Estrella";

export default function Estrellas({
valor,
tamano = "h-4 w-4",
}: {
valor: number;
tamano?: string;
}) {
return (
    <span
    className="inline-flex gap-0.5"
    role="img"
    aria-label={`${valor} de 5 estrellas`}
    >
    {[1, 2, 3, 4, 5].map((n) => (
        <Estrella
        key={n}
        tamano={tamano}
        llena={Math.min(1, Math.max(0, valor - (n - 1)))}
        />
    ))}
    </span>
);
}