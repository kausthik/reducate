import { Types } from "mongoose";

import { Planner } from "@/src/models/planner.model";
import { PlannerRepositoryType } from "@/src/types/planner";

class PlannerRepository {

  // CREATE
  async create(data: PlannerRepositoryType) {
    const planner = await Planner.create(data);
    return planner.toObject();
  }

  // READ
  async findById(id: string) {
    return await Planner.findById(id).lean();
  }

  async findByUser(userId: string) {
    return await Planner.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findByNormalizedTitle(
    userId: string,
    normalizedTitle: string
  ) {
    return await Planner.findOne({
      userId: new Types.ObjectId(userId),
      normalizedTitle,
    }).lean();
  }

  // UPDATE
  async update(
    id: string,
    data: Partial<PlannerRepositoryType>
  ) {
    return await Planner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return await Planner.findByIdAndDelete(id);
  }
}

export default new PlannerRepository();