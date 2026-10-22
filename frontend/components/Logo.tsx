import Link from "next/link";

export default function Logo() {
    return (
        <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-black/70 px-3 py-1.5 text-lg font-medium tracking-wider text-primary"
        >
        <span className="h-2 w-2 rounded-full bg-primary" />
        LUMINA
        </Link>
    );
}