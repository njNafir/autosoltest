
import { useEffect } from 'react';
import { FacebookFilled, TwitterOutlined, DribbbleOutlined, LinkedinFilled } from '@ant-design/icons';
import { Row, Col, Form, Input, Button } from "antd";


export function SiteFooter(props) {
  const props_values = props || {};

  const submitNewsletterSubscribe = function (values: object) {}

  useEffect(() => {

  }, [])

  return (
    <footer className="site-footer">
        <div style={{'padding': '32px'}}>
        <Row gutter={{ sm: 12, md: 24 }}>
            <Col span={10}>
                <h6>About</h6>
                <p className="text-justify">Loram</p>
            </Col>

            <Col span={5}>
                <h6>Quick Links</h6>
                <ul className="footer-links">
                </ul>
            </Col>

            <Col span={5}>
                <h6>Newsletter</h6>
                <Form name="newsletter-subscribe" onFinish={submitNewsletterSubscribe} validateMessages="Email format not matched">
                    <Form.Item name='email' rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Subscribe
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        <hr></hr>
        </div>

        <div style={{'padding': '32px'}}>
        <Row gutter={{ sm: 12, md: 24 }}>
            <Col span={12}>
            <p className="copyright-text">©2022 Created by <a href="https://njnafir.com">NJ Nafir</a>.
            </p>
            </Col>

            <Col span={12}>
            <ul className="social-icons">
                <li key="1"><a className="facebook" target="_blank" href="#"><FacebookFilled /></a></li>
                <li key="2"><a className="twitter" target="_blank" href="#"><TwitterOutlined /></a></li>
                <li key="3"><a className="dribbble" target="_blank" href="#"><DribbbleOutlined /></a></li>
                <li key="4"><a className="linkedin" target="_blank" href="#"><LinkedinFilled /></a></li>
            </ul>
            </Col>
        </Row>
        </div>
    </footer>
  );
}
