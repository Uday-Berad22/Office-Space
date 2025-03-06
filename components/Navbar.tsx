"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Package2 } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import logo from "@/public/parkPoolX.svg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ModeToggle from "./darkmode";
import Image from "next/image";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: "/", label: "Home" },
    { href: "/book-parking", label: "Book Parking" },
    { href: "/parking-allotted", label: "Parking Allotted" },
    { href: "/car-pooling", label: "Car Pooling" },
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-black text-white z-50 px-4 md:px-6">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:flex-row md:items-center md:gap-6 text-sm font-medium">
        <Image
          src={logo}
          alt="ParkPoolX Logo"
          width={100}
          height={50}
          className="rounded-md"
        />
        {routes.map((route) => (
          <NavLink
            key={route.href}
            href={route.href}
            isActive={pathname === route.href}
          >
            {route.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Button - Moved to left side */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-black">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white">
            <div className="flex items-center justify-between mb-4">
              <Image
                src={logo}
                alt="ParkPoolX Logo"
                width={100}
                height={50}
                className="rounded-md"
              />
              <Package2 className="h-6 w-6" />
            </div>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <NavLink
                  key={route.href}
                  href={route.href}
                  isActive={pathname === route.href}
                  mobile
                  onClick={handleLinkClick}
                >
                  {route.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo for Mobile */}
      <div className="md:hidden flex items-center">
        <Image
          src={logo}
          alt="ParkPoolX Logo"
          width={80}
          height={40}
          className="rounded-md"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive,
  mobile,
  onClick,
}) => {
  const baseStyles =
    "font-medium transition duration-200 whitespace-nowrap px-3 py-2 rounded-md";
  const mobileStyles = mobile ? "block text-lg" : "inline-flex items-center";
  const activeStyles = isActive
    ? "bg-gray-700 text-white"
    : "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${mobileStyles} ${activeStyles}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
