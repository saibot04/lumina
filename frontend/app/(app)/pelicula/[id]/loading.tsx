export default function Cargando() {
return (
    <div className="mx-auto max-w-5xl space-y-10">
    <section className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="aspect-[2/3] w-full max-w-[240px] animate-pulse rounded-lg bg-white/5" />
        <div className="space-y-4">
        <div className="h-10 w-2/3 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-white/5" />
        <div className="h-24 w-full max-w-2xl animate-pulse rounded bg-white/5" />
        </div>
    </section>
    </div>
);
}