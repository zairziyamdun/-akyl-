import type { Request, Response } from "express";

import { asyncHandler } from "../../common/async-handler.js";
import { sendSuccess } from "../../common/response.js";
import type {
  CreateLibraryMaterialInput,
  UpdateLibraryMaterialInput,
} from "./library.schema.js";
import {
  assertLibraryImage,
  createLibraryMaterial,
  deleteLibraryMaterial,
  getLibraryMaterial,
  listLibraryMaterials,
  updateLibraryMaterial,
  uploadLibraryImage,
} from "./library.service.js";

function canSeeDrafts(req: Request): boolean {
  return req.profile?.role === "admin";
}

export const listMaterialsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const includeDrafts = canSeeDrafts(req) && req.query.all === "1";
    const materials = await listLibraryMaterials({ includeDrafts });
    sendSuccess(res, 200, { data: materials });
  },
);

export const getMaterialHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const material = await getLibraryMaterial(req.params.id!, {
      includeDrafts: canSeeDrafts(req),
    });
    sendSuccess(res, 200, { data: material });
  },
);

export const createMaterialHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const material = await createLibraryMaterial(
      req.body as CreateLibraryMaterialInput,
      req.user!.id,
    );
    sendSuccess(res, 201, { message: "Material created", data: material });
  },
);

export const updateMaterialHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const material = await updateLibraryMaterial(
      req.params.id!,
      req.body as UpdateLibraryMaterialInput,
    );
    sendSuccess(res, 200, { message: "Material updated", data: material });
  },
);

export const deleteMaterialHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteLibraryMaterial(req.params.id!);
    sendSuccess(res, 200, { message: "Material deleted" });
  },
);

export const uploadImageHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const file = assertLibraryImage(req.file);
    const result = await uploadLibraryImage(file);
    sendSuccess(res, 200, { data: result });
  },
);
