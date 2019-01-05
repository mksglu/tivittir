import { Document } from "mongoose";

export default interface IVideos extends Document {
  _id: string;
  hit: string;
  url: string;
  status: string;
  tags: string[];
}
