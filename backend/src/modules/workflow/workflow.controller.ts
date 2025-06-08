import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBoard, UpdateBoard } from "./board.schema";
import { BoardService } from "./board.service";

export class BoardController {
  private readonly boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  public async getBoardController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    try {
      const result = await this.boardService.getById(id);
      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(500).send(err);
    }
  }

  public async getAllBoardsController(
    request: FastifyRequest<{ Params: { organization_id: string } }>,
    reply: FastifyReply
  ) {
    const { organization_id } = request.params;
    try {
      const result = await this.boardService.getAll(organization_id);
      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(500).send(err);
    }
  }

  public async createBoardController(
    request: FastifyRequest<{ Body: CreateBoard }>,
    reply: FastifyReply
  ) {
    const body = request.body;
    try {
      const board = await this.boardService.create(body);
      return reply.status(201).send(board);
    } catch (err) {
      return reply.status(500).send(err);
    }
  }

  public async updateBoardController(
    request: FastifyRequest<{ Body: UpdateBoard; Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const body = request.body;
    const { id } = request.params;
    try {
      const result = await this.boardService.update(body, id);
      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(500).send(err);
    }
  }

  public async removeBoardController(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    try {
      const result = await this.boardService.deleteBoard(id);
      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(500).send(err);
    }
  }
}
