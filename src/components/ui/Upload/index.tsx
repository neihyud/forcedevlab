import React, { useCallback, useRef, useState } from "react";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { DeleteIcon, Edit2, Eye, SquarePen, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import Image from "@/components/ui/Image";
import Modal from "@/components/ui/Dialog/Modal";

export type FileWithPreview = File & {
  preview?: string;
  uid: string;
  submissionUrl?: string;
  fileName?: string;
};

type UploadProps = {
  className?: string;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  onChange?: (files: FileWithPreview[]) => void;
  onError?: (error: string) => void;
  children?: React.ReactNode;
  noDrag?: boolean;
  isShowPreview?: boolean;
  disabled?: boolean;
};

const Upload = ({
  className,
  multiple = false,
  accept,
  maxSize,
  onChange,
  onError,
  children,
  isShowPreview = true,
  noDrag = false,
  disabled = false,
}: UploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [disabled],
  );

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      if (disabled) return;

      const validFiles = newFiles.filter((file) => {
        if (maxSize && file.size > maxSize) {
          onError?.(`File ${file.name} không được lớn hơn ${maxSize} bytes`);
          return false;
        }
        if (accept && !file.type.match(accept.replace(/,/g, "|"))) {
          onError?.(`File ${file.name} không được hỗ trợ`);
          return false;
        }
        return true;
      });

      const filesWithPreview = validFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          uid: Date.now().toString(),
          fileName: file.name,
        }),
      );
      if (onChange) {
        onChange(filesWithPreview);
      }

      setFiles((prev) =>
        multiple ? [...prev, ...filesWithPreview] : filesWithPreview,
      );
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [accept, maxSize, multiple, onChange, onError, disabled],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
    },
    [disabled],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.target.files) {
        handleFiles(Array.from(e.target.files));
      }
    },
    [handleFiles, disabled],
  );

  const handleClick = useCallback(() => {
    if (disabled || files.length > 0) return;
    inputRef.current?.click();
  }, [disabled, files]);

  const handleDelete = useCallback(
    (file: FileWithPreview) => {
      setFiles((prev) => prev.filter((f) => f.uid !== file.uid));
      if (onChange) {
        onChange(files.filter((f) => f.uid !== file.uid));
      }
    },
    [setFiles],
  );

  const isShowDescription = files.length > 0 ? !isShowPreview : true;
  return (
    <>
      <div
        className={cn(
          "relative flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors",
          !disabled && "cursor-pointer hover:border-gray-400",
          disabled && "cursor-not-allowed opacity-50",
          !!noDrag &&
            "h-fit min-h-[unset] w-fit border-none p-0 hover:border-none",
          className,
        )}
        {...(!noDrag && {
          onDrop: handleDrop,
          onDragOver: handleDragOver,
        })}
        onClick={handleClick}
      >
        <Input
          ref={inputRef}
          type="file"
          containerClassName="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
        />
        {isShowPreview && files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <div
                key={file.uid}
                className="relative w-full overflow-hidden rounded-lg"
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-full w-full"
                />
                {/* Tạo backdrop hover hiện thị button edit and xóa khi hover */}
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      variant={"text"}
                      className="rounded-4xl p-0  text-white !px-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewFile(file);
                        setIsPreviewOpen(true);
                      }}
                    >
                      <Eye className="!h-5 !w-5" />
                    </Button>
                    <Button
                      variant={"text"}
                      className="rounded-4xl p-0 !px-0 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                      }}
                    >
                      <SquarePen className="!h-5 !w-5" />
                    </Button>
                  </div>

                  <Button
                    variant={"text"}
                    className="absolute top-4 !px-0 right-4 rounded-4xl translate-x-1/2 -translate-y-1/2 p-0  text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file);
                    }}
                  >
                    <X className="!h-5 !w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {isShowDescription &&
          (children ? (
            <div>{children}</div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {noDrag
                  ? "Click to select files"
                  : "Drag and drop files here, or click to select files"}
              </p>
            </div>
          ))}
      </div>
      <Modal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        width={900}
        disableCloseIcon={true}
        className="p-0"
      >
        <img
          src={previewFile?.preview}
          alt={previewFile?.name}
          className="w-full"
        />
      </Modal>
    </>
  );
};

export { Upload };
