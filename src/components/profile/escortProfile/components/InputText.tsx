import type React from "react"
import { useState } from "react"
import { Row, Col } from "antd"

interface InputTextProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  maxLength: number
}

const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <Row>
      <Col span={4} className="vogue-subheading flex items-center">
        {label}
      </Col>
      <Col span={20}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="vogue-input w-full"
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </Col>
    </Row>
  )
}

export default InputText
