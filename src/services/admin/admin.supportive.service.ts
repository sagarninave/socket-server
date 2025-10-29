import { IGetAllUsersQueryParams } from "../../interface";
import { StatusCode, Message } from "../../constant";
import { HttpException } from "../../exception";
import { PipelineStage } from "mongoose";

export const getAllUsersBuildQuery = (
  query: IGetAllUsersQueryParams
): PipelineStage[] => {
  const { name, role, limit = 5, offset = 0 } = query;

  const parsedLimit = Number(limit);
  const parsedOffset = Number(offset);

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    throw new HttpException(StatusCode.BAD_REQUEST, Message.LIMIT_REQUIRED);
  }

  const conditions: Record<string, unknown>[] = [];

  if (name) {
    conditions.push(
      { firstName: { $regex: name, $options: "i" } },
      { lastName: { $regex: name, $options: "i" } }
    );
  }

  if (role) {
    conditions.push({ role: { $regex: role, $options: "i" } });
  }

  const pipeline: PipelineStage[] = [];

  if (conditions.length > 0) {
    pipeline.push({ $match: { $or: conditions } });
  }

  if (parsedOffset > 0) {
    pipeline.push({ $skip: parsedOffset });
  }

  pipeline.push({
    $project: { firstName: 1, lastName: 1, email: 1, role: 1 },
  });

  if (parsedLimit) {
    pipeline.push({ $limit: parsedLimit });
  }

  return pipeline;
};
