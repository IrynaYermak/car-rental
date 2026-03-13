"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorHandler({ error, reset }: ErrorProps) {
  return (
    <div className="container">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again!</button>
    </div>
  );
}
