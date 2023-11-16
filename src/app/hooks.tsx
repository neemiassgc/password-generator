import { useEffect, useState } from "react";

export function useClipboardChecking(): boolean {
  type StateType = [ available: boolean, setAvailable: (value: boolean) => void ]
  const [available, setAvailable]: StateType = useState(false);

  useEffect(() => {
    if (navigator.clipboard) setAvailable(true);
  }, [])

  return available;
}