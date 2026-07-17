import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

export type UIModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: string | number;
  className?: string;
  disableCloseIcon?: boolean;
  maskClosable?: boolean;
};

const Modal = ({
  open,
  onClose,
  onCancel,
  title,
  description,
  children,
  width,
  className,
  disableCloseIcon = true,
  maskClosable = true,
}: UIModalProps) => {
  const id = React.useId();
  return (
    <Dialog
      open={open}
      onOpenChange={maskClosable ? (onClose ?? onCancel) : undefined}
    >
      <DialogContent
        className={cn(
          "gap-0 overflow-hidden rounded-[24px] border-none bg-white shadow-xs max-sm:px-4",
          className,
          disableCloseIcon && "[&>button]:hidden",
        )}
        style={!!width ? { width, maxWidth: width } : undefined}
      >
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle className="hidden">{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle className="hidden">{id}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

// Example
{
  /* <Modal
      open={open}
      onClose={onClose}
      width={width}
      disableCloseIcon={true}
      title="ModalSubject"
      className="p-0 max-sm:!w-[calc(100%-32px)] max-sm:!max-w-[calc(100%-32px)] max-sm:px-0"
    >
        Container
    </Modal> */
}
