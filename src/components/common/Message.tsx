import type React from "react"
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

type MessageVariant = "success" | "error" | "info"

interface MessageProps {
  variant: MessageVariant
  title?: string
  message: string
  onClose?: () => void
  showIcon?: boolean
  className?: string
}

const variantStyles = {
  success: {
    container: "bg-green-50 border-green-500",
    icon: "text-green-500",
    title: "text-green-800",
    message: "text-green-700",
  },
  error: {
    container: "bg-red-50 border-red-500",
    icon: "text-red-500",
    title: "text-red-800",
    message: "text-red-700",
  },
  info: {
    container: "bg-blue-50 border-blue-500",
    icon: "text-blue-500",
    title: "text-blue-800",
    message: "text-blue-700",
  },
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
}

export const Message: React.FC<MessageProps> = ({
  variant,
  title,
  message,
  onClose,
  showIcon = true,
  className = "",
}) => {
  const styles = variantStyles[variant]
  const Icon = icons[variant]

  return (
    <div
      className={`rounded-md border-l-4 p-4 ${styles.container} ${className}`}
      role={variant === "error" ? "alert" : "status"}
    >
      <div className="flex items-start space-x-3">
        {showIcon && (
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          )}
          <div className={`text-sm ${styles.message}`}>{message}</div>
        </div>
        {onClose && (
          <div className="flex-shrink-0">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.icon} hover:bg-opacity-10 hover:bg-current`}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Toast variant for floating notifications
export const Toast: React.FC<MessageProps> = props => {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full shadow-lg">
      <Message {...props} />
    </div>
  )
}

// Banner variant for full-width messages
export const Banner: React.FC<MessageProps> = props => {
  return (
    <div className="w-full border-b">
      <Message {...props} className="rounded-none" />
    </div>
  )
}

/* Usage Examples
import React, { useState } from "react"
import { Message, Toast, Banner } from "./Message"

const MessageExamples: React.FC = () => {
  const [showToast, setShowToast] = useState(false)

  return (
    <div className="space-y-4 p-4">
      // Regular inline message 
      <Message
        variant="success"
        title="Successfully saved"
        message="Your changes have been saved successfully."
        onClose={() => console.log("closed")}
      />

      <Message
        variant="error"
        title="Error occurred"
        message="There was a problem processing your request."
      />

      <Message
        variant="info"
        message="Your trial will end in 3 days. Upgrade now to continue using all features."
      />

      //Banner style message
      <Banner
        variant="info"
        title="New features available"
        message="Check out our latest updates and improvements."
        onClose={() => console.log("closed banner")}
      />

      //Toast notification
      <button
        onClick={() => setShowToast(true)}
        className="vogue-button"
      >
        Show Toast
      </button>
      
      {showToast && (
        <Toast
          variant="success"
          title="Success"
          message="Operation completed successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

export default MessageExamples
*/
