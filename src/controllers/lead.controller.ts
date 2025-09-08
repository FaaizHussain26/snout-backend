import { Request, Response } from "express";
import { leadService } from "../services/lead.service";

export class LeadController {
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const lead = await leadService.create(payload);
      return res.status(201).json({ success: true, data: lead });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message || "Failed to create lead",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (page < 1) {
        return res
          .status(400)
          .json({ success: false, message: "Page must be greater than 0" });
      }
      if (limit < 1 || limit > 100) {
        return res
          .status(400)
          .json({ success: false, message: "Limit must be between 1 and 100" });
      }

      const result = await leadService.findWithPagination({}, { page, limit });
      return res.json({ success: true, ...result });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message || "Failed to fetch leads",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const lead = await leadService.findById(req.params.id);
      if (!lead)
        return res
          .status(404)
          .json({ success: false, message: "Lead not found" });
      return res.json({ success: true, data: lead });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message || "Failed to fetch lead",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const lead = await leadService.updateById(req.params.id, req.body);
      if (!lead)
        return res
          .status(404)
          .json({ success: false, message: "Lead not found" });
      return res.json({ success: true, data: lead });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message || "Failed to update lead",
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const lead = await leadService.deleteById(req.params.id);
      if (!lead)
        return res
          .status(404)
          .json({ success: false, message: "Lead not found" });
      return res.json({ success: true, data: lead });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message || "Failed to delete lead",
      });
    }
  }
}

export const leadController = new LeadController();
