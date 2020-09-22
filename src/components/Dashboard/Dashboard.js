import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('')
  
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accsess_token');
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
      console.log('1', config);
      return config;

    },
    error => {
      Promise.reject(error)
    });


  axios.interceptors.response.use(
    (response) => {
      console.log('res', response)
      let statusCode = response.data.statusCode;
      if (statusCode === 401) {
        console.log('yes')
        // axios.post(`http://142.93.134.108:1111/refresh`, { some: 'some' }, {
        //   headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('refresh_token'),
        //   }
        // })
        //   .then((res) => {
        //     console.log('refresh', res)
        //     // localStorage.setItem('accsess_token', res.data.body.access_token);
        //   })
          

      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {

    const handleInfo = ((token) => {
      axios.get(`http://142.93.134.108:1111/me`)
        .then((response) => {
          console.log('from me', response)
          let { body } = response.data;
          let text = body.message;
          setContent(text);
          // console.log('text', text)
        })
    })

    handleInfo(localStorage.getItem('accsess_token'));

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