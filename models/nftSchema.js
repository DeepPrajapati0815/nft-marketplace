import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide a name"],
    },
    tokenId: {
      type: Number,
      required: [true, "must provide a token Id"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "must provide nft description"],
    },
    creator: {
      type: String,
      trim: true,
      required: [true, "must provide nft creator"],
    },

    royaltyRecipient: {
      type: String,
      trim: true,
    },
    royalty: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: String,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    media: {
      type: String,
      required: [true, "must provide a media"],
    },
    fileType: {
      type: String,
      required: [true, "must provide filetype"],
    },
    price: {
      type: Number,
      required: [true, "must provide a price"],
    },
    wishlist: {
      type: [String],
    },
    owner: {
      type: String,
      required: [true, "must provide a owner address"],
    },
    seller: {
      type: String,
      required: [true, "must provide a seller address"],
    },
    tokenURI: {
      type: String,
      required: [true, "must provide a token URI"],
    },
    sold: {
      type: Boolean,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: [true, "must provide NFT is published or not"],
    },
    slug: String,

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

nftSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;
