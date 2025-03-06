"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this utility exists

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

// ✅ Fixed Dialog Size & Centering
export const DialogContent = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    <div className="fixed inset-0 flex items-center justify-center">
      <DialogPrimitive.Content
        {...props}
        className={cn(
          "w-full max-w-md bg-white p-6 rounded-lg shadow-lg",
          className
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3">
          <X className="h-5 w-5 cursor-pointer" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </div>
  </DialogPrimitive.Portal>
);

// 🆕 Add Missing Dialog Header & Title
export const DialogHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("mb-4", className)}>{children}</div>;

export const DialogTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h2 className={cn("text-lg font-bold text-gray-800", className)}>
    {children}
  </h2>
);
