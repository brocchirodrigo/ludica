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

const api = axios.create({
  baseURL: "https://api.typeform.com",
});

export default api;
