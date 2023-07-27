/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Pictures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Pictures_id_key` ON `Pictures`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Products_id_key` ON `Products`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Products_name_key` ON `Products`(`name`);
