import { Application } from "express";
import videosRoute from "./videos/videos.route";

export class Routes {
  public routes(app: Application): void {
    app.use("/", videosRoute);
  }
}
