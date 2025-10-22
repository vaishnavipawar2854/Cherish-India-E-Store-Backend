const Order = require('../models/orderModel')
const Product = require('../models/productModel')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body

  if (!orderItems || orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  if (!shippingAddress) {
    res.status(400)
    throw new Error('Shipping address is required')
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
}

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
}

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
    .populate('processedBy', 'name email')
    .sort({ createdAt: -1 })
  res.json(orders)
}

// @desc    Update order status (approve/reject) (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body // expected 'approved' or 'rejected'

  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  if (!['approved', 'rejected'].includes(status)) {
    res.status(400)
    throw new Error('Invalid status')
  }

  // If already processed, prevent double processing
  if (order.status === status) {
    return res.json(order)
  }

  // If approving, reduce stock for each product
  if (status === 'approved') {
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product)
      if (!product) continue

      // Ensure sufficient stock
      if (product.countInStock < item.qty) {
        res.status(400)
        throw new Error(`Insufficient stock for product ${product.name}`)
      }

      product.countInStock -= item.qty
      await product.save()
    }
    // Mark order as paid when admin approves
    order.isPaid = true
    order.paidAt = Date.now()
  }

  order.status = status
  order.processedBy = req.user._id
  order.processedAt = Date.now()

  await order.save()
  const updatedOrder = await Order.findById(order._id).populate('user', 'name email').populate('processedBy', 'name email')
  res.json(updatedOrder)
}

module.exports = { addOrder, getMyOrders, getOrders, updateOrderStatus }
