"use client";

import { ImageProps, getImageProps } from "next/image";
import * as React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import defaultAvatar from "@/lib/assets/images/portfolio_avt.webp";
import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "ring-main/10 relative flex size-8 shrink-0 overflow-hidden rounded-full ring-1",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

type Props = Omit<ImageProps, "fill"> & React.PropsWithChildren;

function NextAvatar({ children, className, src, ...props }: Props) {
  const safeSrc =
    typeof src === "string"
      ? /^(http|data:|blob:)/.test(src)
        ? src
        : defaultAvatar
      : src || defaultAvatar;

  const imageProps = getImageProps({
    width: 40,
    height: 40,
    src: safeSrc,
    ...props,
  }).props;

  return (
    <Avatar className={className}>
      <AvatarImage {...imageProps} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarFallback, AvatarImage, NextAvatar };
