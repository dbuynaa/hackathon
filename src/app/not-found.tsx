"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Хуудас олдсонгүй!</h1>
      <button onClick={() => reset()}>Дахин оролдоно уу</button>
    </div>
  );
}
