export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function profileToAuthUser(
  user: { id: string; email: string },
  profile: {
    full_name: string | null;
    organization: string | null;
    phone: string | null;
  },
): {
  id: string;
  email: string;
  name: string;
  organization: string;
  phone: string;
  initials: string;
} {
  const name = profile.full_name?.trim() || user.email;
  return {
    id: user.id,
    email: user.email,
    name,
    organization: profile.organization ?? "",
    phone: profile.phone ?? "",
    initials: getInitials(name),
  };
}
