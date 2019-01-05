import * as crypto from "crypto";
import { IVideos } from "interfaces";
import { Videos } from "../../models";

const createVideo = async (req: IVideos): Promise<any> => {
  // console.log(req.url);
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
    // console.log(newVideo, "newVideo");
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
export default { createVideo, getTrends };
