const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/productModel')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const products = [
  {
    name: 'Bamboo Toothbrush Set',
    description: 'Eco-friendly bamboo toothbrushes with biodegradable bristles. Perfect for sustainable oral care.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400',
    category: 'Personal Care',
    countInStock: 50,
    ecoFriendly: true,
  },
  {
    name: 'Reusable Shopping Bags',
    description: 'Durable cotton canvas shopping bags. Reduce plastic waste with these stylish and practical bags.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'Lifestyle',
    countInStock: 100,
    ecoFriendly: true,
  },
  {
    name: 'Solar Power Bank',
    description: 'Portable solar charger for your devices. Charge your phone anywhere with renewable energy.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1609592806580-6a8c9d4e6e6c?w=400',
    category: 'Electronics',
    countInStock: 25,
    ecoFriendly: true,
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable t-shirt made from 100% organic cotton. Soft, breathable, and eco-friendly.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Clothing',
    countInStock: 75,
    ecoFriendly: true,
  },
  {
    name: 'Recycled Paper Notebook',
    description: 'Beautiful notebook made from recycled paper. Perfect for journaling, notes, or creative writing.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400',
    category: 'Stationery',
    countInStock: 200,
    ecoFriendly: true,
  },
  {
    name: 'Bamboo Cutting Board',
    description: 'Durable bamboo cutting board for your kitchen. Naturally antibacterial and sustainable.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    category: 'Kitchen',
    countInStock: 30,
    ecoFriendly: true,
  },
  {
    name: 'LED Desk Lamp',
    description: 'Energy-efficient LED desk lamp with adjustable brightness. Save energy while working or studying.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    category: 'Electronics',
    countInStock: 40,
    ecoFriendly: true,
  },
  {
    name: 'Natural Soap Bars',
    description: 'Handmade soap bars with natural ingredients. Gentle on skin and environmentally friendly.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    category: 'Personal Care',
    countInStock: 60,
    ecoFriendly: true,
  },
]

const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}