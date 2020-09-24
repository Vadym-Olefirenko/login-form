import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('')

  let accessToken = localStorage.getItem('accsess_token');
  let refTocen = localStorage.getItem('refresh_token');



    function getAccessToken(){
      return localStorage.getItem('accsess_token');
    }
   
  // Use interceptor to inject the token to requests
  axios.interceptors.request.use(request => {
      request.headers.get['Authorization'] = `Bearer ${getAccessToken()}`;
      console.log('1', request);
      return request;
  });

  axios.interceptors.response.use(
   async (response) => {
      
      let statusCode = response.data.statusCode;
      if (statusCode === 401) {
      console.log('yes')

      
        await axios.post(`http://142.93.134.108:1111/refresh`, { some: 'some' }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('refresh_token'),
          }
        })
          .then((res) => {
            console.log('refresh', res)
            console.log('tok from foo', res.data.body.access_token)
            accessToken = localStorage.setItem('accsess_token', res.data.body.access_token);
            refTocen = localStorage.setItem('refresh_token', res.data.body.refresh_token);
          })
          .catch(error => {
            console.error(error)
          })
  
          
          console.log('1tok after refresh', accessToken)
          console.log('1res', response)
          return response;
      
      
      } else {
        console.log('tok after refresh', accessToken)
        console.log('res', response)
        return  response;
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
          console.error(error)
        })
    })

    handleInfo();

  }, [accessToken]);



  return (
    <div className="dash__page">
      <div className="mess">Info: <br />
        <span className="info">{content}</span>
      </div>
    </div>
  );
}

export default Dashboard;