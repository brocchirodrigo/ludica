import axios from "axios";

const BrasilApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});

export default BrasilApi;
