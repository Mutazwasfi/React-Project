import './Contact.scss'


import { Button, Form, Input, Select, Radio, Card, Col, Row, Space, Watermark } from 'antd';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined, EnvironmentFilled, MailTwoTone, PhoneTwoTone, ClockCircleTwoTone
} from '@ant-design/icons';
import HeroBanner from '../../components/heroBanner/HeroBanner';

import pageHeaderProduct from '../../components/imgs/banner2.jpg'

import avt from '../../components/imgs/avt.png'
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/apiURL';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */


function Contact() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  useEffect(() => {
    fetchUserCurrent();
  }, []);

  const [user, setUser] = useState({});

  const fetchUserCurrent = async () => {
    await axios.get(`${BASE_URL}user/showme`, { withCredentials: true })
      .then(res => {
        setUser(res.data.data)
      })
      .catch(err => {
        setUser({})
      })
  };



  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');


  const handleSend = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must login to send message');
    const data = {
      id : user?.id,
      fullname: fullname,
      email: email,
      title: title,
      message: message
    }
    await axios.post(`${BASE_URL}contact`, data, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        alert('Send message successfully');
        setFullname('');
        setEmail('');
        setTitle('');
        setMessage('');
      })
      .catch(err => {
        alert('Send message failed');
      })
  }


return (
  <>
    <div className="container-contact">
      <HeroBanner
        title="#contact"
        summary="Brings you news about books and authors along with our picks for great reads!"
        srcImg={pageHeaderProduct}
      />

      <div className="mid0">
        <div className="info">
          <section >
            <div >
              <h1 style={{fontSize: '2.2em'}}>GET IN TOUCH</h1>
              <br></br>
              <h1 style={{ fontSize: '270%' }}>Visit one of our agency location or contact us today</h1>
              <br></br>
              <h3 style={{ fontSize: '170%' }}>Head Office</h3>
              <br></br>
              <div style={{ fontSize: '200%' }}>
                <br></br>
                <EnvironmentFilled />
                &nbsp;
                Aqaba

                <br></br>
                <br></br>
                <MailTwoTone />
                &nbsp;
                contact@bookshop.com
                <br></br>
                <br></br>
                <PhoneTwoTone />
                &nbsp;
                0332 460 567
                <br></br>
                <br></br>
                <ClockCircleTwoTone />
                &nbsp;
                Sunday to Thursday: 8.00 AM to 16.00 PM
              </div>
            </div>

          </section>
        </div>
        <div className="maps">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1852.2086312687252!2d35.01291006708955!3d29.535325926898217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2sjo!4v1696830663222!5m2!1sar!2sjo" width="100%" height="500"></iframe>
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433869.38330790447!2d35.9476308!3d31.83576035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman!5e0!3m2!1sen!2sjo!4v1696549955480!5m2!1sen!2sjo" width="100%" height="500" ></iframe> */}
          {/* width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" */}
        </div>
      </div>
      <div className="mid1">

        <div className="form1">

          <h1 style={{ fontSize: '250%' }}>We love to hear from you</h1>

          <br></br>
          <br></br>
          <br></br>
          <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }} validateMessages={validateMessages}>
            <input type="text" placeholder="Your Name" onChange={(e) => setFullname(e.target.value)} />
            <br></br>
            <br></br>
            <input type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
            <br></br>
            <br></br>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <br></br>
            <br></br>
            <textarea cols="300" rows="10" placeholder="Your Message" onChange={(e) => setMessage(e.target.value)}></textarea>
            <br></br>
            <br></br>
            <button className="normal" onClick={handleSend} >Submit</button>
          </Form>
        </div>
        <div className="contacts">
          <div className="tag1">
            <div className="img1">
              <img src={avt} />
            </div>
            <div className="info-contact">
              <h2 >Ahmad</h2>
              <h3 style={{ color: 'gray' }}>Software Engineer </h3>
              <h3 style={{ color: 'gray' }}>Phone: +1111 11111 11111 </h3>
              <h3 style={{ color: 'gray' }}>Email: contact@bookshop.com</h3>
            </div>
          </div><div className="tag1">
            <div className="img1">
              <img src={avt} />
            </div>
            <div className="info-contact">
              <h2>Ali</h2>
              <h3 style={{ color: 'gray' }}>Software Engineer </h3>
              <h3 style={{ color: 'gray' }}>Phone: +1111 11111 11111 </h3>
              <h3 style={{ color: 'gray' }}>Email: contact@bookshop.com</h3>
            </div>
          </div>
          <div className="tag1">
            <div className="img1">
              <img src={avt} />
            </div>
            <div className="info-contact">
              <h2 >Khaled</h2>
              <h3 style={{ color: 'gray' }}>Software Engineer </h3>
              <h3 style={{ color: 'gray' }}>Phone: +1111 11111 11111 </h3>
              <h3 style={{ color: 'gray' }}>Email: contact@bookshop.com</h3>
            </div>
          </div>
          <div className="tag1">
            <div className="img1">
              <img src={avt} />
              {/* acbbb */}
            </div>
            <div className="info-contact">
              <h2>Tariq</h2>
              <h3 style={{ color: 'gray' }}>Software Engineer </h3>
              <h3 style={{ color: 'gray' }}>Phone: +1111 11111 11111 </h3>
              <h3 style={{ color: 'gray' }}>Email: contact@bookshop.com</h3>
            </div>
          </div>

        </div>

      </div>
      <br></br>
      <br></br>

    </div>
  </>
);
}

export default Contact;