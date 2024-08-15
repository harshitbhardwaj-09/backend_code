import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const discussSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 1000, 
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      index: true, 
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true, 
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Discuss", 
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "deleted", "flagged"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

discussSchema.plugin(mongooseAggregatePaginate);
discussSchema.index({ content: "text" }); 

export const Discuss = mongoose.model("Discuss", discussSchema);
