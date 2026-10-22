import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
            <div className="flex justify-end p-4">
            <Link
                href="/login"
                className="h-8 w-8 rounded-full bg-primary"
                aria-label="Iniciar sesión"
            />
            </div>
            <main className="px-6 pb-12">{children}</main>
        </div>
        </div>
    );
}