process.env.NODE_ENV = "test";
import { IVideos } from "interfaces";
import * as mongoose from "mongoose";
import config from "../../config";
import videosService from "./videos.service";

describe("Videos Service", () => {
  beforeAll(done => {
    mongoose.connect(
      config.connectionStr.test,
      { useNewUrlParser: true },
      done
    );
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);
  });
  describe("/POST video", () => {
    it("it should create a video as a anonymous", async () => {
      const createVideo = await videosService.createVideo({
        status: "0",
        url: "https://twitter.com/video",
        tags: ["araba", "otomobil"]
      } as IVideos);
      expect(createVideo.status).toBe(true);
      expect(createVideo.data.status).toEqual("0");
      expect(createVideo.data.hit).toEqual("0");
      expect(Array.isArray(["car", "bus"])).toBe(true);
    });
    it("it should create a video as a member", async () => {
      const createVideo = await videosService.createVideo({
        status: "1",
        url: "https://twitter.com/video/id-6",
        tags: ["car", "bus"]
      } as IVideos);
      expect(createVideo.status).toBe(true);
      expect(createVideo.data.status).toEqual("1");
      expect(createVideo.data.hit).toEqual("0");
      expect(Array.isArray(["car", "bus"])).toBe(true);
    });
  });
  describe("/GET trends", () => {
    it("it should return response trends data by rank and status true", async () => {
      for (let index = 0; index < 5; index++) {
        await videosService.createVideo({
          status: "1",
          hit: `${index}`,
          url: `https://twitter.com/video/id-${index}`,
          tags: ["car", "bus"]
        } as IVideos);
      }
      const getTrends = await videosService.getTrends();
      const getIndex = getTrends.data.findIndex(video => video.hit === "4");
      expect(getTrends.status).toBe(true);
      expect(getIndex).toEqual(0);
    });
  });
  afterAll(done => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => {
        done();
      });
    });
  });
});
