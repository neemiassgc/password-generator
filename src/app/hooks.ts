import { useEffect, useState } from "react";

export function useClipboardChecking(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (navigator.clipboard) setAvailable(true);
  }, [])

  return available;
}