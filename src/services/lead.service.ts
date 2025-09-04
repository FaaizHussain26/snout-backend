import { FilterQuery, UpdateQuery } from "mongoose";
import { ILead, Lead } from "../database/models/lead.model";

export class LeadService {
  async create(payload: Partial<ILead>) {
    const lead = await Lead.create(payload as any);
    return lead.toObject();
  }

  async findAll(filter: FilterQuery<ILead> = {}) {
    return Lead.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findById(id: string) {
    return Lead.findById(id).lean();
  }

  async updateById(id: string, update: UpdateQuery<ILead>) {
    return Lead.findByIdAndUpdate(id, update, { new: true }).lean();
  }

  async deleteById(id: string) {
    return Lead.findByIdAndDelete(id).lean();
  }
}

export const leadService = new LeadService();
