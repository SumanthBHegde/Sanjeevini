"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async (provider: string) => {
        try {
            setLoadingProvider(provider);
            setError(null);

            await signIn(provider, {
                callbackUrl: "/",
            });
        } catch (err) {
            setError(`Failed to sign in with ${provider}. Please try again.`);
            console.error(err);
        } finally {
            setLoadingProvider(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-home">
            <div className="p-8 bg-white shadow-card rounded-lg max-w-md w-full border border-card-stroke-primary">
                <h1 className="heading text-center mb-8">Sign In</h1>
                {error && (
                    <div
                        className="mb-6 text-red-500 text-center body-text-secondary"
                        role="alert"
                        aria-live="assertive"
                    >
                        {error}
                    </div>
                )}
                <div className="flex flex-col gap-6">
                    <button
                        onClick={() => handleSignIn("github")}
                        className={`flex items-center justify-center gap-3 px-5 py-4 rounded-lg w-full 
                                  border border-card-stroke-primary bg-gray-800 text-text-on-accent hover:bg-gray-700 transition
                                  ${loadingProvider === "github" ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loadingProvider !== null}
                        aria-busy={loadingProvider === "github"}
                        aria-label="Sign in with GitHub"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 .198a8 8 0 0 0-2.53 15.599c.4.073.55-.173.55-.385v-1.375c-2.226.485-2.697-1.073-2.697-1.073-.364-.926-.891-1.172-.891-1.172-.728-.496.055-.486.055-.486.805.057 1.23.827 1.23.827.715 1.223 1.873.87 2.33.665.073-.517.279-.87.507-1.071-1.775-.2-3.644-.888-3.644-3.953 0-.873.311-1.587.823-2.146-.083-.202-.357-1.016.078-2.117 0 0 .67-.216 2.19.825a7.563 7.563 0 0 1 1.993-.27c.676.003 1.355.092 1.993.27 1.52-1.04 2.19-.825 2.19-.825.435 1.101.16 1.915.078 2.117.513.559.822 1.273.822 2.146 0 3.074-1.872 3.75-3.654 3.947.286.247.54.735.54 1.48v2.2c0 .214.15.46.554.382A8 8 0 0 0 8 .198z"
                            />
                        </svg>
                        <span className="nav-text text-white">
                            {loadingProvider === "github" ? "Signing in..." : "Sign in with GitHub"}
                        </span>
                    </button>
                    <button
                        onClick={() => handleSignIn("google")}
                        className={`flex items-center justify-center gap-3 px-5 py-4 rounded-lg w-full 
                                  border border-card-stroke-primary bg-white hover:bg-gray-50 transition
                                  ${loadingProvider === "google" ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loadingProvider !== null}
                        aria-busy={loadingProvider === "google"}
                        aria-label="Sign in with Google"
                    >
                        <img
                            src="/google-icon.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="nav-text text-text-primary">
                            {loadingProvider === "google" ? "Signing in..." : "Sign in with Google"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
