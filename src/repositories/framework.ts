class EntityRepository {

  // CREATE
  async create(data: Record<string, unknown>) {}

  // READ
  async findById(id: string) {}

  async findAll() {}

  async findByUser(userId: string) {}

  async findBySomething(value: string) {}

  // UPDATE
  async update(
    id: string,
    data: Record<string, unknown>
  ) {}

  // DELETE
  async delete(id: string) {}
}

export default new EntityRepository();