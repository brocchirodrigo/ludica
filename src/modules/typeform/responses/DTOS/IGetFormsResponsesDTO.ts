type IChoices = {
  labels?: Array<string>;
  ids: Array<string>;
  refs?: Array<string>;
  ref?: Array<string>;
  id?: Array<string>;
}

export type IResponseListAnswers = {
  [key in 'choices' | 'choice' | 'text']?: string | IChoices;
} & {
  field: {
    id_response: string;
    ref: string;
    type: string;
  };
};

export type ILeadResponses = {
  form_id?: string;
  response_id: string;
  submitted_at: Date;
  platform: string;
  landed_at: Date;
  answers: Array<IResponseListAnswers>;
}

export interface ILeadReturn extends ILeadResponses {
  metadata: { platform: string; };
}

