import * as React from "react"

import { cn } from "@/lib/utils"

const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>
const ToastViewport = () => <div />
const Toast = () => <div />
const ToastTitle = () => <div />
const ToastDescription = () => <div />
const ToastClose = () => <button />
const ToastAction = () => <button />

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

export function Toaster() {
  return null;
}
