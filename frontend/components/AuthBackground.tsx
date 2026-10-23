export default function AuthBackground({ children }: { children: React.ReactNode }) {
    return (
        <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/wallpaper.jpg)" }}
        >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex min-h-screen flex-col p-6">{children}</div>
        </div>
    );
}