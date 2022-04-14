import React,{useState, useContext, useEffect, useRef} from 'react';
import './LoginStyle.css';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import  { Link } from 'react-router-dom'
import { AppContext } from '../../context';

export default function Login(){

  const [loading,setLoading] = useState(false);
	const { dispatchUserEvent } = useContext(AppContext);
  const formRef = useRef(null)

   useEffect(()=>{
      var email = localStorage.getItem("email");
      var password = localStorage.getItem("password");
      if(email && password){

        formRef?.current?.setFieldsValue({
          email: email,
          password: password
        })

      }
   },[])

    const onFinish = (values) => {
    setLoading(true);

    if(values.remember){
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    }
    else {
      localStorage.clear();
    }
    axios.post("https://reqres.in/api/login",{
      email: values.email,
      password: values.password
    }).then((response) => {
       setLoading(false);
       dispatchUserEvent('LOGIN', { token:response.data.token });
    }).catch((err)=>{
      alert(err);
    })
  };

  

  return (
      <div id="container">
    <Form
    ref={formRef}
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
              <h2>Login</h2>

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
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
      <p>Didn't have an account <Link to="/Register">Register</Link></p>

    </Form>
    </div>
  );
};

