import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const env = {
  port: process.env.PORT,
  typeform_token: process.env.TYPEFORM_TOKEN,
};

export { env };
