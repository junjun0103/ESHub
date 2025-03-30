import type React from "react"
import { useState } from "react"
import { Row, Col } from "antd"

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  maxLength: number
}

const TextInput: React.FC<TextInputProps> = ({
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
          type="number" // Change type to "number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="vogue-input w-full"
          placeholder={placeholder}
          maxLength={maxLength}
          min={0}
        />
      </Col>
    </Row>
  )
}

export default TextInput
