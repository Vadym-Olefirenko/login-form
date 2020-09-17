import React, {useEffect, useState} from 'react';
import axios from 'axios'; 

import './Dashboard.css'

const Dashboard = (props) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    console.log('rendered')
    
    let x = localStorage.getItem('myData');
    console.log()
  
    const handleInfo = ((token) => {
      axios.get(`http://142.93.134.108:1111/me`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((response) => { 
          console.log('me', response);
          let {body} = response.data;
          let text = body.message;
          setContent(text);
      })
    })
    

    const refreshInfo = ((token) => {
      axios.post(`http://142.93.134.108:1111/refresh`, {some: 'some'}, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((response) => {
          console.log('fresh', response);
          // let {body} = response.data;
          // let text = body.message;
          // setContent(text);
      })
    })

    if (props.token) {
      let {access_token, refresh_token} = props.token;
      handleInfo(access_token);

      refreshInfo(refresh_token);
    } else {
      setContent('Log in on the main page!')
    }
  },[]);
 
  return (
    <div className="dash__page">
     <div className="mess">Info: <br/>
      <span className="info">{content}</span>
     </div>
    </div>
  );
}
 
export default Dashboard;