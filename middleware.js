const calculateTotal = (req, res, next) => {
  const { basket } = req.body

  let total = 0
  for (let item of basket) {
    total += item.price * 1.13
  }

  req.total = Math.round(total * 100)

  next()
}

module.exports = { calculateTotal }
