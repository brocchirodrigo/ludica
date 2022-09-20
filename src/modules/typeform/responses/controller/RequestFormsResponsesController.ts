import { Request, Response } from 'express';

import { RequestFormsResponsesService } from "../service/RequestFormsResponsesService";

const requestFormsResponsesService = new RequestFormsResponsesService();

class RequestFormsResponsesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const formsResponse = await requestFormsResponsesService.execute();

    return response.status(200).json(formsResponse);
  }
}

export { RequestFormsResponsesController };
