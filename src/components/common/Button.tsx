import type React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  loading?: boolean
  fullWidth?: boolean
  variant?: "primary" | "active"
  size?: "default" | "sm" | "lg"
}

const StyledButton = ({
  label,
  loading = false,
  fullWidth = false,
  variant = "primary",
  size = "default",
  className = "",
  disabled,
  type = "button",
  ...props
}: StyledButtonProps) => {
  const baseStyles =
    "bg-primary text-secondary px-6 uppercase tracking-wider hover:bg-accent transition-all duration-300"

  const sizeStyles = {
    sm: "py-2 text-xs",
    default: "py-3 text-sm",
    lg: "py-4 text-base",
  }

  const variantStyles = {
    primary: baseStyles,
    active: `${baseStyles} border-b-2 border-accent`,
  }

  const widthStyle = fullWidth ? "w-full" : "w-auto"

  const buttonStyles = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyle}
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `

  const antIcon = <LoadingOutlined className="text-secondary" spin />

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && <Spin indicator={antIcon} className="mr-2" />}
        <span>{label}</span>
      </div>
    </button>
  )
}

export default StyledButton
