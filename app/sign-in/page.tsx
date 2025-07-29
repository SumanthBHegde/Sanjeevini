"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

function SignInContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";
    const errorType = searchParams?.get("error");
    const [error, setError] = useState<string | null>(null);

    // Check if we're coming from the "Sign Up" button or if there's an error
    useEffect(() => {
        if (searchParams?.get("isRegister") === "true") {
            setIsRegistering(true);
        }

        // Handle error messages
        if (errorType) {
            switch (errorType) {
                case "CredentialsSignin":
                    setError("Invalid email or password. Please try again.");
                    break;
                case "OAuthAccountNotLinked":
                    setError("You already have an account with a different provider. Please sign in with your original provider.");
                    break;
                case "AccessDenied":
                    setError("Access denied. You may not have permission to sign in.");
                    break;
                default:
                    setError("An error occurred during sign in. Please try again.");
            }
        }
    }, [searchParams, errorType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Registration logic
        if (isRegistering) {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            if (password.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }

            setLoadingProvider("register");
            try {
                // Create user in Sanity
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to register");
                }

                // Try signing in with credentials first
                try {
                    console.log("Attempting to sign in after registration with email:", email);
                    const signInResult = await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                    });

                    if (signInResult?.error) {
                        console.error("Sign-in after registration failed:", signInResult.error);
                        // If immediate sign-in fails, try with a delay
                        setTimeout(async () => {
                            const retryResult = await signIn("credentials", {
                                email,
                                password,
                                redirect: true,
                                callbackUrl: callbackUrl
                            });
                        }, 1000);

                        // Show success message but don't redirect yet (will happen in the setTimeout)
                        toast({
                            title: "Account created!",
                            description: "Please wait while we sign you in...",
                        });
                    } else {
                        // Show success toast
                        toast({
                            title: "Account created!",
                            description: "You have been signed in successfully.",
                        });

                        // Redirect to home or callback URL
                        router.push(callbackUrl);
                    }
                } catch (err: any) {
                    setError(err.message || "Registration failed. Please try again.");
                } finally {
                    setLoadingProvider(null);
                }
            } catch (err: any) {
                setError(err.message || "Registration failed. Please try again.");
            } finally {
                setLoadingProvider(null);
            }
        } else {
            // Login logic
            setLoadingProvider("credentials");
            setError(null);

            try {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    setError("Invalid email or password");
                } else {
                    router.push(callbackUrl);
                }
            } catch (err) {
                setError("An error occurred during sign in. Please try again.");
            } finally {
                setLoadingProvider(null);
            }
        }
    };

    const handleProviderSignIn = async (provider: string) => {
        setLoadingProvider(provider);
        setError(null);

        try {
            await signIn(provider, { callbackUrl });
        } catch (err) {
            // This error handling may not trigger since signIn redirects the page
            setError(`Failed to sign in with ${provider}. Please try again.`);
        } finally {
            setLoadingProvider(null);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-home)] py-12">
            <div className="section_container">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row">
                        {/* Auth Form Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12">
                            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                                {isRegistering ? "Create an Account" : "Welcome Back"}
                            </h1>

                            {error && (
                                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                <button
                                    onClick={() => handleProviderSignIn("google")}
                                    disabled={loadingProvider !== null}
                                    aria-disabled={loadingProvider !== null}
                                    className={`w-full flex items-center justify-center gap-3 rounded-md py-3 px-4 text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors ${loadingProvider ? "opacity-70 cursor-not-allowed" : ""} form_input`}
                                >
                                    <Image src="/google.svg" alt="Google" width={20} height={20} />
                                    <span className="nav-text">
                                        {loadingProvider === "google"
                                            ? "Signing in..."
                                            : isRegistering
                                                ? "Sign up with Google"
                                                : "Sign in with Google"
                                        }
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleProviderSignIn("github")}
                                    disabled={loadingProvider !== null}
                                    aria-disabled={loadingProvider !== null}
                                    className={`w-full flex items-center justify-center gap-3 rounded-md py-3 px-4 bg-gray-800 text-white hover:bg-gray-700 transition-colors ${loadingProvider ? "opacity-70 cursor-not-allowed" : ""}`}
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
                                    <span className="text-white">
                                        {loadingProvider === "github"
                                            ? "Signing in..."
                                            : isRegistering
                                                ? "Sign up with GitHub"
                                                : "Sign in with GitHub"
                                        }
                                    </span>
                                </button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[var(--color-divider-stroke)]"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-[var(--color-text-body-secondary)]">Or continue with</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {isRegistering && (
                                    <div>
                                        <label htmlFor="name" className="form_label">NAME</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form_input"
                                            placeholder="Enter your name"
                                            disabled={loadingProvider !== null}
                                        />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="form_label">EMAIL</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form_input"
                                        placeholder="Enter your email"
                                        disabled={loadingProvider !== null}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="form_label">PASSWORD</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form_input"
                                        placeholder="Enter your password"
                                        minLength={8}
                                        disabled={loadingProvider !== null}
                                    />
                                </div>

                                {isRegistering && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="form_label">CONFIRM PASSWORD</label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form_input"
                                            placeholder="Confirm your password"
                                            minLength={8}
                                            disabled={loadingProvider !== null}
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loadingProvider !== null}
                                    aria-disabled={loadingProvider !== null}
                                    className="submit_button w-full"
                                >
                                    {loadingProvider === "credentials" || loadingProvider === "register"
                                        ? "Processing..."
                                        : isRegistering
                                            ? "Sign Up"
                                            : "Sign In"
                                    }
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        setIsRegistering(!isRegistering);
                                        setError(null);
                                    }}
                                    className="text-[var(--color-bg-accent)] hover:underline nav-text"
                                    type="button"
                                >
                                    {isRegistering
                                        ? "Already have an account? Sign In"
                                        : "Don't have an account? Sign Up"}
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <a
                                    href="/"
                                    className="inline-flex items-center text-[var(--color-text-body-secondary)] hover:text-[var(--color-bg-accent)] nav-text"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Return Home
                                </a>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="hidden md:block md:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.4)] to-transparent z-10"></div>
                            <Image
                                src="/hero3.webp"
                                alt="Medicinal Plants"
                                width={800}
                                height={1200}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center z-20 p-12">
                                <div className="text-white">
                                    <h2 className="text-3xl font-bold mb-4">Discover the Healing Power of Nature</h2>
                                    <p className="text-lg">
                                        Join our community to explore traditional medicinal plants of the Western Ghats,
                                        learn cultivation techniques, and contribute to preserving this ancient knowledge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}