import { z } from "zod";

export const defaultValues = {
  page: 1,
  limit: 10,
};

export const usersSearchSchema = z.object({
  page: z.number().optional().catch(defaultValues.page),
  limit: z.number().optional().catch(defaultValues.limit),
  search: z.string().optional(),
  org: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Pending", "Blacklisted"]).optional(),
});
