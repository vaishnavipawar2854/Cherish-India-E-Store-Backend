const express = require('express')
const { 
  registerUser, 
  authUser, 
  getUserProfile, 
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

// Address routes
router.post('/addresses', protect, addAddress)
router.route('/addresses/:addressId')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress)
router.put('/addresses/:addressId/default', protect, setDefaultAddress)

module.exports = router