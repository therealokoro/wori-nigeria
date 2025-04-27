PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_articles` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(500) NOT NULL,
	`description` text(500) NOT NULL,
	`slug` text(500) NOT NULL,
	`content` text NOT NULL,
	`cover_image` text(500) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_articles`("id", "title", "description", "slug", "content", "cover_image", "created_at") SELECT "id", "title", "description", "slug", "content", "cover_image", "created_at" FROM `articles`;--> statement-breakpoint
DROP TABLE `articles`;--> statement-breakpoint
ALTER TABLE `__new_articles` RENAME TO `articles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `articles_title_unique` ON `articles` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);