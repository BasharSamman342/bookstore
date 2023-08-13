"use client";

import {Col, Row, Typography, Alert, Image, Form, Input, Button, Space, notification} from "antd";
import Link from "next/link";

import {useState} from "react";
import { signIn,SignInResponse } from "next-auth/react";
import {login} from "@/app/[locale]/(auth)/Authentication";


function Login() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
    const [api,contex] = notification.useNotification()
  const onFinish = async (values: any) => {
    setErrors('');
    setLoading(true);
    // await login(values.email,values.password,true,"/en/dashboard")

     await login(values.email, values.password,
          () => setLoading(false),
          (response) => {
              setErrors(response.message);
              setLoading(false);
          }, true
      );
    //  await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // // }).then(({ ok, error }:SignInResponse) => {
    // }).then((response) => {
    //     console.log(response)
      // console.log("error: ", response?.error);
      // console.log("ok: ", response?.ok);
      // if (response?.ok) {
      //    window.location.replace('/en/dashboard');
      // } else {
      //   console.log({
      //     title: "Failed!",
      //     message: "Please check your email or password again",
      //     type: "danger",
      //   });
      //   notification.error({message:"Please check your email or password again"})
      // }
    // });

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row
          align={"middle"}
          justify={"space-between"}
          style={{
            height:"100vh",
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundImage:'url("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60")'
          }}
          className="position-relative"

      >
        <Col span={12}>
        </Col>
        <Col
            style={{
              backgroundColor:"rgba(255,255,255,0.8)",
              width:"100%",
              height:'100vh',
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"center",
              textAlign:"left"
        }}
            span={12}
            className="gutter-row"
            lg={9}
            md={11}
            sm={13}
            xs={18}
            xxl={5}
            xl={7}
        >

          <Typography.Title level={2} className="my-10">
            login
          </Typography.Title>

          {/* <Alert type="error" title={"errors"} /> : ""} */}
          <Form
              layout="vertical"
              size={"large"}
              className="py-10"
              initialValues={{ remember: true, email: "", password: "" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input
                  type="email"
                  autoComplete="email"
                  placeholder={"email"}
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder={"password"} />
            </Form.Item>

            <Form.Item className="mb-10">
              <Button
                  type="primary"
                  // loading={loading}
                  htmlType="submit"
                  className="w-100"
              >
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>
    </>
  );
  //   }
  // return <DefaultPageLoader />;
}

export default Login;
