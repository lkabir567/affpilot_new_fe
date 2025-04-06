// Password strength indicator
export const getPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, label: "" };

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-primary",
  ];

  return {
    strength,
    label: labels[strength - 1] || "",
    color: colors[strength - 1] || "",
  };
};
