
import { useEffect, useState } from 'react';
import { FacebookFilled, TwitterOutlined, DribbbleOutlined, LinkedinFilled } from '@ant-design/icons';
import { Row, Col, Form, Input, Button } from "antd";
import Cookies from 'universal-cookie';


export function SiteFooter(props) {
  const cookies = new Cookies();
  const props_values = props || {};
  const backendProps = cookies.get('backendProps') || {domain:''};
  const siteMetaINfo = cookies.get('siteMetaInfo') || {};

  const socialLinks = siteMetaINfo.social_links || {};

  const [quickLinks, setQuickLinks] = useState([]);
  const [industryLinks, setIndustryLinks] = useState([]);

  const submitNewsletterSubscribe = function (values: object) {}

  useEffect(() => {

    const metaQuickLinks = siteMetaINfo.quick_links || [];

    let mapQLink = [];
    metaQuickLinks.map((object) => {
        mapQLink.push(<li key={object.title}><a href={object.url}>{object.title}</a></li>)
    })

    setQuickLinks(mapQLink)

    const metaIndustryLinks = siteMetaINfo.top_industries || [];

    let mapILink = [];
    metaIndustryLinks.map((object) => {
        mapILink.push(<li key={object.title}><a href={ object.url }>{object.title}</a></li>)
    })

    setIndustryLinks(mapILink)

  }, [])

  return (
    <footer className="site-footer">
        <div style={{'padding': '32px'}}>
        <Row gutter={{ sm: 12, md: 24 }}>
            <Col span={9}>
                <h6>About</h6>
                <p className="text-justify">{siteMetaINfo.about}</p>
            </Col>

            <Col span={5}>
                <h6>Top Industries</h6>
                <ul className="footer-links">
                    {industryLinks}
                </ul>
            </Col>

            <Col span={5}>
                <h6>Quick Links</h6>
                <ul className="footer-links">
                    {quickLinks}
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
            <p className="copyright-text">{siteMetaINfo.copyright} ©2020 Created by <a href="https://circledi.com">CircleDi</a>.
            </p>
            </Col>

            <Col span={12}>
            <ul className="social-icons">
                <li key="1"><a className="facebook" target="_blank" href={socialLinks.facebook}><FacebookFilled /></a></li>
                <li key="2"><a className="twitter" target="_blank" href={socialLinks.twitter}><TwitterOutlined /></a></li>
                <li key="3"><a className="dribbble" target="_blank" href={socialLinks.dribble}><DribbbleOutlined /></a></li>
                <li key="4"><a className="linkedin" target="_blank" href={socialLinks.linkedin}><LinkedinFilled /></a></li>
            </ul>
            </Col>
        </Row>
        </div>
    </footer>
  );
}
