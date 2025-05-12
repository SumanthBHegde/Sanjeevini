"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import UserAvatar from "../ui/user-avatar";
import { HiChevronDown, HiX, HiMenuAlt3 } from "react-icons/hi";

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Toggle dropdown on button click
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-[var(--color-home)] border-b border-[#e0eacf] sticky top-0 z-50">
            <div className="section_container py-0">
                <div className="flex justify-between items-center h-12">
                    {/* Logo and Site Name */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Sanjeevini Logo"
                                width={200}
                                height={50}
                                className="h-12 object-cover"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/plants" className="nav-text hover:text-[var(--color-bg-accent)]">Plants</Link>
                        <Link href="/medicinal" className="nav-text hover:text-[var(--color-bg-accent)]">Medicinal</Link>
                        <Link href="/cultivation" className="nav-text hover:text-[var(--color-bg-accent)]">Cultivation</Link>
                        <Link href="/about" className="nav-text hover:text-[var(--color-bg-accent)]">About</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        {session?.user ? (
                            <div className="flex items-center" ref={dropdownRef}>
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 nav-text hover:text-[var(--color-bg-accent)] px-3 py-2 rounded-lg transition-colors duration-200"
                                        onClick={toggleDropdown}
                                        aria-expanded={dropdownOpen}
                                    >
                                        <div className="w-8 h-8">
                                            <UserAvatar
                                                src={session.user.image}
                                                name={session.user.name || undefined}
                                                fallbackText={session.user.name ? session.user.name[0].toUpperCase() : session.user.email ? session.user.email[0].toUpperCase() : "U"}
                                                className="rounded-full border-2 border-[var(--color-avatar-card-stroke)] hover:border-[var(--color-bg-accent)] transition-colors"
                                            />
                                        </div>
                                        <span className="hidden sm:inline">{session.user.name || session.user.email?.split('@')[0]}</span>
                                        <HiChevronDown
                                            className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown menu */}
                                    <div
                                        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg border border-[var(--color-card-stroke-primary)] shadow-md py-2 z-50 transition-all duration-200 origin-top-right ${dropdownOpen
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-95 pointer-events-none'
                                            }`}
                                    >
                                        <Link
                                            href="/user/profile"
                                            className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)]"
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href="/user/plants"
                                            className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)]"
                                        >
                                            Your Plants
                                        </Link>

                                        {/* Role specific menu items */}
                                        {(session.user.role === 'admin' || session.user.isAdmin) && (
                                            <>
                                                <Link
                                                    href="/admin"
                                                    className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)]"
                                                >
                                                    Admin Dashboard
                                                </Link>
                                                <Link
                                                    href="/admin/editor-requests"
                                                    className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)]"
                                                >
                                                    Editor Requests
                                                </Link>
                                            </>
                                        )}

                                        {session.user.role === 'editor' && (
                                            <Link
                                                href="/plant/create"
                                                className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)]"
                                            >
                                                Create New Plant
                                            </Link>
                                        )}

                                        {session.user.role === 'viewer' && !session.user.pendingEditorRequest && (
                                            <Link
                                                href="/user/request-editor"
                                                className="block px-4 py-2 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] text-amber-600"
                                            >
                                                Request Editor Role
                                            </Link>
                                        )}

                                        {session.user.pendingEditorRequest && (
                                            <div className="block px-4 py-2 text-sm text-amber-600 bg-amber-50">
                                                Editor Request Pending
                                            </div>
                                        )}

                                        <div className="border-t border-[var(--color-divider-stroke)] my-1"></div>
                                        <Link
                                            href="/api/auth/signout"
                                            className="block px-4 py-2 text-sm nav-text text-red-600 hover:bg-red-50"
                                        >
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/sign-in"
                                    className="btn-outline"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/sign-in?isRegister=true"
                                    className="btn-primary hidden sm:block"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenuAlt3 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#e0eacf]">
                        <Link href="/plants" className="block py-2 nav-text">Plants</Link>
                        <Link href="/medicinal" className="block py-2 nav-text">Medicinal</Link>
                        <Link href="/cultivation" className="block py-2 nav-text">Cultivation</Link>
                        <Link href="/about" className="block py-2 nav-text">About</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}