import { Router } from "express";
import { leadController } from "../controllers/lead.controller";

const router = Router();

router.post("/", leadController.create.bind(leadController));
router.get("/", leadController.list.bind(leadController));
router.get("/:id", leadController.getById.bind(leadController));
router.patch("/:id", leadController.update.bind(leadController));
router.delete("/:id", leadController.remove.bind(leadController));

export default router;
