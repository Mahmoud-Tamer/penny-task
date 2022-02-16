import { environment } from '../../../environments/environment';

export const BaseUrl = () => {
  let base_url = environment.base_url;
  if (!base_url) {
    base_url = `${location.origin}`;
  }

  return base_url;
};
