import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </SessionProvider>
    )
}
