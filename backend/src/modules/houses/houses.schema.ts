import { z } from "zod";

const optionalNumber = z.preprocess(
  (value) =>
    value === "" || value === null || value === undefined ? null : value,
  z.coerce.number().optional().nullable(),
);

const optionalInt = z.preprocess(
  (value) =>
    value === "" || value === null || value === undefined ? null : value,
  z.coerce.number().int().optional().nullable(),
);

const rawHouseSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z.string().trim().optional().nullable(),
  apartments_count: optionalInt,
  total_area: optionalNumber,
  build_year: optionalInt,
  apartmentsCount: optionalInt,
  totalArea: optionalNumber,
  buildYear: optionalInt,
});

type RawHouseInput = z.infer<typeof rawHouseSchema>;

export type CreateHouseBody = {
  name: string;
  address: string | null;
  apartments_count: number | null;
  total_area: number | null;
  build_year: number | null;
};

export type UpdateHouseBody = Partial<CreateHouseBody>;

function normalizeHouseInput(data: RawHouseInput): CreateHouseBody {
  return {
    name: data.name,
    address: data.address ?? null,
    apartments_count: data.apartments_count ?? data.apartmentsCount ?? null,
    total_area: data.total_area ?? data.totalArea ?? null,
    build_year: data.build_year ?? data.buildYear ?? null,
  };
}

function normalizePartialHouseInput(
  data: Partial<RawHouseInput>,
): UpdateHouseBody {
  const result: UpdateHouseBody = {};

  if (data.name !== undefined) {
    result.name = data.name;
  }
  if (data.address !== undefined) {
    result.address = data.address ?? null;
  }
  if (data.apartments_count !== undefined || data.apartmentsCount !== undefined) {
    result.apartments_count =
      data.apartments_count ?? data.apartmentsCount ?? null;
  }
  if (data.total_area !== undefined || data.totalArea !== undefined) {
    result.total_area = data.total_area ?? data.totalArea ?? null;
  }
  if (data.build_year !== undefined || data.buildYear !== undefined) {
    result.build_year = data.build_year ?? data.buildYear ?? null;
  }

  return result;
}

export const createHouseSchema = rawHouseSchema.transform(normalizeHouseInput);

export const updateHouseSchema = rawHouseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .transform(normalizePartialHouseInput);
