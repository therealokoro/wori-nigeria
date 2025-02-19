import { drizzle } from "drizzle-orm/d1"

import * as schema from "../database/models"

export { sql, eq, and, or, desc } from "drizzle-orm"

export const tables = schema

export function useDb() {
  return drizzle(hubDatabase(), { schema })
}
