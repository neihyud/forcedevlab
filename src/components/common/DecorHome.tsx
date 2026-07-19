export const DecorHome = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="1920"
      height="233"
      viewBox="0 0 1920 233"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base white background rect removed to allow underlying content to show through */}
      <g clipPath="url(#clip0_101_18350)">
        <mask
          id="mask0_101_18350"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1920"
          height="233"
        >
          <path d="M0 233H1920V0H0V233Z" fill="white" />
        </mask>
        <g mask="url(#mask0_101_18350)">
          <path d="M1920 122L0 19V0H1920V122Z" fill="#002253" />
          <path
            d="M0 233V25.5L670 61L0 233Z"
            fill="url(#paint0_linear_101_18350)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_101_18350"
          x1="670"
          y1="129.25"
          x2="0"
          y2="129.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBD00" />
          <stop offset="1" stopColor="#FF9C00" />
        </linearGradient>
        <clipPath id="clip0_101_18350">
          <rect
            width="1920"
            height="233"
            fill="white"
            transform="matrix(-1 0 0 -1 1920 233)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
