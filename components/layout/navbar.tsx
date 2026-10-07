"use client";

import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import Image from "next/image";


const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Classes",
    href: "/classes",
  },
  {
    label: "Teachers",
    href: "/#teachers",
  },
  {
    label: "Results",
    href: "/#test-series",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06152f] text-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Learning Knowledge Solution logo"
              width={52}
              height={52}
              priority
              className="h-12 w-12 object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-[#45bdff]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              nativeButton={false}
              render={
                <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                  <UserRound className="mr-2 h-4 w-4" />
                  {isAuthenticated ? "Dashboard" : "Login"}
                </Link>
              }
            ></Button>

            {isAuthenticated ? (
              <Button variant="outline" onClick={() => void logout()}>Log out</Button>
            ) : (
              <Button nativeButton={false} render={<Link href="/admissions">Admission</Link>}></Button>
            )}
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <div className="mt-8 flex flex-col gap-5">
                  <Link href="/" className="flex items-center" aria-label="Home">
                    <Image
                      src="/images/logo.png"
                      alt="Learning Knowledge Solution logo"
                      width={52}
                      height={52}
                      className="h-12 w-12 object-contain"
                    />
                  </Link>

                  <div className="mt-6 flex flex-col gap-4">
                    {navigation.map((item) => (
                      <Link
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        className="text-base font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <Button variant="outline" nativeButton={false} render={<Link href={isAuthenticated ? "/dashboard" : "/login"}>{isAuthenticated ? "Dashboard" : "Login"}</Link>}></Button>
                    {isAuthenticated ? (
                      <Button onClick={() => void logout()}>Log out</Button>
                    ) : (
                      <Button nativeButton={false} render={<Link href="/admissions">Apply for Admission</Link>}></Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
