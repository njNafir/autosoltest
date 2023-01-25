import {Component, React} from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Layout, Row, Col, message } from "antd";
import { FormComponent } from '../../snippets/formComponent.js'
import { SiteFooter } from '../../snippets/footer';
import { SiteHeader } from '../../snippets/header';
import Cookies from 'universal-cookie';

const {Header, Footer, Content, Sider} = Layout;

export default function Login() {
  const cookies = new Cookies();
  const backendProps = cookies.get('backendProps') || {domain: ''}

  const loginSubmit = (values: object) => {

    // console.log(values)

    fetch(backendProps.domain + "/api/blog/login", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((signinData) => {

        console.log(signinData)

        if (signinData.detail === undefined) {
            cookies.set('currentUser', signinData, {'path': '/'})
            return window.location.href = "/admin";
        } else {
            // console.log("success", signupData);
            message.error(signinData.detail)
        }

      }).catch(function(error) {
          // console.log("error", error);
      });
  }

  return (
    <div Component>
      <Header className="site-layout">
          {SiteHeader()}
      </Header>
      <Layout className="site-layout-background">
        <Sider></Sider>
        <Content style={{'margin': '48px 48px'}}>
          <Form name="Login Form"
              labelCol={{'span': 5}}
              wrapperCol= {{'span': 16}}
              onFinish={loginSubmit}
              style={{'margin': '48px 24px 48px 24px'}}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{required: true}]}>
                  {FormComponent({'name': 'email', 'text': 'Email address', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{required: true}]}>
                  {FormComponent({'name': 'password', 'text': 'Password', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'center', marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Col>
            </Row>
          </Form>
          <p style={{'margin': "32px 0 0 0"}}>
            Not have an account? <Link to="/signup">Create One</Link>, Forget password? <Link to="/request-reset-password">Reset</Link>
          </p>
        </Content>
        <Sider></Sider>
        </Layout>
        {SiteFooter({})}
    </div>
  );
}
