import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  secondaryFill?: string;
  strokePercent?: boolean;
  strokeWidthCircle?: number;
  className?: string;
  children?: React.ReactNode;
  format?: (value: number) => React.ReactNode;
  isHiddenValue?: boolean;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  secondaryFill,
  strokeWidthCircle = 10,
  strokePercent = true,
  className,
  format,
  isHiddenValue,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100) || 0;

  return (
    <div
      className={cn(
        "relative size-[70px] min-h-[70px] min-w-[70px] text-2xl font-semibold md:size-[90px] md:min-h-[90px] md:min-w-[90px]",
        className,
      )}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
          borderRadius: "100%",
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="size-full"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth={strokeWidthCircle}
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            fill={secondaryFill}
            style={
              {
                stroke: gaugeSecondaryColor,
                "--stroke-percent": strokePercent ? 90 - currentPercent : "",
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                transition: "all var(--transition-length) ease var(--delay)",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth={strokeWidthCircle}
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100"
          style={
            {
              stroke: gaugePrimaryColor,
              "--stroke-percent": currentPercent,
              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
              transitionProperty: "stroke-dasharray,transform",
              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
            } as React.CSSProperties
          }
        />
      </svg>
      {!isHiddenValue && (
        <span
          data-current-value={currentPercent}
          className="animate-in fade-in absolute inset-0 m-auto flex size-fit items-center justify-center delay-[var(--delay)] duration-[var(--transition-length)] ease-linear"
        >
          {format ? format(currentPercent) : currentPercent}
        </span>
      )}
    </div>
  );
}
