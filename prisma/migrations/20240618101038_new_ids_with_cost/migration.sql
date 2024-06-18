/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ticket_count` on the `events` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `ticket_cost` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tickets_count` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_order_id_fkey`;

-- AlterTable
ALTER TABLE `events` DROP PRIMARY KEY,
    DROP COLUMN `ticket_count`,
    ADD COLUMN `ticket_cost` INTEGER NOT NULL,
    ADD COLUMN `tickets_count` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `orders` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tickets` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `event_id` VARCHAR(191) NOT NULL,
    MODIFY `order_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
