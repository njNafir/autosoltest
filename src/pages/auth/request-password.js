import {Component, React} from 'react';
import { Link } from "react-router-dom";
import { Button, Layout, Row, Col, Form } from "antd";
import { FormComponent } from '../../snippets/formComponent.js'
import { SiteFooter } from '../../snippets/footer';
import { SiteHeader } from '../../snippets/header';
import Cookies from 'universal-cookie';

const {Header, Footer, Content, Sider} = Layout;

export default function RequestPassword() {
  const cookies = new Cookies();
  const backendProps = cookies.get('backendProps') || {domain:''}

  const resetRequestSubmit = (values: object) => {

    console.log(values)

    fetch(backendProps.domain + "/api/blog/request-reset-password", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((responseData) => {

        console.log(responseData)

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
          <Form name="Password reset request form"
              labelCol={{'span': 6}}
              wrapperCol= {{'span': 14}}
              onFinish={resetRequestSubmit}
              style={{'margin': '48px 24px 48px 24px'}}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email">
                  {FormComponent({'name': 'email', 'text': 'Email address', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'center', marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">
                        Send Reset Link
                    </Button>
                </Col>
            </Row>
          </Form>
          <p style={{'margin': "32px 0 0 0"}}>
            Go to login page? <Link to="/login">Login</Link>, Create new account? <Link to="/signup">Register</Link>
          </p>
        </Content>
        <Sider></Sider>
        </Layout>
      {SiteFooter({})}
    </div>
  );
}
