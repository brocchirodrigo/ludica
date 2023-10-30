import qs from "qs";

import typeformApi from "@shared/infra/http/service/typeform";
import AppError from "@error/AppError";
import { RequestFormsService } from "../../forms/service/RequestFormsService";
import IGetFormsDTO from "../../forms/DTOS/IGetFormsDTO";
import { ILeadResponses, ILeadReturn } from '@modules/typeform/responses/DTOS/IGetFormsResponsesDTO';

interface IParams {
  form_id?: string;
  page?: number;
  page_size?: number;
  since?: Date;
  until?: Date;
}

interface IResponse {
  form_id?: string;
}

const requestFormsService = new RequestFormsService()

class RequestFormsResponsesService {
  private async getForms(): Promise<IGetFormsDTO[] | undefined> {
    try {
      const forms = await requestFormsService.execute();

      return forms;
    } catch (err) {
      throw new AppError('Request Header: Erro ao obter lista de ids de formulários.');
    }
  }

  private async apiExecute({ form_id, page, page_size, since, until }: IParams): Promise<ILeadResponses[]> {
    const responseApi = await typeformApi.get(`/forms/${form_id}/responses`, {
      params: {
        page_size: 1000,
        page,
        since,
        until,
        order_by: 'desc'
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });

    const totalItems: ILeadResponses[] = [];

    const primeItems = responseApi.data.items;

    primeItems.map((item: ILeadReturn) => {
      totalItems.push({
        form_id,
        response_id: item.response_id,
        submitted_at: item.submitted_at,
        platform: item.metadata.platform,
        landed_at: item.landed_at,
        answers: item.answers,
      });
    })

    const pages = responseApi.data.page_count;

    let count = 2;

    if (pages > 1) {
      while (count <= pages) {
        const responseApiLoop = await typeformApi.get(`/forms/${form_id}/responses`, {
          params: {
            page_size: 1000,
            page: count,
            since,
            until,
            order_by: 'desc'
          },
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        });

        const otherItems = responseApiLoop.data.items;

        otherItems.map((item: ILeadReturn) => {
          totalItems.push({
            form_id,
            response_id: item.response_id,
            submitted_at: item.submitted_at,
            platform: item.metadata.platform,
            landed_at: item.landed_at,
            answers: item.answers
          });
        })

        count++
      }
    }

    return totalItems;
  }

  public async execute({ form_id }: IResponse): Promise<ILeadResponses[] | ILeadResponses[][] | undefined> {

    if (!!form_id) {
      const result = await this.apiExecute({ form_id: form_id, page_size: 1000 }) // Limite de 1000

      return result
    } else {
      try {
        const forms = await this.getForms();

        if (forms) {
          const promises = forms.map(async f => {
            const result = await this.apiExecute({ form_id: f.id, page_size: 1000 }) // Limite de 1000

            return result;
          });

          const resolved = await Promise.all(promises);

          const alreadyValues = resolved;

          const result = alreadyValues.filter(a => a.length > 0)

          return result;
        }
      } catch (err) {
        console.log(err)
        throw new AppError('Request Header: Erro ao obter os headers dos formulários.');
      }
    }
  }
}

export { RequestFormsResponsesService }
