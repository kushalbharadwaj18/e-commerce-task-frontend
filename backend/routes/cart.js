const express = require("express")

const router = express.Router()

// Cart is handled on frontend with localStorage
// This is a placeholder for future backend cart management

router.get("/", (req, res) => {
  res.json({ message: "Cart endpoint" })
})

module.exports = router
