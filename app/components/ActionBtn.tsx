import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

import React from "react";

export const ActionBtn = ({
  icon: Icon,
  onClick,
  disabled,
}: ActionBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disabled && "opacity-50 cursor-not-allowed"}`}
      disabled={disabled}
    >
      <Icon size={15} />
    </button>
  );
};
