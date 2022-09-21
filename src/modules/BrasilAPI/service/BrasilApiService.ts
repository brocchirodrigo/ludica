import BrasilApi from '@shared/infra/http/service/BrasilApi';
import { cpf } from 'cpf-cnpj-validator';

interface IRequest {
  CEP?: string;
  CNPJ?: string;
  CPF?: string;
}

class BrasilApiService {

  public async execute({ CPF, CEP, CNPJ }: IRequest) {
    const returns = []

    if (CEP) {
      const cep = CEP.replace(/'.'|'-'/, '')

      try {

        const returnCep = await BrasilApi.get(`/cep/v2/${cep}`)
        returns.push({ "return_cep": returnCep.data })

      } catch {
        returns.push({ "return_cep": {} })
      }
    }

    if (CNPJ) {
      const cnpj = CNPJ.replace(/'.'|'-'|/, '').split("/").join("")

      try {
        const returnCNPJ = await BrasilApi.get(`/cnpj/v1/${cnpj}`)
        returns.push({ "return_cnpj": returnCNPJ.data })
      } catch {
        returns.push({ "return_cnpj": {} })
      }
    }

    if (CPF) {
      try {
        const consultCPF = CPF.replace(/'.'|'-'/, '')
        const cpfValidated = cpf.isValid(consultCPF)
        returns.push({ "return_cpf": { CPF: `${CPF}`, validate: cpfValidated } })
      } catch {
        returns.push({ "return_cpf": {} })
      }
    }

    return returns;
  }
}

export { BrasilApiService }
