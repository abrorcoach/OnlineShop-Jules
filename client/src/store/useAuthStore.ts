import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthResponse } from '../types/auth';

interface AuthState {
    token: string | null;
    user: { email: string; role: string } | null;
    setAuth: (data: AuthResponse) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            setAuth: (data) => set({ token: data.token, user: { email: data.email, role: data.role } }),
            logout: () => set({ token: null, user: null }),
            isAuthenticated: () => !!get().token,
        }),
        {
            name: 'auth-storage',
        }
    )
);
