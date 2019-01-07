import { Request, Response, Router } from "express";
import videosService from "./videos.service";

const router = Router();
router.post("/video", async (req: Request, res: Response) => {
  const createVideo = await videosService.createVideo(req.body);
  if (!createVideo.status) return res.status(400).send(createVideo);
  return res.status(201).send(createVideo);
});
router.get("/trends", async (req: Request, res: Response) => {
  const getTrends = await videosService.getTrends();
  if (!getTrends.status) return res.status(400).send(getTrends);
  return res.status(200).send(getTrends);
});
router.get("/search", async (req: Request, res: Response) => {
  const searcVideo = await videosService.searchVideo(req.body);
  // if (!searcVideo.status) return res.status(400).send(searcVideo);
  // return res.status(200).send(searcVideo);
});
export default router;
