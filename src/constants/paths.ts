export const paths = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  protected: {
    admin: {
      root: "/admin",
    },
    root: "/app",
  },
} as const;
