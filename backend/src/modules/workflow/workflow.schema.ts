import { Type, Static } from "@sinclair/typebox";

const id = Type.String({ format: "uuid" });
const organization_id = Type.String({ format: "uuid" });
const created_at = Type.String({ format: "date-time" });
const updated_at = Type.String({ format: "date-time" });

const title = Type.String({ minLength: 3, maxLength: 50 });
const description = Type.Optional(Type.String({ maxLength: 100 }));

export class BoardSchema {
  static BaseBoardSchema = Type.Object(
    {
      title,
      description,
    },
    { $id: "BaseBoardSchema" }
  );

  static CreateBoardSchema = Type.Object(
    {
      organization_id,
      title,
      description,
    },
    { $id: "CreateBoardSchema" }
  );

  static UpdateBoardSchema = Type.Partial(BoardSchema.BaseBoardSchema, {
    $id: "UpdateBoardSchema",
  });

  static DeleteBoardSchema = Type.Object(
    {
      id,
    },
    { $id: "DeleteBoardSchema" }
  );

  // RESPONSE SCHEMA
  static BoardResponseSchema = Type.Intersect(
    [
      BoardSchema.BaseBoardSchema,
      Type.Object({
        id,
        organization_id,
        created_at,
        updated_at,
      }),
    ],
    { $id: "BoardResponseSchema" }
  );
}

export type BaseBoard = Static<typeof BoardSchema.BaseBoardSchema>;
export type CreateBoard = Static<typeof BoardSchema.CreateBoardSchema>;
export type DeleteBoard = Static<typeof BoardSchema.DeleteBoardSchema>;
export type UpdateBoard = Static<typeof BoardSchema.UpdateBoardSchema>;
export type BoardResponse = Static<typeof BoardSchema.BoardResponseSchema>;
