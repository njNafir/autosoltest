import { React, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button, Layout, Row, Col } from "antd";
import { SiteFooter } from '../snippets/footer';
import { SiteHeader } from '../snippets/header';
import Cookies from 'universal-cookie';

const { Header, Content } = Layout;


export default function ContentForIndustry() {    
  const cookies = new Cookies();

  const { industry_name } = useParams();
  
  const [homePagePosts, setHomePagePosts] = useState("");

  const backendProps = cookies.get('backendProps') || {'domain':''};
  const siteMetaProps = cookies.get('siteMetaInfo') || {};


  useEffect(() => {

    fetch(backendProps.domain + "/api/blog/industry/posts/", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            industry_name: industry_name
        })
    })
      .then((res) => res.json())
      .then((objects) => {

        console.log('Blog in industry', objects)

        let mappedObject = []
        let mappedTrendingObjects = []

        let trending_objects = objects.slice(0, 6);

        trending_objects.map((object) => {

          mappedTrendingObjects.push(<Col span={8}>
            <div style={{'margin': '16px'}}>
                <Row>
                    <Col span={4}>
                        <img src=""/>
                        <span>{object.author}</span>
                    </Col>
                    <Col span={20}>
                        <div style={{'textAlign': 'left'}}>
                            <h6>{object.title}</h6>
                            <span>{object.meta_title}</span>
                            <p>{object.summary}</p>
                            <span>{object.create_date}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>)

        })

        setHomePagePosts(mappedTrendingObjects)

      })
    
  }, []);

  return (
    <div Component>
      <Layout className="site-layout-background">
        <Header>
          {SiteHeader()}
        </Header>
        <Content>
          <Row>
            <Col span={12} style={{'padding': 48}}>
              <div style={{'textAlign': 'left'}}>
                <h1 style={{'fontSize': 52}}>{siteMetaProps.home_header}</h1>
                <p style={{'fontSize': 18}}>{siteMetaProps.home_summary}</p>
                <Link to="/signup"><Button type="ghost" size="large" style={{'margin': "12px 0"}}>Get Started</Button></Link>
              </div>
            </Col>
            <Col span={12}>
              <img src="/blogging.jpg" style={{'width': '100%'}}></img>
            </Col>
          </Row>
          <div>
              <div className="pop">
                  <Row style={{'margin': '72px 32px 48px 32px'}}>
                    <div style={{'textAlign': 'left', 'margin': '0 32px 0 32px'}}>
                      <h2>{siteMetaProps.popular_post_title}</h2>
                      <p>{siteMetaProps.popular_post_summary}</p>
                    </div>
                  </Row>
                  <Row style={{'margin': '72px 32px 48px 32px'}}>
                      {homePagePosts}
                  </Row>
              </div>
          </div>
        </Content>
        {SiteFooter()}
      </Layout>
    </div>
  );
}
