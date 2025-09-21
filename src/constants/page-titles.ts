import { PATHS } from "./paths";

export const PAGE_TITLES = {
  [PATHS.protected.root]: "Secteur",
  [PATHS.protected.admin.team]: "Equipe",
  [PATHS.protected.admin.permissions]: "Permissions",
} as const;
