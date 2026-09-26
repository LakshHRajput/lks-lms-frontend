"use client";

import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    href: "/teachers",
  },
  {
    label: "Results",
    href: "/results",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur `supports-[backdrop-filter]:bg-background/80`">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              render={
                <Link href="/login">
                  <UserRound className="mr-2 h-4 w-4" />
                  Login
                </Link>
              }
            ></Button>

            <Button render={<Link href="/admission">Admission</Link>}></Button>
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
                  <Logo />

                  <div className="mt-6 flex flex-col gap-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-base font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      render={<Link href="/login">Login</Link>}
                    ></Button>

                    <Button
                      render={
                        <Link href="/admission">Apply for Admission</Link>
                      }
                    ></Button>
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
