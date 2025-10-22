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
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                const target = event.target as HTMLElement;
                // Don't close if clicking the menu button
                if (!target.closest('[data-mobile-menu-button]')) {
                    setMobileMenuOpen(false);
                }
            }
        }

        if (dropdownOpen || mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen, mobileMenuOpen]);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toggle dropdown on button click
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-[var(--color-home)] border-b border-[#e0eacf] sticky top-0 z-50">
            <div className="section_container py-0">
                <div className="flex justify-between items-center h-14 md:h-16">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/sanjeevini-logo.png"
                                alt="Sanjeevini Logo"
                                width={160}
                                height={40}
                                className="h-10 md:h-12 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/plants" className="nav-text hover:text-[var(--color-bg-accent)] transition-colors">
                            Plants
                        </Link>
                        <Link href="/medicinal" className="nav-text hover:text-[var(--color-bg-accent)] transition-colors">
                            Medicinal
                        </Link>
                        <Link href="/cultivation" className="nav-text hover:text-[var(--color-bg-accent)] transition-colors">
                            Cultivation
                        </Link>
                        <Link href="/about" className="nav-text hover:text-[var(--color-bg-accent)] transition-colors">
                            About
                        </Link>
                    </div>

                    {/* Auth & Mobile Menu */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {session?.user ? (
                            <div className="hidden md:flex items-center" ref={dropdownRef}>
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 nav-text hover:text-[var(--color-bg-accent)] px-2 md:px-3 py-2 rounded-lg transition-colors duration-200"
                                        onClick={toggleDropdown}
                                        aria-expanded={dropdownOpen}
                                        aria-label="User menu"
                                    >
                                        <div className="w-8 h-8">
                                            <UserAvatar
                                                src={session.user.image}
                                                name={session.user.name || undefined}
                                                fallbackText={session.user.name ? session.user.name[0].toUpperCase() : session.user.email ? session.user.email[0].toUpperCase() : "U"}
                                                className="rounded-full border-2 border-[var(--color-avatar-card-stroke)] hover:border-[var(--color-bg-accent)] transition-colors"
                                            />
                                        </div>
                                        <span className="hidden lg:inline max-w-[120px] truncate">
                                            {session.user.name || session.user.email?.split('@')[0]}
                                        </span>
                                        <HiChevronDown
                                            className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Desktop Dropdown menu */}
                                    <div
                                        className={`absolute right-0 mt-2 w-56 bg-white rounded-lg border border-[var(--color-card-stroke-primary)] shadow-lg py-2 z-50 transition-all duration-200 origin-top-right ${dropdownOpen
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-95 pointer-events-none'
                                            }`}
                                    >
                                        <Link
                                            href="/user/profile"
                                            className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href="/user/plants"
                                            className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Your Plants
                                        </Link>

                                        {/* Role specific menu items */}
                                        {(session.user.role === 'admin' || session.user.isAdmin) && (
                                            <>
                                                <div className="border-t border-[var(--color-divider-stroke)] my-1"></div>
                                                <Link
                                                    href="/admin"
                                                    className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                                <Link
                                                    href="/admin/editor-requests"
                                                    className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    Editor Requests
                                                </Link>
                                            </>
                                        )}

                                        {session.user.role === 'editor' && (
                                            <>
                                                <div className="border-t border-[var(--color-divider-stroke)] my-1"></div>
                                                <Link
                                                    href="/plant/create"
                                                    className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    Create New Plant
                                                </Link>
                                            </>
                                        )}

                                        {session.user.role === 'viewer' && !session.user.pendingEditorRequest && (
                                            <>
                                                <div className="border-t border-[var(--color-divider-stroke)] my-1"></div>
                                                <Link
                                                    href="/user/request-editor"
                                                    className="block px-4 py-2.5 text-sm nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] text-amber-600 transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    Request Editor Role
                                                </Link>
                                            </>
                                        )}

                                        {session.user.pendingEditorRequest && (
                                            <div className="block px-4 py-2.5 text-sm text-amber-600 bg-amber-50 border-t border-[var(--color-divider-stroke)]">
                                                Editor Request Pending
                                            </div>
                                        )}

                                        <div className="border-t border-[var(--color-divider-stroke)] my-1"></div>
                                        <Link
                                            href="/api/auth/signout"
                                            className="block px-4 py-2.5 text-sm nav-text text-red-600 hover:bg-red-50 transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link
                                    href="/sign-in"
                                    className="btn-outline text-sm md:text-base px-3 md:px-4"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/sign-in?isRegister=true"
                                    className="btn-primary text-sm md:text-base px-3 md:px-4"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            data-mobile-menu-button
                            className="lg:hidden p-2 nav-text hover:text-[var(--color-bg-accent)] transition-colors rounded-lg hover:bg-[var(--color-bg-card)]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenuAlt3 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile/Tablet Menu */}
                <div
                    ref={mobileMenuRef}
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-1 border-t border-[#e0eacf]">
                        {/* Navigation Links */}
                        <Link
                            href="/plants"
                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Plants
                        </Link>
                        <Link
                            href="/medicinal"
                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Medicinal
                        </Link>
                        <Link
                            href="/cultivation"
                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Cultivation
                        </Link>
                        <Link
                            href="/about"
                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            About
                        </Link>

                        {/* User Menu Items for Mobile */}
                        {session?.user ? (
                            <>
                                <div className="border-t border-[#e0eacf] my-2 pt-2">
                                    <div className="px-4 py-2 flex items-center gap-3">
                                        <UserAvatar
                                            src={session.user.image}
                                            name={session.user.name || undefined}
                                            fallbackText={session.user.name ? session.user.name[0].toUpperCase() : session.user.email ? session.user.email[0].toUpperCase() : "U"}
                                            className="rounded-full border-2 border-[var(--color-avatar-card-stroke)] w-10 h-10"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium nav-text truncate">
                                                {session.user.name || session.user.email?.split('@')[0]}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/user/profile"
                                    className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    href="/user/plants"
                                    className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Your Plants
                                </Link>

                                {/* Role specific menu items */}
                                {(session.user.role === 'admin' || session.user.isAdmin) && (
                                    <>
                                        <div className="border-t border-[#e0eacf] my-2"></div>
                                        <Link
                                            href="/admin"
                                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Admin Dashboard
                                        </Link>
                                        <Link
                                            href="/admin/editor-requests"
                                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Editor Requests
                                        </Link>
                                    </>
                                )}

                                {session.user.role === 'editor' && (
                                    <>
                                        <div className="border-t border-[#e0eacf] my-2"></div>
                                        <Link
                                            href="/plant/create"
                                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Create New Plant
                                        </Link>
                                    </>
                                )}

                                {session.user.role === 'viewer' && !session.user.pendingEditorRequest && (
                                    <>
                                        <div className="border-t border-[#e0eacf] my-2"></div>
                                        <Link
                                            href="/user/request-editor"
                                            className="block py-3 px-4 nav-text hover:bg-[var(--color-bg-card)] hover:text-[var(--color-bg-accent)] text-amber-600 rounded-lg transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Request Editor Role
                                        </Link>
                                    </>
                                )}

                                {session.user.pendingEditorRequest && (
                                    <div className="block py-3 px-4 text-sm text-amber-600 bg-amber-50 rounded-lg mx-4">
                                        Editor Request Pending
                                    </div>
                                )}

                                <div className="border-t border-[#e0eacf] my-2"></div>
                                <Link
                                    href="/api/auth/signout"
                                    className="block py-3 px-4 nav-text text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Sign Out
                                </Link>
                            </>
                        ) : (
                            <div className="border-t border-[#e0eacf] my-2 pt-2 px-4 flex flex-col gap-2">
                                <Link
                                    href="/sign-in"
                                    className="btn-outline w-full text-center"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/sign-in?isRegister=true"
                                    className="btn-primary w-full text-center"
                                    onClick={closeMobileMenu}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}