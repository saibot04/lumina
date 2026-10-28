import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Header, Sidebar } from "@/components/Navegacion";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 px-6 py-6">{children}</main>
        </div>
        <Footer />
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header />

                <main className="px-4 pb-16 sm:px-6">{children}</main>
            </div>
        </div>
    );
}