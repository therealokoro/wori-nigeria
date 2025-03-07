CREATE TABLE `album` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(500) NOT NULL,
	`slug` text(500) NOT NULL,
	`images` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `album_title_unique` ON `album` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `album_slug_unique` ON `album` (`slug`);