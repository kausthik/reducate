import { Types } from "mongoose";

import { Revision } from "@/src/models/revision.model";
import { RevisionRepositoryType } from "@/src/types/revision"

class RevisionRepository {

  // CREATE
  async create(data: RevisionRepositoryType) {
    const revision = await Revision.create(data);
    return revision.toObject();
  }

  // READ
  async findById(id: string) {
    return await Revision.findById(id).lean();
  }

  async findToday(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await Revision.find({
      userId: new Types.ObjectId(userId),
      scheduledFor: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).lean();
  }

  async findByStudyId(studyId: string) {
    return await Revision.find({
      studyId: new Types.ObjectId(studyId),
    }).lean();
  }

  // UPDATE
  async update(id: string, data: Partial<RevisionRepositoryType>) {
    return await Revision.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return await Revision.findByIdAndDelete(id);
  }
}

export default new RevisionRepository();