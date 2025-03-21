import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { folders as foldersSchema } from "~/server/db/schema";

type FolderInferedType = typeof foldersSchema.$inferSelect;

export const getFolderInfoWithParents = async (
  folderId: number,
): Promise<FolderInferedType[]> => {
  const query = sql<FolderInferedType[]>`
    WITH RECURSIVE folder_cte AS (
      -- Base case: start with the current folder
      SELECT 
        id, 
        name, 
        parent_id AS parentId, 
        owner_id AS ownerId,
        0 AS depth
      FROM ${foldersSchema}
      WHERE id = ${folderId}
      
      UNION ALL
      
      -- Recursive case: join with the parent folder and increment depth
      SELECT 
        f.id, 
        f.name, 
        f.parent_id AS parentId, 
        f.owner_id AS ownerId,
        fc.depth + 1 AS depth
      FROM ${foldersSchema} f
      INNER JOIN folder_cte fc ON fc.parentId = f.id
    )
    SELECT id, name, parentId, ownerId
    FROM folder_cte
    ORDER BY depth DESC;
  `;

  const [rows] = await db.execute(query);
  return rows as unknown as FolderInferedType[];
};
