const formatDate = (dateString) => {
  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)
  const hour = dateString.substring(8, 10)

  return new Date(Date.UTC(year, month - 1, day, hour))
}

export default formatDate
