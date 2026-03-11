import { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  className?: string;
}

export function ActionButton({
  onClick,
  icon,
  label,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}