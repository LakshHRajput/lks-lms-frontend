import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="LKS - Learning Knowledge Solution"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
        L
      </div>

      <div className="hidden sm:block">
        <div className="text-sm font-bold leading-none">
          LKS
        </div>

        <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Learning Knowledge Solution
        </div>
      </div>
    </Link>
  );
}