import { BoardRepository } from "./board.repository";
import { CreateBoard, UpdateBoard, BoardResponse } from "./board.schema";

export class BoardService {
  private readonly boardRepository: BoardRepository;

  constructor() {
    this.boardRepository = new BoardRepository();
  }

  async getById(id: string): Promise<BoardResponse> {
    return this.boardRepository.getById(id);
  }

  async getAll(organization_id: string): Promise<BoardResponse[]> {
    return this.boardRepository.getAll(organization_id);
  }

  async create(input: CreateBoard): Promise<BoardResponse> {
    return this.boardRepository.create(input);
  }

  async update(input: UpdateBoard, id: string): Promise<BoardResponse> {
    return this.boardRepository.update(input, id);
  }

  async deleteBoard(id: string) {
    return this.boardRepository.deleteBoard(id);
  }
}
