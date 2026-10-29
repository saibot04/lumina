import { Suspense } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
return (
    <div className="flex min-h-screen flex-col">
    <Header />
    <div className="flex flex-1">
        <Suspense
        fallback={
            <aside className="hidden w-56 shrink-0 border-r border-white/5 md:block" />
        }
        >
        <Sidebar />
        </Suspense>
        <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
    </div>
    <Footer />
    </div>
);
}