import { create } from 'zustand'

const useAdmin = create((set) => ({
    user: [],
    userLoaded: false,
    setUser: (u) => set(() => ({ user: u })),
    logoutUser: () => set({ user: [] }),
    loadingUser: (load) => set({ userLoaded: load })
}))

export default useAdmin