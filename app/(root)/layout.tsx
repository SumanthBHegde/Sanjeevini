import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </AuthProvider>
    )
}
