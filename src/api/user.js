import Axios from 'axios';

import { apiUrl } from 'Constants/urls';

export const apiSignToken = token => (
  Axios.get(`${apiUrl}/signin`, {
    headers: {
      authorization: token
    }
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    })
);
