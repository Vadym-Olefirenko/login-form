import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('')
  let acc = localStorage.getItem('accsess_token');
  let refr = localStorage.getItem('refresh_token');

  useEffect(() => {

    const handleInfo = ((token) => {
      axios.get(`http://142.93.134.108:1111/me`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((response) => {
          let { body } = response.data;
          let text = body.message;
          setContent(text);
        })
    })

    handleInfo(acc);

  }, []);

  useEffect(() => {

    const refreshInfo = ((token) => {
      axios.post(`http://142.93.134.108:1111/refresh`, { some: 'some' }, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
        .then((response) => {
          localStorage.setItem('accsess_token', response.data.body.access_token);
          localStorage.setItem('refresh_token', response.data.body.refresh_token);
        })
    })

    setInterval(function () {
      refreshInfo(refr);
    }, 60000);

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