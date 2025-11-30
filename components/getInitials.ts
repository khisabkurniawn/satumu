export function getInitials(fullName: string | null) {
  if (!fullName) return "Satu Mu";

  const parts = fullName.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[1].charAt(0).toUpperCase()
  );
}
