"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


type ProfileMenuProps = {
	user: any;
	onLogout: () => void;
};

function ProfileMenu({ user, onLogout }: ProfileMenuProps) {
	const [open, setOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [displayName, setDisplayName] = useState(user.displayName || "");
	const [loading, setLoading] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setDisplayName(user.displayName || "");
	}, [user.displayName]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
				setSettingsOpen(false);
			}
		}
		if (open || settingsOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [open, settingsOpen]);


			async function handleSaveName(e: React.FormEvent) {
				e.preventDefault();
				setLoading(true);
				try {
					if (user && displayName && displayName !== user.displayName) {
						await updateProfile(user, { displayName });
						// Force refresh of user state
						const updatedUser = auth.currentUser;
						if (updatedUser) {
							setDisplayName(updatedUser.displayName || "");
						}
					}
					setSettingsOpen(false);
				} catch (err) {
					// handle error (show toast, etc.)
				} finally {
					setLoading(false);
				}
			}

	return (
		<div className="relative" ref={menuRef}>
			<button
				className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center focus-ring"
				onClick={() => setOpen((o) => !o)}
				aria-label="Open profile menu"
			>
				{displayName ? displayName.charAt(0).toUpperCase() : (user.email?.charAt(0).toUpperCase() || "U")}
			</button>
			{open && (
				<div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 p-4 flex flex-col items-center">
					<span className="text-sm font-semibold text-primary mb-2 truncate w-full text-center">
						{user.email}
					</span>
					<Button size="sm" variant="default" className="w-full mb-2 bg-gradient-to-r from-primary to-secondary text-white" onClick={() => setSettingsOpen(true)}>
						User Settings
					</Button>
					<Button size="sm" variant="destructive" className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white" onClick={onLogout}>
						Log Out
					</Button>
				</div>
			)}
			{settingsOpen && (
				<div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50 p-4 flex flex-col items-center">
					<form className="w-full flex flex-col gap-2" onSubmit={handleSaveName}>
						<label htmlFor="displayName" className="text-sm font-medium text-primary">Edit Name</label>
						<input
							id="displayName"
							type="text"
							value={displayName}
							onChange={e => setDisplayName(e.target.value)}
							className="border border-border rounded px-2 py-1 focus-ring"
							maxLength={32}
							required
						/>
						<div className="flex gap-2 mt-2">
							<Button type="submit" size="sm" className="bg-gradient-to-r from-primary to-secondary text-white" disabled={loading}>
								{loading ? "Saving..." : "Save"}
							</Button>
							<Button type="button" size="sm" variant="outline" onClick={() => setSettingsOpen(false)}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Resume Analysis", href: "/resume-analysis" },
	{ name: "Mock Interview", href: "/mock-interview" },
	{ name: "Progress", href: "/progress" },
	{ name: "Contact", href: "/contact" },
];

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [user, setUser] = useState<any>(null);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<>
			<a href="#main-content" className="skip-link focus-ring">
				Skip to main content
			</a>
			<nav
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					isScrolled ? "glass shadow-lg" : "bg-transparent",
				)}
				role="navigation"
				aria-label="Main navigation"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center space-x-2 group focus-ring rounded-lg"
							aria-label="InterviewAI Pro home"
						>
							<div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
								<Zap className="h-6 w-6 text-primary" aria-hidden="true" />
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								InterviewAI Pro
							</span>
						</Link>
						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary focus-ring rounded-md px-2 py-1",
										pathname === item.href ? "text-primary" : "text-muted-foreground",
									)}
									aria-current={pathname === item.href ? "page" : undefined}
								>
									{item.name}
								</Link>
							))}
							{user ? (
								<ProfileMenu user={user} onLogout={() => signOut(auth)} />
							) : (
								<Link href="/login">
									<Button size="sm" className="ml-4 focus-ring" aria-label="Login or Sign Up">
										Login / Sign Up
									</Button>
								</Link>
							)}
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="focus-ring"
								aria-expanded={isMobileMenuOpen}
								aria-controls="mobile-menu"
								aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							>
								{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
							</Button>
						</div>
					</div>

					{/* Mobile Navigation */}
					{isMobileMenuOpen && (
						<div className="md:hidden animate-fade-in" id="mobile-menu" onKeyDown={handleKeyDown}>
							<div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={cn(
											"block px-3 py-2 text-base font-medium rounded-md transition-colors focus-ring",
											pathname === item.href
												? "text-primary bg-primary/10"
												: "text-muted-foreground hover:text-primary hover:bg-primary/5",
										)}
										onClick={() => setIsMobileMenuOpen(false)}
										aria-current={pathname === item.href ? "page" : undefined}
									>
										{item.name}
									</Link>
								))}
								<div className="px-3 py-2">
									{user ? (
										<div className="flex flex-col items-center space-y-2">
											<span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
												{user.email}
											</span>
											<Button size="sm" variant="outline" onClick={() => signOut(auth)}>
												Log Out
											</Button>
										</div>
									) : (
										<Link href="/login">
											<Button size="sm" className="w-full focus-ring">
												Login / Sign Up
											</Button>
										</Link>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}
