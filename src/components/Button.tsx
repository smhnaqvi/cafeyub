import { MouseEventHandler } from "react";

interface IButtonProps {
  className?: string;
  children?: any;
  variant?: "primary" | "secondary" | "danger" | "default";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = ({ children, className, variant, onClick }: IButtonProps) => {
  let style = "my-4 font-semibold py-2 px-4 border rounded shadow ";
  switch (variant) {
    case "primary":
      style += "border-blue-900 bg-blue-500 hover:bg-blue-700 text-white";
      break;
    case "secondary":
      style += "border-green-900 bg-green-500 hover:bg-green-700 text-white";
      break;
    case "danger":
      style += "border-red-900 bg-red-500 hover:bg-red-700 text-white";
      break;
  }

  return (
    <button onClick={onClick} className={`${className} ${style}`}>
      {children}
    </button>
  );
};

export default Button;
