import type React from "react"

interface DetailedHeaderProps {
  title: string
}

const DetailedHeader: React.FC<DetailedHeaderProps> = ({ title }) => {
  return <h3 className="text-xl font-serif mb-4 text-accent-gold">{title}</h3>
}

export default DetailedHeader
