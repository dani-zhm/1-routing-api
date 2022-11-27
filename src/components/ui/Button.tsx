import { ComponentPropsWithoutRef, FC } from "react";

interface IButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button: FC<IButtonProps> = (props) => {
  return (
    <button
    {...props}
    className={`bg-slate-500 text-white px-3 py-2 rounded border-4 border-transparent ${props.className}`}
    >
      {props.children}
    </button>
  );
};
export default Button;
