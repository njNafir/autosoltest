import { React, useEffect, useState } from 'react';
import { Layout, Form, Input, Button } from "antd";
import { SiteFooter } from '../snippets/footer';
import { SiteHeader } from '../snippets/header';
import Cookies from 'universal-cookie';

const {Header, Content } = Layout;

export default function ContactPage() {
  const cookies = new Cookies();

  const [pageContent, setPageContent] = useState({});
  const backendProps = cookies.get('backendProps') || {domain:''}

  useEffect(() => {
    fetch(backendProps.domain + "/api/blog/pages/contact/", {
        method: "GET"
    })
      .then((res) => res.json())
      .then((contact_page_content) => {
        let page_data = contact_page_content[0]

        const head_buff = new Buffer(page_data.page_head, 'base64')
        page_data.page_head = <div dangerouslySetInnerHTML={{ __html: head_buff.toString('ascii') }} />

        const main_buff = new Buffer(page_data.page_main, 'base64')
        page_data.page_main = <div dangerouslySetInnerHTML={{ __html: main_buff.toString('ascii') }} />

        const footer_buff = new Buffer(page_data.page_footer, 'base64')
        page_data.page_footer = <div dangerouslySetInnerHTML={{ __html: footer_buff.toString('ascii') }} />

        console.log(page_data)
        setPageContent(page_data)
      })

  }, []);

  const submitContactForm = function (values: object) {
    console.log('Submit contact form ', values)

    fetch(backendProps.domain + "/api/blog/contacts/", {
        method: "POST",
        body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
      })

  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <div>
        <Layout className="site-layout-background">
            <Header>
                {SiteHeader()}
            </Header>
            <Content style={{'margin': '48px 48px'}}>
                <div className="about-head" style={{'textAlign': 'left'}}>
                    {pageContent.page_head}
                </div>
                <div className="about-main" style={{'textAlign': 'left'}}>
                    {pageContent.page_main}
                </div>
                <div className="about-footer" style={{'textAlign': 'left'}}>
                    {pageContent.page_footer}
                </div>
                <div className="contact-form">
                    <div style={{'textAlign': 'center', 'width': '100%', 'margin': '96px 0'}}>
                        <div style={{'display': 'inline-block'}}>
                            <Form name="contact-form" {...layout} onFinish={submitContactForm} validateMessages="Email format not matched">
                                <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
                                    <Input style={{'width': '372px'}}/>
                                </Form.Item>
                                <Form.Item name='subject' label='Subject' rules={[{ required: true, type: 'string' }]}>
                                    <Input style={{'width': '372px'}}/>
                                </Form.Item>
                                <Form.Item name='content' label='Message' rules={[{ required: true, type: 'string' }]}>
                                    <Input.TextArea style={{'width': '372px'}} rows={6}/>
                                </Form.Item>
                                <Form.Item style={{'textAlign': 'right'}}>
                                    <Button type="primary" htmlType="submit">
                                        Sent Message
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
            {SiteFooter({})}
        </Layout>
    </div>
  );
}
