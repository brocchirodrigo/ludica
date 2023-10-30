import { Request, Response } from 'express';

import { RequestFormsService } from "../service/RequestFormsService";

const requestFormsService = new RequestFormsService();

class RequestFormsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const formsResponse = await requestFormsService.execute();

    return response.status(200).json(formsResponse);
  }
}

export { RequestFormsController };
