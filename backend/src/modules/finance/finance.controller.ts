import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { UnauthorizedError } from "../../common/errors.js";
import { sendSuccess } from "../../common/response.js";
import type {
  CreateFinanceRecordBody,
  UpdateFinanceRecordBody,
} from "./finance.schema.js";
import {
  createFinanceRecord,
  deleteFinanceRecord,
  listFinanceRecords,
  updateFinanceRecord,
} from "./finance.service.js";

function requireAuthContext(req: Request): {
  userId: string;
  role: NonNullable<Request["profile"]>["role"];
} {
  if (!req.user || !req.profile) {
    throw new UnauthorizedError();
  }

  return {
    userId: req.user.id,
    role: req.profile.role,
  };
}

function getHouseId(req: Request): string {
  const houseId = req.params.houseId;
  if (!houseId) {
    throw new UnauthorizedError("Missing house id");
  }
  return houseId;
}

export const listFinanceRecordsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = requireAuthContext(req);
    const records = await listFinanceRecords(getHouseId(req), userId, role);
    sendSuccess(res, 200, { data: records });
  },
);

export const createFinanceRecordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = requireAuthContext(req);
    const body = req.body as CreateFinanceRecordBody;
    const record = await createFinanceRecord(getHouseId(req), body, role);
    sendSuccess(res, 201, { data: record, message: "Finance record created" });
  },
);

export const updateFinanceRecordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = requireAuthContext(req);
    const body = req.body as UpdateFinanceRecordBody;
    const record = await updateFinanceRecord(
      getHouseId(req),
      req.params.recordId!,
      body,
      role,
    );
    sendSuccess(res, 200, { data: record, message: "Finance record updated" });
  },
);

export const deleteFinanceRecordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = requireAuthContext(req);
    await deleteFinanceRecord(getHouseId(req), req.params.recordId!, role);
    sendSuccess(res, 200, { message: "Finance record deleted" });
  },
);
