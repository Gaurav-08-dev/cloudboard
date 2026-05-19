import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { cleanEnv, str } from "envalid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = cleanEnv(
  process.env,
  {
    MONGO_URI: str(),
    JWT_SECRET: str(),
    JWT_REFRESH_SECRET: str()
  }
)
