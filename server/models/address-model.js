const {Schema , model  , default:mongoose } = require("mongoose");

const addressSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addresses: [
    {
      fullName: String,
      colony: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String,
    },
  ],
});

module.exports = new model("Address", addressSchema);
