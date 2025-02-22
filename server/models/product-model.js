const {Schema , model  }= require("mongoose")

const productSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    sizes: [
      {
        type: Number,
        enum: {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          message: 'Size must be an integer between 1 and 10',
        },
      }
    ],
    images: [
      {
        type: String,
        trim: true,
      }
    ],
    category: {
      type: String,
      default: 'Shoe',
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female'],
        message: 'Gender must be either "male" or "female"',
      },
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Product = new model("Product" , productSchema)

module.exports = Product