import { forwardRef } from "react";
import { RHFInput } from "./Input";

const TextArea = forwardRef<HTMLTextAreaElement, RHFInput>(
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
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-32"
          {...rest}
          ref={ref}
        />
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
