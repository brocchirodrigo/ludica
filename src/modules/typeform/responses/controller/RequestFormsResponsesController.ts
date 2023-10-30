import { Request, Response } from 'express';

import { RequestFormsResponsesService } from "../service/RequestFormsResponsesService";

const requestFormsResponsesService = new RequestFormsResponsesService();

class RequestFormsResponsesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const form_id = request.params;

    const formsResponse = await requestFormsResponsesService.execute(form_id);

    return response.status(200).json(formsResponse);
  }
}

export { RequestFormsResponsesController };
