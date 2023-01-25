import {Component, React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button, Layout, Form, Row, Col, Select, message } from "antd";
import { FormComponent } from '../../snippets/formComponent.js'
import Cookies from 'universal-cookie';
import { SiteFooter } from '../../snippets/footer';
import { SiteHeader } from '../../snippets/header';

const {Header, Content, Sider} = Layout;

export default function Register() {

  const cookies = new Cookies();
  const backendProps = cookies.get('backendProps') || {domain:''}

  const registerSubmit = (values: object) => {

    fetch(backendProps.domain + "/api/blog/signup", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((signupData) => {

        if (signupData.errors === undefined) {
            return window.location.href = "/login";
        } else {
            // console.log("success", signupData);
            Object.entries(signupData.errors).map(([k, v]) => {
                message.error(v[0])
            })
        }

      }).catch(function(error) {
          // console.log("error", error);
      });;
  }

  return (
  <div Component>
    <Header className="site-layout">
        {SiteHeader()}
    </Header>
    <Layout className="site-layout-background">
      <Sider></Sider>
      <Content style={{'margin': '48px 48px'}}>
        <Form name="Register Form"
              labelCol={{'span': 7}}
              wrapperCol= {{'span': 17}}
              onFinish={registerSubmit}
              style={{'margin': '48px 24px 48px 24px'}}>
          <Row gutter={24}>

            {/* title, site_title, email, first_name, last_name, gender, country, industry, interest, goals, stage,
            custom_interest */}

              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true, type: "string" }]}>
                  {FormComponent({'name': 'text', 'text': 'First Name', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name">
                  {FormComponent({'name': 'text', 'text': 'Last Name', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}>
                  {FormComponent({'name': 'email', 'text': 'Email address', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}>
                  {FormComponent({'name': 'password', 'text': 'Password', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="password2"
                  rules={[{ required: true }]}>
                  {FormComponent({'name': 'password', 'text': 'Confirm Password', 'style': {'margin': 0}})}
                </Form.Item>
              </Col>

          </Row>
          <Row>
              <Col span={24} style={{ textAlign: 'center', marginTop: 24 }}>
                  <Button type="primary" htmlType="submit">
                      Register
                  </Button>
              </Col>
          </Row>
        </Form>
        <p style={{'margin': "32px 0 0 0"}}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </Content>
      <Sider></Sider>
    </Layout>
    {SiteFooter({})}
  </div>
  );
}
