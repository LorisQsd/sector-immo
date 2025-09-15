import { paths } from "./paths";

export const PAGE_TITLES = {
  [paths.protected.root]: "Secteur",
  [paths.protected.admin.team]: "Equipe",
  [paths.protected.admin.permissions]: "Permissions",
} as const;
