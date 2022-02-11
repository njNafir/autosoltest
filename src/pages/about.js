import { React, useEffect, useState } from 'react';
import { Layout } from "antd";
import { SiteFooter } from '../snippets/footer';
import { SiteHeader } from '../snippets/header';
import Cookies from 'universal-cookie';

const {Header, Footer, Content } = Layout;

export default function AboutPage() {
  const cookies = new Cookies();

  const [pageContent, setPageContent] = useState({});
  const backendProps = cookies.get('backendProps') || {domain: ''}

  useEffect(() => {
    fetch(backendProps.domain + "/api/blog/pages/about/", {
        method: "GET"
    })
      .then((res) => res.json())
      .then((about_page_content) => {
          let page_data = about_page_content[0]

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
            </Content>
            {SiteFooter({})}
        </Layout>
    </div>
  );
}
