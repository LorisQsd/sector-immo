DROP TABLE IF EXISTS "sessions";--> statement-breakpoint
DROP TABLE IF EXISTS "users";--> statement-breakpoint
DROP TYPE IF EXISTS "user_roles";--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"salt" text,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;