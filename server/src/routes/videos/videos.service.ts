import * as crypto from "crypto";
import { IVideos } from "interfaces";
import { Videos } from "../../models";

const createVideo = async (req: IVideos): Promise<any> => {
  const Video = new Videos({
    _id: crypto
      .createHash("md5")
      .update(`${req.url}`)
      .digest("hex"),
    url: req.url,
    hit: req.hit,
    tags: req.tags,
    status: req.status
  });
  try {
    const newVideo = await Video.save();
    return { status: true, data: { ...newVideo["_doc"] } };
  } catch (error) {
    return { status: false, message: error };
  }
};
const getTrends = async (): Promise<any> => {
  try {
    const trend = await Videos.find({ status: "1" })
      .sort({ hit: -1 })
      .limit(5);
    return { status: true, data: trend };
  } catch (error) {
    return { status: false, message: error };
  }
};
const searchVideo = async (req: IVideos): Promise<any> => {
  try {
    const search = await Videos.find({ tags: { $regex: req.tags } });
    console.log(search);
  } catch (error) {}
};
export default { createVideo, getTrends, searchVideo };
