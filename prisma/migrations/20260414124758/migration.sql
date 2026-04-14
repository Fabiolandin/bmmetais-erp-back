/*
  Warnings:

  - Added the required column `descricao` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "categoria_produtoId" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Produto_categoria_produtoId_fkey" FOREIGN KEY ("categoria_produtoId") REFERENCES "Categoria_Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("categoria_produtoId", "createdAt", "estoque", "id", "nome", "preco", "updatedAt") SELECT "categoria_produtoId", "createdAt", "estoque", "id", "nome", "preco", "updatedAt" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
