import { Request, Response } from 'express';

import { RequestFormsHeadersService } from "../service/RequestFormsHeadersService";

const requestFormsHeadersService = new RequestFormsHeadersService();

class RequestFormsHeadersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const formsResponse = await requestFormsHeadersService.execute();

    return response.status(200).json(formsResponse);
  }
}

export { RequestFormsHeadersController };
