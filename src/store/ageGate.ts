import { create } from "zustand";

const STORAGE_KEY = "naughty-cards-age-verified";

function readInitial(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

interface AgeGateState {
  verified: boolean;
  confirm: () => void;
}

export const useAgeGateStore = create<AgeGateState>((set) => ({
  verified: readInitial(),
  confirm: () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
    set({ verified: true });
  },
}));
