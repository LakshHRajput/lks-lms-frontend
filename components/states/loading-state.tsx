interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-45 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"
          aria-label="Loading"
        />

        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}