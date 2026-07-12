import { Types } from "mongoose";

import { ImportantDate } from "@/src/models/important-date.model";
import { ImportantDateRepositoryType } from "@/src/types/important-date";

class ImportantDateRepository {
  // CREATE
  async create(data: ImportantDateRepositoryType) {
    const importantDate = await ImportantDate.create(data);
    return importantDate.toObject();
  }

  // READ
  async findById(id: string) {
    return ImportantDate.findById(id).lean();
  }

  async findUpcoming(userId: string) {
    return ImportantDate.find({
      userId: new Types.ObjectId(userId),
      date: {
        $gte: new Date(),
      },
    })
      .sort({
        date: 1,
      })
      .lean();
  }

  async findPast(userId: string) {
    return ImportantDate.find({
      userId: new Types.ObjectId(userId),
      date: {
        $lt: new Date(),
      },
    })
      .sort({
        date: -1,
      })
      .lean();
  }

  // UPDATE
  async update(
    id: string,
    data: Partial<ImportantDateRepositoryType>
  ) {
    return ImportantDate.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return ImportantDate.findByIdAndDelete(id);
  }
}

export default new ImportantDateRepository();