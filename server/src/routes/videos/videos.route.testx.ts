process.env.NODE_ENV = "test";
import * as mongoose from "mongoose";
import * as request from "supertest";
import server from "../../app";
import config from "../../config";

describe("Videos Route", () => {
  beforeAll(done => {
    mongoose.connect(
      config.connectionStr.test,
      { useNewUrlParser: true },
      done
    );
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);
  });
  describe("/GET trends", () => {
    it("it should get a trends response get by rank", async () => {
      const res = await request(server).get(`/trends`);
      expect(res.status).toBe(200);
    });
  });
  describe("/POST video", () => {
    it("it should be create a new video", async () => {
      const res = await request(server)
        .post(`/video`)
        .send({ url: "https", tags: ["mert", "eban"] });
      expect(res.status).toBe(201);
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
