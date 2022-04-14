import React, { useState } from 'react';
import '../Login/LoginStyle.css';
import { Form, Input, Button} from 'antd';
import axios from 'axios';
import  { Link, useNavigate } from 'react-router-dom'


export default function Register(){
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();


  const onFinish = (values) => {
    setLoading(true);
    axios.post("https://reqres.in/api/register",{
      email: values.email,
      password: values.password
    }).then((response) => {
       setLoading(false);
       navigate('/Login');
    }).catch((err)=>{
      alert(err);
    })

  };


  return (
      <div id="container">
    <Form
    className='FormContainer'
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
           <h2>Register</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
      <p>Already have an account <Link to="/Login">Login</Link></p>
    </Form>
    </div>
  );
};

