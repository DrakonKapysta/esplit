import { cn } from "@/lib/utils";
import { OptionType, Priority } from "@/types/taskType";
import React, { FC } from "react";
import { createPortal } from "react-dom";

interface CustomSelectProps extends React.ComponentPropsWithoutRef<"div"> {
  defaultValue: string;
  optionStyles?: string;
  icon?: React.ReactElement;
  className?: string | undefined;
  options?: OptionType[];
  onChange: (value: unknown) => void;
}

const optionDotVariant = {
  [Priority.Low]: "bg-green-500",
  [Priority.Medium]: "bg-yellow-500",
  [Priority.High]: "bg-red-500",
};

export const CustomSelect: FC<CustomSelectProps> = ({
  defaultValue,
  options,
  onChange,
  optionStyles,
  icon,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });
  React.useEffect(() => {
    if (!ref || typeof ref === "function") return;

    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !ref?.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  React.useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
      {...props}
      className={cn(
        "p-2 rounded border border-slate-800 flex justify-between relative select-none",
        className
      )}
    >
      {defaultValue}
      <div
        className={cn(
          "transition-transform duration-300",
          isOpen ? "-rotate-180" : "rotate-0"
        )}
      >
        {icon}
      </div>
      {createPortal(
        <ul
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute flex flex-col gap-1 left-0 top-[110%] w-full select-none z-50 transition-all duration-300 ",
            optionStyles,
            isOpen ? "visible" : "invisible "
          )}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
        >
          {options?.map((option, index) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "p-2 border border-slate-800 rounded bg-white hover:shadow-md transition-all duration-300 hover:transition-none flex justify-between items-center",
                isOpen
                  ? `translate-y-0 opacity-100 `
                  : `-translate-y-2 opacity-0 `
              )}
              style={{
                transitionDelay: `${index * 50}ms `,
              }}
            >
              <span>{option.label}</span>
              <div
                className={cn(
                  "w-3 h-3 rounded-full bg-slate-800 shadow-md",
                  optionDotVariant[option.value]
                )}
              ></div>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};
