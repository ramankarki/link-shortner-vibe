CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"short_code" varchar(20) NOT NULL,
	"original_url" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
