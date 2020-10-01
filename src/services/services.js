import axios from 'axios';

const instance = axios.create({
  baseURL: "http://142.93.134.108:1111",
  headers: {
    'content-type': 'application/json',
  },
  responseType: "json"
})

function getAccessToken() {
  return localStorage.getItem('accsess_token');
}

instance.interceptors.request.use((request) => {
  if (getAccessToken()) {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  }
  return request;
});

instance.interceptors.response.use(
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

        localStorage.setItem('accsess_token', data.body.access_token);
        localStorage.setItem('refresh_token', data.body.refresh_token);
        return instance(originalRequest);
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



export default instance;