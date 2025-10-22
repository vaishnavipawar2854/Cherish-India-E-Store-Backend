const express = require('express')
const { addOrder, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, addOrder)
router.get('/myorders', protect, getMyOrders)

// Admin routes
router.get('/', protect, admin, getOrders)
router.put('/:id/status', protect, admin, updateOrderStatus)

module.exports = router
