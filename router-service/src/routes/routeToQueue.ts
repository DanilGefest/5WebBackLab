import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "../services/sendMessage";
import { setStatus } from "../services/setStatus";

export default function routeToQueue(route: string, serviceQueue: string) {
  const router = express.Router();

  router.all(`/${route}*`, async (req: Request, res: Response) => {
    const requestId = uuidv4();
    const path = req.originalUrl.replace(`/api/${route}`, "");
    const method = req.method.toLowerCase();

    try {
      if (
        !(await setStatus(
          requestId,
          "В ожидании",
          "Запрос находится в очереди"
        ))
      ) {
        res
          .status(500)
          .json({ error: "Не удалось поставить запрос в очередь" });
        return;
      }

      const message = {
        requestId: requestId,
        path: path,
        method: method,
        body: req.body,
        query: req.query,
        headers: {
          authToken: req.header("authToken"),
          "content-type": req.headers["content-type"],
        },
      };

      await sendMessage(serviceQueue, message);

      res.status(200).json({
        message: "Запрос принят.",
        requestId,
      });
    } catch (error) {
      console.error(`Ошибка маршрутизации для ${route}:`, error);
      res.status(500).json({ error: "Ошибка на сервере" });
    }
  });

  return router;
}

