"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { Menu, UserRound, Search, X, Sun, Moon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useAuth } from "@/lib/hooks/use-auth";
import { useTheme } from "next-themes";

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

/**
 * Returns true only on the client.
 * This avoids setState inside useEffect and prevents hydration issues.
 */
const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const mounted = useIsMounted();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <header
      className="
        sticky
        top-3
        z-50
        px-2
        py-2
        md:px-4
      "
    >
      <div className="mx-auto max-w-280">
        {/* ================= NAVBAR ================= */}

        <div
          className="rounded-2xl  bg-white  text-gray-900  shadow-lg  border border-gray-200
"
        >
          <Container>
            <div className="flex min-h-17 items-center justify-between gap-4">
              {/* ================= LOGO ================= */}

              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label="LKS Home"
              >
                <Image
                  src="/images/logo.png"
                  alt="Learning Knowledge Solution logo"
                  width={52}
                  height={52}
                  priority
                  className="h-12 w-12 object-contain"
                />
              </Link>

              {/* ================= DESKTOP NAVIGATION ================= */}

              <nav className="hidden items-center gap-5 xl:flex">
                {navigation.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className="
                      text-sm
                      font-medium
                      text-gray-500
                      transition-colors
                      hover:text-gray-900
                      active:text-gray-900
                    "
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* ================= DESKTOP RIGHT ================= */}

              <div className="hidden items-center gap-2 lg:flex">
                {/* SEARCH */}

                <form
                  onSubmit={handleSearch}
                  className="
                    flex
                    h-10
                    items-center
                    rounded-full
                    border
                    border-gray-300
                    bg-white/10
                    px-3
                    transition-all
                    focus-within:border-gray-500
                    focus-within:bg-white/15
                  "
                >
                  <Search className="h-4 w-4 shrink-0 text-gray-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="
                      w-24
                      bg-transparent
                      px-2
                      text-sm
                      text-black
                      outline-none
                      transition-all
                      placeholder:text-gray-500
                      focus:w-32
                    "
                  />
                </form>

                {/* ================= THEME TOGGLE ================= */}

                {mounted && (
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle dark and light mode"
                    title={
                      theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-300
                      bg-white
                      text-black
                      transition-all
                      hover:bg-gray-200
                    "
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </button>
                )}

                {/* ================= LOGIN ================= */}

                <Button
                  variant="ghost"
                  className="
                    text-black
                    hover:bg-gray-200
                    hover:text-black
                  "
                  nativeButton={false}
                  render={
                    <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                      <UserRound className="mr-2 h-4 w-4" />

                      {isAuthenticated ? "Dashboard" : "Login"}
                    </Link>
                  }
                />

                {/* ================= ADMISSION / LOGOUT ================= */}

                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={() => void logout()}
                    className="
                      border-gray-300
                      bg-transparent
                      text-black
                      hover:bg-gray-200
                      hover:text-[#06152f]
                    "
                  >
                    Log out
                  </Button>
                ) : (
                  <Button
                    nativeButton={false}
                    className="
                      bg-[#2E5BCC]
                      text-white
                      hover:bg-[#2449a6]
                    "
                    render={<Link href="/admissions">Admission</Link>}
                  />
                )}
              </div>

              {/* ================= MOBILE RIGHT ================= */}

              <div className="flex items-center gap-1 lg:hidden">
                {/* THEME */}

                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="
                      text-white
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                )}

                {/* SEARCH */}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search"
                  className="
                    text-white
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  {searchOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>

                {/* MENU */}

                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Open navigation"
                      className="
                        border-white/20
                        bg-white/10
                        text-white
                        hover:bg-white
                        hover:text-[#06152f]
                      "
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <div className="mt-8 flex flex-col gap-5">
                      {/* LOGO */}

                      <Link
                        href="/"
                        className="flex items-center"
                        aria-label="Home"
                      >
                        <Image
                          src="/images/logo.png"
                          alt="Learning Knowledge Solution logo"
                          width={52}
                          height={52}
                          className="h-12 w-12 object-contain"
                        />
                      </Link>

                      {/* SEARCH */}

                      <form
                        onSubmit={handleSearch}
                        className="
                          flex
                          h-11
                          items-center
                          rounded-xl
                          border
                          bg-background
                          px-3
                        "
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />

                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search courses..."
                          className="
                            w-full
                            bg-transparent
                            px-3
                            text-sm
                            outline-none
                          "
                        />
                      </form>

                      {/* NAVIGATION */}

                      <div className="mt-2 flex flex-col gap-4">
                        {navigation.map((item) => (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            className="
                              text-base
                              font-medium
                              transition-colors
                              hover:text-primary
                            "
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* BUTTONS */}

                      <div className="mt-4 flex flex-col gap-3">
                        <Button
                          variant="outline"
                          nativeButton={false}
                          render={
                            <Link
                              href={isAuthenticated ? "/dashboard" : "/login"}
                            >
                              <UserRound className="mr-2 h-4 w-4" />

                              {isAuthenticated ? "Dashboard" : "Login"}
                            </Link>
                          }
                        />

                        {isAuthenticated ? (
                          <Button onClick={() => void logout()}>Log out</Button>
                        ) : (
                          <Button
                            nativeButton={false}
                            render={
                              <Link href="/admissions">
                                Apply for Admission
                              </Link>
                            }
                          />
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* ================= MOBILE SEARCH ================= */}

            {searchOpen && (
              <div className="pb-3 lg:hidden">
                <form
                  onSubmit={handleSearch}
                  className="
                    flex
                    h-11
                    items-center
                    rounded-xl
                    bg-white
                    px-3
                  "
                >
                  <Search className="h-4 w-4 text-gray-500" />

                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses, classes..."
                    className="
                      w-full
                      bg-transparent
                      px-3
                      text-sm
                      text-gray-900
                      outline-none
                    "
                  />
                </form>
              </div>
            )}
          </Container>
        </div>
      </div>
    </header>
  );
}
