export const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "..."
  }
  return description
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
