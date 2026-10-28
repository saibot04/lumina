import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 px-6 py-6">{children}</main>
        </div>
        </div>
    );
}