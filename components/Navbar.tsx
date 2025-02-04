
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Package2 } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import logo from "@/public/commvault_logo-removebg-preview.png";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
    { href: "/make-complaint", label: "Make Complaint" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-black text-white z-50 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-4">
        <Image
          src={logo}
          alt="Acme Inc"
          width={50}
          height={50}
          className="rounded-md"
        />
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <span className="sr-only">Acme Inc</span>
        </Link>
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
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-black"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black text-white">
          <SheetTitle className="ml-3 mb-3">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </SheetTitle>
          <SheetDescription></SheetDescription>
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
    "font-medium transition-colors duration-200 whitespace-nowrap";
  const mobileStyles = mobile
    ? "block text-lg py-2 px-4 rounded-md"
    : "inline-flex items-center px-2 py-2 rounded-md text-sm";
  const activeStyles = isActive
    ? "bg-primary/10 text-primary"
    : "text-foreground/60 hover:text-foreground hover:bg-accent";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${mobileStyles} ${activeStyles} bg-black text-white`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
