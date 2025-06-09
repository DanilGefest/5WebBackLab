import { Request, Response, NextFunction } from "express";
import axios from "axios";
import config from "../config";

export default function checkRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRequest = await axios.get(
      `${config.userServiceUrl}/${req.body.id}`,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 600;
        },
      }
    );

    if (userRequest.status === 404) {
      res.status(404).json({ message: "Пользователь не найден" });
    }

    if (role == userRequest.data.role) {
      next();
    } else {
      res.status(403).json({ message: "Отказано, несоответствующая роль." });
    }
  };
}
