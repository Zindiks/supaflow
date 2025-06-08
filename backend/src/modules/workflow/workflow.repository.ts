import { Knex } from "knex";
import { CreateBoard, UpdateBoard, BoardResponse } from "./board.schema";
import knexInstance from "../../db/knexInstance";

const table = "boards";

export class BoardRepository {
  private readonly knex: Knex;

  constructor() {
    this.knex = knexInstance;
  }

  async getById(id: string): Promise<BoardResponse> {
    const [board] = await this.knex(table)
      .select("*")
      .where({ id })
      .returning("*");
    return board;
  }

  async getAll(organization_id: string): Promise<BoardResponse[]> {
    return await this.knex(table)
      .select("*")
      .where({ organization_id })
      .returning("*");
  }

  async create(input: CreateBoard): Promise<BoardResponse> {
    const [board] = await this.knex(table).insert(input).returning("*");
    return board;
  }

  async update(input: UpdateBoard, id: string): Promise<BoardResponse> {
    const updatedInput = {
      ...input,
      updated_at: this.knex.fn.now(),
    };
    const [board] = await this.knex(table)
      .update(updatedInput)
      .where({ id })
      .returning("*");
    return board;
  }

  async deleteBoard(id: string) {
    const [deleted] = await this.knex(table)
      .where({ id })
      .delete()
      .returning("id");
    return deleted;
  }
}
