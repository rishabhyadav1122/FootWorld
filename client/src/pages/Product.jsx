import React, { useState, useContext , useEffect } from "react";
import { useAuth } from "../store/auth";// Import useAuth context
import { Link } from "react-router-dom";

export const Product = () => {
  const { products } = useAuth(); // Get products from context
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filters, setFilters] = useState({ gender: "", brand: "", size: "" });
  const [sortOrder, setSortOrder] = useState(""); // Sorting state
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };



    useEffect(() => {
        if (products.length > 0) {
        setFilteredProducts(products);
        setLoading(false);
    }}, [products]);

  // Handle filters
  const applyFilters = () => {
    let filtered = products;

    if (filters.gender) {
      filtered = filtered.filter((product) => product.gender === filters.gender);
    }
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }
    if (filters.size) {
      filtered = filtered.filter((product) => product.sizes.includes(parseInt(filters.size)));
    }

    // Apply sorting after filtering
    if (sortOrder === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  return (

    <div className="p-6">
<h2>
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
      <h2 className="text-2xl font-bold mb-4">Shop Our Collection</h2>

      {/* Search Bar and Filter Button */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          Search
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded">
          Sort & Filter
        </button>
      </div>

      {/* Filter & Sort Options */}
      {showFilters && (
  <div className="bg-white p-4 rounded shadow mb-4 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
    {/* Gender Filter */}
    <div className="flex flex-col">
      <label className="font-semibold">Gender</label>
      <select
        className="border cursor-pointer p-2 rounded"
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    {/* Brand Filter */}
    <div className="flex flex-col">
      <label className="font-semibold">Brand</label>
      <select
        className="border cursor-pointer p-2 rounded"
        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
      >
        <option value="">All</option>
        <option value="Nike">Nike</option>
        <option value="Adidas">Adidas</option>
        <option value="Bata">Bata</option>
        <option value="Sparx">Sparx</option>
        <option value="Reebok">Reebok</option>
        <option value="Fila">Fila</option>
      </select>
    </div>

    {/* Size Filter */}
    <div className="flex flex-col">
      <label className="font-semibold">Size</label>
      <select
        className="border cursor-pointer p-2 rounded"
        onChange={(e) => setFilters({ ...filters, size: e.target.value })}
      >
        <option value="">All</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    {/* Sorting Options */}
    <div className="flex flex-col">
      <label className="font-semibold">Sort By Price</label>
      <select
        className="border cursor-pointer p-2 rounded"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">None</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
    </div>

    {/* Apply Filters Button */}
    <div className="col-span-2  md:col-span-4 flex justify-center">
      <button onClick={applyFilters} className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded">
        Apply Filters
      </button>
    </div>
  </div>
)}


      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {loading ? (
    <p className="text-gray-500">Loading products...</p>
  ) : filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <Link key={product._id} to={`/product/${product._id}`}>
      <div  key={product._id} className="border p-4 cursor-pointer rounded shadow">
        <img src={product.images} alt={product.name} className="w-full h-48 object-cover" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">{product.brand}</p>
        <p className="text-gray-900 font-bold">₹{product.price}</p>
      </div>
      </Link>
    ))
  ) : (
    <p className="text-gray-500">No products found.</p>
  )}
</div>

    </div>
  );
};


