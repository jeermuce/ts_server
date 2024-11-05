import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

interface appointmentStatus{
    status: "scheduled" | "checked-in" | "completed" | "canceled";
}

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey(), // the WhatsApp ID of the user
  name: text().notNull(),
  phone_number: text().notNull(),
  email: text(),
  appointment_date: text().notNull(),
  appointment_time: text().notNull(),
  reason: text(),
  doctor_id: int(),
  created_at: text().default(new Date().toISOString()),
  updated_at: text().default(new Date().toISOString()),
  status: text().$type<appointmentStatus>().default({ status: "scheduled" }),
});


export const doctorsTable = sqliteTable("doctors_table", {
  id: int().primaryKey(), // the WhatsApp ID of the doctor
  name: text().notNull(),
  phone_number: text().notNull(),
  email: text(),
  available: text().default("yes"),
  created_at: text().default(new Date().toISOString()),
  updated_at: text().default(new Date().toISOString()),
});