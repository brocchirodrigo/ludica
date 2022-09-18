import qs from "qs";

import typeformApi from "@shared/infra/http/service/typeform";
import AppError from "@error/AppError";
import { RequestFormsService } from "./RequestFormsService";
import IGetFormsDTO from "../DTOS/IGetFormsDTO";

interface IParams {
  form_id?: string;
}

interface IFieldsForm {
  id: string;
  title: string;
  ref: string;
}

interface IFields {
  id: string;
  title: string;
  ref: string;
}

interface IFormHeaders {
  id_form: string;
  title: string;
  fields: Array<IFields>;
}

const requestFormsService = new RequestFormsService()

class RequestFormsHeadersService {
  private async getForms(): Promise<IGetFormsDTO[] | undefined> {
    try {
      const forms = await requestFormsService.execute();

      return forms;
    } catch (err) {
      throw new AppError('Request Header: Erro ao obter lista de ids de formulários.');
    }
  }

  private async apiExecute({ form_id }: IParams): Promise<IFormHeaders> {
    const responseApi = await typeformApi.get(`/forms/${form_id}`, {
      params: {
        order_by: 'desc'
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });

    const fieldsList: IFieldsForm[] = [];

    const mapperField = responseApi.data.fields;

    mapperField.map((p: IFieldsForm) => {
      fieldsList.push({
        id: p.id,
        title: p.title,
        ref: p.ref
      })
    })

    const data = {
      id_form: responseApi.data.id,
      title: responseApi.data.title,
      fields: fieldsList,
    }

    return data;
  }

  public async execute(): Promise<IFormHeaders[] | undefined> {
    const forms = await this.getForms();

    if (forms) {
      const promises = forms.map(async f => {
        const result = await this.apiExecute({ form_id: f.id })
        return result
      });

      const resolved = await Promise.all(promises);

      return resolved;
    }
  }
}

export { RequestFormsHeadersService }
