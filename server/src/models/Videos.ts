import { IVideos } from "interfaces";
import { Model, model, Schema } from "mongoose";
export const VideosSchema: Schema = new Schema(
  {
    _id: { required: true, type: String },
    hit: { required: false, type: String, default: "0" },
    url: { required: true, type: String },
    status: { required: true, type: String, default: "1" },
    tags: { required: true, type: Array, default: [] }
  },
  { timestamps: { createdAt: "created_at" } }
);
export default model<IVideos>("Videos", VideosSchema) as Model<IVideos>;
