import axios from 'axios';

function getAccessToken() {
  return localStorage.getItem('accsess_token');
}

axios.interceptors.request.use((request) => {
  if (getAccessToken()) {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  }
  console.log(request.headers['Authorization']);
  return request;
});

axios.interceptors.response.use(
  async (response) => {

    let statusCode = response.data.statusCode;
    if (statusCode === 401) {
      const originalRequest = response.config;
      try {
        const res = await fetch('http://142.93.134.108:1111/refresh', {
          method: 'POST', body: JSON.stringify({
            some: 'some'
          }), headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
          }
        })

        const data = await res.json();

        console.log('new token', data.body.access_token);
        localStorage.setItem('accsess_token', data.body.access_token);
        localStorage.setItem('refresh_token', data.body.refresh_token);
        return axios(originalRequest);
      } catch (error) {
        console.log(error)
      }

    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const checkValidity = host => axios.get(host)

export default checkValidity;