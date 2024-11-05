require("dotenv").config();

import type { Config } from "drizzle-kit";
import { env } from "process";
console.log(process.env.TURSO_DATABASE_URL);
console.log(process.env.TURSO_AUTH_TOKEN);

export default {
    schema: "./src/db/schema.ts",
    dialect: "turso",
    dbCredentials: {
        url: env.TURSO_DATABASE_URL || "",
        authToken: env.TURSO_AUTH_TOKEN || "",
    },
    tablesFilter: ["turns_*"],
} satisfies Config;
