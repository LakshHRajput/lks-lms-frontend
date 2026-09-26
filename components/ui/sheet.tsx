"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext =
  React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const context = React.useContext(SheetContext);

  if (!context) {
    throw new Error(
      "Sheet components must be used inside <Sheet>"
    );
  }

  return context;
}

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: SheetProps) {
  const [internalOpen, setInternalOpen] =
    React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;

  const open = isControlled
    ? controlledOpen
    : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  return (
    <SheetContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function SheetTrigger({
  children,
  asChild = false,
  onClick,
  ...props
}: SheetTriggerProps) {
  const { setOpen } = useSheet();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(true);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        onClick?: (
          event: React.MouseEvent<HTMLButtonElement>
        ) => void;
      }>,
      {
        onClick: handleClick,
      }
    );
  }

  return (
    <button
      type="button"
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

interface SheetContentProps {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

function SheetContent({
  children,
  side = "right",
  className,
}: SheetContentProps) {
  const { open, setOpen } = useSheet();

  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  const sideClasses = {
    right:
      "right-0 top-0 h-full w-[85%] max-w-sm border-l",
    left:
      "left-0 top-0 h-full w-[85%] max-w-sm border-r",
    top:
      "left-0 top-0 w-full border-b",
    bottom:
      "bottom-0 left-0 w-full border-t",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg",
          sideClasses[side],
          className
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        {children}
      </aside>
    </>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
};