"use client";

import { useTransition } from "react";
import Lottie from "lottie-react";
import animationData from "@/lib/assets/lotties/error.json";
import { Button } from "@/components/ui";

// Error boundaries must be Client Components
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ height: 400 }}
      />

      <h2>Có lỗi xảy ra vui lòng thử lại!</h2>
      <Button
        variant={"text"}
        color="primary"
        onClick={() => {
          startTransition(() => {
            reset();
          });
        }}
      >
        Try again
      </Button>
    </div>
  );
}
