import { Request, Response } from 'express';

import { BrasilApiService } from '../service/BrasilApiService';

const brasilApiService = new BrasilApiService()

interface IDataBody {
  CEP?: string;
  CPF?: string;
  CNPJ?: string;
}

class BrasilApiController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as IDataBody;

    const returnData = await brasilApiService.execute(data);

    return response.status(200).json(returnData);
  }
}

export { BrasilApiController };
