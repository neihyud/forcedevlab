import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Command as CommandPrimitive } from "cmdk";

import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export type AutoCompleteOption = Record<"value" | "label", string> &
  Record<string, string>;

type AutoCompleteProps = {
  options: AutoCompleteOption[];
  emptyMessage: string;
  value?: AutoCompleteOption;
  onValueChange?: (value: AutoCompleteOption) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<AutoCompleteOption>(
    value as AutoCompleteOption,
  );
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    const optionToSelect = options.find(
      (option) => option.label === inputRef.current?.value,
    );
    setSelected({
      value: optionToSelect?.value || "",
      label: optionToSelect?.label || "",
    });
    onValueChange?.({
      value: optionToSelect?.value || "",
      label: optionToSelect?.label || "",
    });
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: AutoCompleteOption) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );
  useEffect(() => {
    setInputValue(value?.label || "");
    setSelected(value as AutoCompleteOption);
  }, [value]);

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className="w-[240px] max-w-[240px]">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="text-sm"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList className="rounded-lg shadow-sm">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option, index) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={`${option.value}-${index}`}
                      value={option.label}
                      onMouseDown={(event: any) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        isSelected
                          ? "bg-[#F7F2FF]"
                          : "transition-all duration-200 hover:bg-[#F7F2FF]",
                      )}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="rounded-md px-2 py-3 text-center text-sm select-none">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
