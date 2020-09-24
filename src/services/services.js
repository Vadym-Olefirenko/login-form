import axios from 'axios';

function getAccessToken() {
    return localStorage.getItem('accsess_token');
  }

  axios.interceptors.request.use((request) => {
    request.headers.get['Authorization'] = `Bearer ${getAccessToken()}`;
    return request;
  });

  axios.interceptors.response.use(
    (response) => {

      let statusCode = response.data.statusCode;
      if (statusCode === 401) {
        const originalRequest = response.config;
      
        originalRequest._retry = true;
        return fetch('http://142.93.134.108:1111/refresh', {
          method: 'POST', body: JSON.stringify({
            some: 'some'
          }), headers: { 
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
          }
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            localStorage.setItem('accsess_token', data.body.access_token);
            localStorage.setItem('refresh_token', data.body.refresh_token);
            originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
            return axios(originalRequest);
          })
          .catch((error) => {
            console.log(error)
          });
        
      } else {
        return response;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleInfo = ((host) => {
    return axios.get(host)
  })

  export default handleInfo;