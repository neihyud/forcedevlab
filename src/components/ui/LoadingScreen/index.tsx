import { cn } from "@/lib/utils";

type Props = {
  isLoading: boolean;
  text?: string;
};
export const LoadingScreen = ({ isLoading, text }: Props) => {
  return (
    <div>
      <div
        className={cn(
          `fixed inset-0 z-[1000] h-full w-full bg-[rgba(255,255,255,0.8)]`,
          `${
            isLoading ? "flex flex-col items-center justify-center" : "hidden"
          }`,
        )}
      >
        <div className="border-t-main mb-3 h-[50px] w-[50px] animate-spin rounded-full border-8 border-t-8 border-solid border-[#f3f3f3]"></div>
        <p>{text}</p>
      </div>
    </div>
  );
};
