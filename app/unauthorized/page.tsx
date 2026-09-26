export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          403
        </h1>

        <h2 className="mt-2 text-xl font-semibold">
          Access Denied
        </h2>

        <p className="mt-2 text-muted-foreground">
          You do not have permission to access this page.
        </p>
      </div>
    </main>
  );
}