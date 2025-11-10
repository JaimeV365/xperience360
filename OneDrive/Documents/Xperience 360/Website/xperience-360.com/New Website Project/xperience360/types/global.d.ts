declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void
      open: () => void
      close: () => void
      currentUser: () => any
      logout: () => void
    }
  }
}

export {}



