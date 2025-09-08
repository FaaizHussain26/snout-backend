import { FilterQuery, UpdateQuery } from "mongoose";
import { ILead, Lead } from "../database/models/lead.model";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class LeadService {
  async create(payload: Partial<ILead>) {
    const lead = await Lead.create(payload as any);
    return lead.toObject();
  }

  async findAll(filter: FilterQuery<ILead> = {}) {
    return Lead.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findWithPagination(
    filter: FilterQuery<ILead> = {},
    options: PaginationOptions
  ): Promise<PaginatedResult<ILead>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const totalItems = await Lead.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
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
