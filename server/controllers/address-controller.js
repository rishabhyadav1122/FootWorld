const Address = require("../models/address-model");

const getAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const userAddresses = await Address.findOne({ userId });
    
        if (!userAddresses) return res.status(200).json({ addresses: [] });
    
        res.status(200).json({ addresses: userAddresses.addresses });
      } catch (error) {
        res.status(500).json({ msg: "Error fetching addresses:", error });
      }
}

const addAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, colony, city, state, postalCode, country, phone } = req.body;
    
    
        const updatedUserAddresses = await Address.findOneAndUpdate(
            { userId },
            { $push: { addresses: { fullName, colony , city, state, postalCode, country, phone } } },
            { new: true, upsert: true } // Returns the updated document and creates it if it doesn't exist
        );
        res.status(201).json({ msg: "Address added successfully",  addresses: updatedUserAddresses.addresses  });
      } catch (error) {
        res.status(500).json({ msg: "Error adding address" });
      }
}

module.exports = { getAddress, addAddress }