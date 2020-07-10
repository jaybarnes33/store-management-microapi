const { Schema, model, SchemaTypes } = require("mongoose");

const StoresSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: SchemaTypes.ObjectId,
      ref: "jlsmm_user",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    storeLocation: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    storeTagLine: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model("jlsmm_store", StoresSchema);
