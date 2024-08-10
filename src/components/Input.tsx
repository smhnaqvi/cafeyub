import { HTMLInputTypeAttribute, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface RHFInput extends UseFormRegisterReturn {
  type?: HTMLInputTypeAttribute;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, RHFInput>(
  ({ type, label, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            {label}
          </label>
        )}
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          type={type}
          {...rest}
          ref={ref}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
