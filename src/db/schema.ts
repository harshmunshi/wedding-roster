import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roster = pgTable("roster", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  arrivalDateTime: timestamp("arrival_date_time").notNull(),
  departureDateTime: timestamp("departure_date_time").notNull(),
  arrivalCity: text("arrival_city").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
