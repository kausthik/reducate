import { Types } from "mongoose";

import { PlannerTask } from "@/src/models/plannertask.model";
import { PlannerTaskRepositoryType } from "@/src/types/planner";

class PlannerTaskRepository {

  // CREATE
  async createMany(data: PlannerTaskRepositoryType[]) {
    return await PlannerTask.insertMany(data);
  }

  // READ
  async findById(id: string) {
    return await PlannerTask.findById(id).lean();
  }

  async findByPlannerId(plannerId: string) {
    return await PlannerTask.find({
      plannerId: new Types.ObjectId(plannerId),
    })
      .sort({
        order: 1,
      })
      .lean();
  }

  async findByNormalizedTitle(
    plannerId: string,
    normalizedTitle: string
  ) {
    return await PlannerTask.findOne({
      plannerId: new Types.ObjectId(plannerId),
      normalizedTitle,
    }).lean();
  }

  // UPDATE
  async update(
    id: string,
    data: Partial<PlannerTaskRepositoryType>
  ) {
    return await PlannerTask.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return await PlannerTask.findByIdAndDelete(id);
  }
}

export default new PlannerTaskRepository();