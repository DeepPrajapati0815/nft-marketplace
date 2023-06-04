import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const collectionSchema = new mongoose.Schema({
  collectionName: {
    type: "String",
    required: [true, "must provide collection name"],
  },
  collectionDescription: {
    type: String,
    trim: true,
    required: [true, "must provide nft description"],
  },
  category: {
    type: String,
    required: [true, "must provide a category"],
  },
  image: {
    type: String,
    required: [true, "must provide collection Image"],
  },
  banner: {
    type: String,
    required: [true, "must provide a banner Image"],
  },
  creator: {
    type: String,
    required: [true, "must provide nft creator address"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  slug: String,
});

collectionSchema.pre("save", function (next) {
  this.slug = slugify(this.collectionName, { lower: true });
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
