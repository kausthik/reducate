import { Subject } from "@/src/types/study";
import { Study } from "@/src/models/study.model";
import { Types } from "mongoose";


// Record means "an object whose keys and values follow a specific rule."
// <string, unknown> means string key is allowed only, value may be any datatype
class StudyRepository {
  async create(data: Record<string, unknown>, userId: string) {
    return await Study.create(data);
  }

  async findById(id: string) {
    return await Study.findById(id).lean();
  }

  async findByUser(userId: string) {
    return await Study.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({ updatedAt: -1 })
      .lean();
  }

  async findByNormalizedTitle(
    userId: string,
    subject: Subject,
    normalizedTitle: string
  ) {
    return await Study.findOne({
      userId: new Types.ObjectId(userId),
      subject,
      normalizedTitle,
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    return await Study.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return await Study.findByIdAndDelete(id);
  }
}

export default new StudyRepository();