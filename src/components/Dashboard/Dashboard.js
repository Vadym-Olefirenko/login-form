import React, { useEffect, useState } from 'react';
import instance from '../../services/services';

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    async function fetchingData () {
      try {
        const response = await instance.get(`me`);
        console.log('from me', response)
        let { body } = response.data;
        let text = body.message;
        setContent(text);
      } catch (error) {
        console.error('error', error)
        props.history.push('/');
      }
    }
    fetchingData();
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