import { StudyRespositoryType } from "../types/study";
import { Study } from "../models/study.model";
import { Types } from "mongoose";
import { Subject } from "../types/study";

class StudyRepository {

  async create(data: StudyRespositoryType) {
     const study = await Study.create(data);
     return study.toObject();
  }

  // READ
  async findById(id: string) {
      return await Study.findById(id).lean();    
  }

  async findAllOfToday(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

      return await Study.find({
      userId: new Types.ObjectId(userId),
      studiedAt: {
      $gte: startOfDay,
      $lte: endOfDay,
      },
    }).lean();
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
  }).lean();
}

  // async findByUser(userId: string) {
    
  // }

  // async findBySomething(value: string) {}

  // UPDATE
  // async update(
  //   id: string,
  //   data: Record<string, unknown>
  // ) {}

  // DELETE
  async delete(id: string) {
    return await Study.deleteOne({
      _id : id
    })
  }
}

export default new StudyRepository();