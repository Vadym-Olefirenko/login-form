import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('')

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

  useEffect(() => {
    const handleInfo = (() => {
      axios.get(`http://142.93.134.108:1111/me`)
        .then((response) => {
          console.log('from me', response)
          let { body } = response.data;
          let text = body.message;
          setContent(text);
        })
        .catch(error => {
          console.error('error', error)
          props.history.push('/');
        })
    })

    handleInfo();

  }, []);

  return (
    <div className="dash__page">
      <div className="mess">Info: <br />
        <span className="info">{content}</span>
      </div>
    </div>
  );
}

export default Dashboard;