import type React from "react"
import { Row, Col } from "antd"
import Select from "react-select"

interface InputSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}

const InputSelector: React.FC<InputSelectorProps> = ({
  label,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <Row>
      <Col span={4} className="vogue-subheading flex items-center">
        {label}
      </Col>
      <Col span={20}>
        <Select
          value={options.find(option => option.value === value)}
          onChange={option => onChange(option?.value || "")}
          options={options}
          className="vogue-select"
          placeholder={placeholder}
        />
      </Col>
    </Row>
  )
}

export default InputSelector
