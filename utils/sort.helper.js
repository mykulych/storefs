module.exports = arr => {
  return arr.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    return 1
  })
}
