export type AkylRole = "admin" | "journalist" | "user";

/**
 * Mock auth — change role here to test UI.
 * Set isAuthenticated to false to simulate guest (navbar shows «Войти»).
 */
export const mockAuth = {
  role: "admin" as AkylRole,
  isAuthenticated: true,
  user: {
    id: "usr_001",
    name: "Асылбек Нурланов",
    email: "admin@akyl.kz",
    organization: "AKYL Competence Center",
    initials: "АН",
  },
};

export function getRoleDashboardPath(role: AkylRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "journalist":
      return "/studio";
    case "user":
      return "/app";
  }
}
