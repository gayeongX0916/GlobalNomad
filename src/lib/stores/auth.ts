import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;

  userId: number | null;
  setUserId: (t: number | null) => void;

  username: string | null;
  setUserName: (t: string | null) => void;

  profileImageUrl: string | null;
  setProfileImageUrl: (t: string | null) => void;

  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (t) => set({ accessToken: t }),

  userId: null,
  setUserId: (t) => set({ userId: t }),

  username: null,
  setUserName: (t) => set({ username: t }),

  profileImageUrl: null,
  setProfileImageUrl: (t) => set({ profileImageUrl: t }),

  clear: () =>
    set({
      accessToken: null,
      userId: null,
      username: null,
      profileImageUrl: null,
    }),
}));
