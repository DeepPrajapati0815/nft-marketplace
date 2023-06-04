import mongoose, { Schema } from "mongoose";

const nftSchema = new mongoose.Schema({
  seller: {
    type: String,
    required: [true, "must provide a seller address"],
  },
  owner: {
    type: String,
    required: [true, "must provide a Owner address"],
  },
  nftId: {
    type: String,
    required: [true, "must provide a nftId"],
  },
  price: {
    type: Number,
    required: [true, "must provide a price"],
  },
  status: {
    type: String,
    required: [true, "must provide a status"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const NFTLOGS = mongoose.model("NFTLOGS", nftSchema);

export default NFTLOGS;
