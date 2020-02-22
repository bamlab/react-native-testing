import wretch from 'wretch';

import { EMAIL_API_ENDPOINT } from '../config';

interface ValidateEmailParams {
  email: string;
}

export class SignUpApi {
  public static subscribeNewsletter(subscribeNewsletterParams: ValidateEmailParams) {
    return wretch()
      .url(EMAIL_API_ENDPOINT)
      .post(subscribeNewsletterParams)
      .res();
  }
}
