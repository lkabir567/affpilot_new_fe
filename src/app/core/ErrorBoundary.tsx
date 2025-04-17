import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="p-4 text-red-600">
      <h1>Something went wrong.</h1>
      <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
    </div>
  );
}
