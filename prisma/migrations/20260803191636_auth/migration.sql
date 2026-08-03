/*
  Warnings:

  - Added the required column `email` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'funcionario',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Funcionario" ("cpf", "createdAt", "id", "nome", "updatedAt") SELECT "cpf", "createdAt", "id", "nome", "updatedAt" FROM "Funcionario";
DROP TABLE "Funcionario";
ALTER TABLE "new_Funcionario" RENAME TO "Funcionario";
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
