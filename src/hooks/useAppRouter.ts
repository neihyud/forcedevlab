"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import * as NProgress from "nprogress";

type TRouter = {
  push: (href: string, options?: NavigateOptions) => void;
  pushWithoutAnimation: (url: string) => void;
  pushToNewTab: (url: string) => void;
  back: () => void;
  replace: (href: string, options?: NavigateOptions) => void;
};

export const useAppRouter = () => {
  const router = useRouter();
  const otherRouter = {} as TRouter;

  const { push, back, replace } = router;

  otherRouter.push = async (...args) => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 10000);
    return push(...args);
  };

  otherRouter.pushWithoutAnimation = async (...args) => {
    return push(...args);
  };

  otherRouter.pushToNewTab = async (url) => {
    window.open(url, "_blank");
    return;
  };

  otherRouter.back = async () => {
    back();
  };

  otherRouter.replace = async (url: string) => {
    return replace(url);
  };

  return otherRouter;
};
