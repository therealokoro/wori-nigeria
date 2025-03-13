CREATE TABLE `messages` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`lastname` text(500) NOT NULL,
	`firstname` text(500) NOT NULL,
	`email` text(500) NOT NULL,
	`is-read` integer,
	`body` text NOT NULL,
	`response` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `messages_lastname_unique` ON `messages` (`lastname`);--> statement-breakpoint
CREATE UNIQUE INDEX `messages_firstname_unique` ON `messages` (`firstname`);--> statement-breakpoint
CREATE UNIQUE INDEX `messages_email_unique` ON `messages` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `messages_body_unique` ON `messages` (`body`);