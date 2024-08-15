export const formatDate = (date?: Date) => {
  if (!date) {
    return ""
  }
  return new Date(date).toLocaleDateString()
}
