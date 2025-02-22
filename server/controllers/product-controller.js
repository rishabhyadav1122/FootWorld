const Product = require("../models/product-model")

const products = async (req, res) => {
    try {
      // Extract query parameters for filtering and sorting
      const { brand, gender, size, search } = req.query;
  
      // Build query conditions dynamically
      let query = {};
  
      if (brand) query.brand = { $regex: brand, $options: "i" }; // Case-insensitive brand search
      if (gender) query.gender = gender.toLowerCase(); // Exact match for gender
      if (search) query.name = { $regex: `^${search}`, $options: "i" }; // Search suggestions
  
      // Fetch products based on query
      let products = await Product.find(query);
  
      // Filter by size if specified
      if (size) {
        products = products.filter(product => product.sizes.includes(parseInt(size)));
      }
  
      if (!products.length) {
        return res.status(404).json({ msg: "No products found" });
      }
  
      res.status(200).json({ msg: products });
    } catch (error) {
      console.log(`products: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  };



const getProductDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      console.log(`getProductDetails: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  


module.exports = {products , getProductDetails}