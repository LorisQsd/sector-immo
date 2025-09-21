export const PATHS = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  accountVerification: "/account-verification",
  protected: {
    admin: {
      root: "/admin",
      permissions: "/admin/permissions",
      team: "/admin/team",
    },
    root: "/app",
  },
} as const;
