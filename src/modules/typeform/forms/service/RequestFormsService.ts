import qs from "qs";

import { AxiosResponse } from 'axios';

import typeformApi from "@shared/infra/http/service/typeform";
import AppError from "@error/AppError";
import IGetFormsDTO from "../DTOS/IGetFormsDTO";

interface IParams {
  page?: number;
  page_size?: number;
}

class RequestFormsService {

  private async apiExecute({ page, page_size }: IParams): Promise<AxiosResponse> {
    const responseApi = await typeformApi.get("/forms", {
      params: {
        page_size,
        page,
        order_by: 'desc'
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });

    return responseApi;
  }

  public async execute(): Promise<IGetFormsDTO[] | undefined> {
    try {
      const totalItems: IGetFormsDTO[] = [];

      const responseApi = await this.apiExecute({ page_size: 200 });

      const primeItems = responseApi.data.items;

      primeItems.map((item: IGetFormsDTO) => {
        totalItems.push({
          id: item.id,
          created_at: item.created_at,
          last_updated_at: item.last_updated_at,
          title: item.title
        });
      })

      const pages = responseApi.data.page_count;

      let count = 2;

      if (pages > 1) {
        while (count <= pages) {
          console.log(count)
          const responseApiLoop = await this.apiExecute({ page: count, page_size: 200 });

          const otherItems = responseApiLoop.data.items;

          otherItems.map((item: IGetFormsDTO) => {
            totalItems.push({
              id: item.id,
              created_at: item.created_at,
              last_updated_at: item.last_updated_at,
              title: item.title
            });
          })

          count++
        }
      }

      return totalItems;
    } catch (err) {
      throw new AppError('Impossível obter os dados de formulário, erro na API.');
    }

  }
}

export { RequestFormsService }
