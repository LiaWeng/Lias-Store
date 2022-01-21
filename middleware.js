const calculateTotal = (req, res, next) => {
  const { basket } = req.body

  let total = 0
  for (let item of basket) {
    total += item.price * 1.13
  }

  req.total = total.toFixed(2) * 100

  next()
}

module.exports = { calculateTotal }
