import { env } from "@config/env";
import axios from "axios";

type TypeformRoutes = {
  [key: string]: string;
};

export const typeformRoutes: TypeformRoutes = {
  forms: "/forms",
  form: "forms/{:id}",
  insights: "/insights/{:id}/summary",
  responses: "/forms/{:id}/responses",
};

const typeformApi = axios.create({
  baseURL: "https://api.typeform.com",
  headers: {
    Authorization: `Bearer ${env.typeform_token}`,
  },
});

export default typeformApi;
