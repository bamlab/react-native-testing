import wretch from 'wretch';

import { EMAIL_API_ENDPOINT } from '../config';

interface IValidateEmailParams {
  email: string;
}

export class SignUpApi {
  public static subscribeNewsletter(subscribeNewsletterParams: IValidateEmailParams) {
    return wretch()
      .url(EMAIL_API_ENDPOINT)
      .post(subscribeNewsletterParams)
      .res();
  }
}
