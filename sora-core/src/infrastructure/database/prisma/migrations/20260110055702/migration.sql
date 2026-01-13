-- CreateTable
CREATE TABLE `user` (
    `discord_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `global_name` VARCHAR(255) NULL,

    PRIMARY KEY (`discord_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan` (
    `plan_id` VARCHAR(50) NOT NULL,
    `public_name` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `price_cents` INTEGER NOT NULL,
    `billing_cycle` VARCHAR(20) NULL,
    `max_bots` INTEGER NULL,
    `max_guilds` INTEGER NULL,
    `has_custom_avatar` BOOLEAN NULL,
    `has_custom_banner` BOOLEAN NULL,
    `has_team_access` BOOLEAN NULL,
    `is_active` BOOLEAN NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bot` (
    `bot_id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `user_id` VARCHAR(255) NULL,
    `token` VARCHAR(255) NULL,
    `client_id` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX `bot_user_id_idx`(`user_id`),
    PRIMARY KEY (`bot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild` (
    `guild_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `status` ENUM('PENDING', 'VERIFIED', 'REJECTED') NULL DEFAULT 'PENDING',
    `added_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `verified_at` DATETIME NULL,

    INDEX `guild_status_idx`(`status`),
    PRIMARY KEY (`guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bot_guild` (
    `bot_guild_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bot_id` VARCHAR(100) NULL,
    `guild_id` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE INDEX `bot_guild_bot_id_guild_id_key`(`bot_id`, `guild_id`),
    PRIMARY KEY (`bot_guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `bot_guild_id` INTEGER NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bot_guild_id` INTEGER NULL,
    `content` TEXT NULL,
    `message_type` VARCHAR(20) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon` (
    `code_id` VARCHAR(100) NOT NULL,
    `public_code` VARCHAR(50) NULL,
    `description` VARCHAR(255) NULL,
    `discount_type` VARCHAR(10) NULL,
    `discount_value` DECIMAL(10, 2) NULL,
    `valid_from` DATETIME NULL,
    `valid_until` DATETIME NULL,
    `max_uses` INTEGER NULL,
    `max_uses_per_user` INTEGER NULL,
    `applies_to_plan` VARCHAR(50) NULL,
    `is_active` BOOLEAN NULL,

    PRIMARY KEY (`code_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NULL,
    `plan_id` VARCHAR(50) NULL,
    `started_at` DATETIME NULL,
    `expires_at` DATETIME NULL,
    `status` VARCHAR(20) NULL,
    `is_trial` BOOLEAN NULL,
    `last_payment_id` INTEGER NULL,

    UNIQUE INDEX `subscription_last_payment_id_key`(`last_payment_id`),
    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NULL,
    `user_id` VARCHAR(255) NULL,
    `plan_id` VARCHAR(50) NULL,
    `coupon_code_id` VARCHAR(100) NULL,
    `mp_payment_id` VARCHAR(100) NULL,
    `mp_status` ENUM('APPROVED', 'PENDING', 'REJECTED', 'REFUNDED') NULL,
    `mp_status_detail` VARCHAR(255) NULL,
    `mp_payment_method` VARCHAR(50) NULL,
    `mp_payment_type` VARCHAR(50) NULL,
    `amount_cents` INTEGER NOT NULL,
    `discount_cents` INTEGER NULL,
    `currency` VARCHAR(10) NULL,
    `paid_at` DATETIME NULL,
    `expires_at` DATETIME NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,

    INDEX `payment_mp_payment_id_idx`(`mp_payment_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bot` ADD CONSTRAINT `bot_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`discord_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bot_guild` ADD CONSTRAINT `bot_guild_bot_id_fkey` FOREIGN KEY (`bot_id`) REFERENCES `bot`(`bot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bot_guild` ADD CONSTRAINT `bot_guild_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guild`(`guild_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_bot_guild_id_fkey` FOREIGN KEY (`bot_guild_id`) REFERENCES `bot_guild`(`bot_guild_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_bot_guild_id_fkey` FOREIGN KEY (`bot_guild_id`) REFERENCES `bot_guild`(`bot_guild_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coupon` ADD CONSTRAINT `coupon_applies_to_plan_fkey` FOREIGN KEY (`applies_to_plan`) REFERENCES `plan`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`discord_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_last_payment_id_fkey` FOREIGN KEY (`last_payment_id`) REFERENCES `payment`(`payment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`discord_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscription`(`subscription_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_coupon_code_id_fkey` FOREIGN KEY (`coupon_code_id`) REFERENCES `coupon`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
