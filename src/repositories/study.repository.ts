import { StudyRespositoryType, Subject } from "../types/study";
import { Study } from "../models/study.model";
import { Types } from "mongoose";


class StudyRepository {

  async create(data: StudyRespositoryType) {
     const study = await Study.create(data);
     const obj = study.toObject();
     return {
      ...obj,
      _id: obj._id.toString(),
      userId: obj.userId.toString(),
     }
  }

  // READ
 async findById(id: string) {
  const study = await Study.findById(id).lean();

  if (!study) {
    return null;
  }

  return {
    ...study,
    _id: study._id.toString(),
    userId: study.userId.toString(),
    studiedAt: study.studiedAt.toISOString(),
    createdAt: study.createdAt.toISOString(),
    updatedAt: study.updatedAt.toISOString(),
  };
}

  async findAllOfToday(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

      const studies =  await Study.find({
      userId: new Types.ObjectId(userId),
      studiedAt: {
      $gte: startOfDay,
      $lte: endOfDay,
      },
    }).lean();

    return studies.map((study) => ({
    ...study,
    _id: study._id.toString(),
    userId: study.userId.toString(),
  }));
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

  // DELETE
  async delete(id: string) {
    return await Study.deleteOne({
      _id : id
    })
  }
}

export default new StudyRepository();