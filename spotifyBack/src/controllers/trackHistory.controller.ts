import { RequestHandler } from 'express';
import { TrackHistoryService } from '@/services/trackHistory.service';


export class TrackController {
  private service: TrackHistoryService;

  constructor() {
    this.service = new TrackHistoryService();
  }

  getHistory: RequestHandler = async (req, res) => {
    const history = await this.service.getHistory(req)
    res.send(history)
  }

  createHistory: RequestHandler = async (req, res): Promise<void> => {
    try {
      const history = await this.service.createHistory(req)
      res.send(history)
    } catch (e) {
      res.status(401).send({"error": (e as Error).message})
    }
  };
}
