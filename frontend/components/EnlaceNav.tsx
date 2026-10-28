"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EnlaceNav({
href,
label,
onNavegar,
className = "",
}: {
href: string;
label: string;
onNavegar?: () => void;
className?: string;
}) {
const pathname = usePathname();
const activo = pathname === href;

return (
    <Link
    href={href}
    onClick={onNavegar}
    aria-current={activo ? "page" : undefined}
    className={`block rounded px-2 py-1.5 text-sm transition hover:text-primary ${
        activo ? "text-primary" : "text-muted"
    } ${className}`}
    >
    {label}
    </Link>
);
}