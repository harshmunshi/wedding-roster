CREATE TABLE "roster" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"arrival_date_time" timestamp NOT NULL,
	"departure_date_time" timestamp NOT NULL,
	"arrival_city" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
