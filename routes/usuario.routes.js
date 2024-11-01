import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  updateUsuario,
} from "../controllers/usuario.controllers.js";

const router = Router();

router.get("/usuario/", getUsuario);

router.post("/usuario", createUsuario);

router.put("/usuario/", updateUsuario);

router.delete("/usuario/", deleteUsuario);
export default router;
