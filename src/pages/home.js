import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Layout, Row, Col, Card, Avatar, Menu, List } from "antd";
import { LikeOutlined, HeartTwoTone, ShareAltOutlined, FacebookFilled, TwitterOutlined, DribbbleOutlined, LinkedinFilled } from '@ant-design/icons';
import { SiteFooter } from '../snippets/footer';
import { SiteHeader } from '../snippets/header';
import Cookies from 'universal-cookie';

const {Header, Footer, Content, Sider} = Layout;


export default function HomePage() {
  const cookies = new Cookies();

  // console.log('Loged In User', cookies.get('currentUser'))

  // const [allContent, setAllContent] = useState("");
  const [industriesPermalink, setIndustriesPermalink] = useState("");
  const [interestsPermalink, setInterestsPermalink] = useState("");

  const [popularPosts, setPopularPosts] = useState("");
  const [homePagePosts, setHomePagePosts] = useState("");

  const backendProps = cookies.get('backendProps') || {'domain':''};
  const siteMetaProps = cookies.get('siteMetaInfo') || {};

  // console.log('From Home', siteMetaProps)

  const lContent = function (props) {
    // console.log(props)

    fetch(backendProps.domain + "/api/blog/posts/", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id_slug: props._id_slug
        })
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        // console.log(jsonResponse)
      })

  }

  const hContent = function (props) {
    // console.log(props)

    fetch(backendProps.domain + "/api/models/", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id_slug: props._id_slug
        })
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        // console.log(jsonResponse)
      })

  }

  const sContent = function (props) {

    // console.log(props)

  }

  useEffect(() => {

    let mappedTrendingObjects = []

    fetch(backendProps.domain + "/api/blog/posts/popular/", {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        }
    })
      .then((res) => res.json())
      .then((objects) => {

        let mappedObject = []
        let mappedTrendingObjects = []

        let trending_objects = objects.slice(0, siteMetaProps.total_popular_post);

        trending_objects.map((object) => {

          const link_to = object.id + '/' + object._id_slug

          const splited_create_date = object.create_date.split('T')

          console.log(object.create_date, typeof object.create_date, splited_create_date)

          mappedTrendingObjects.push(<Col span={8} key={object._id_slug}>
            <div style={{'margin': '16px'}}>
                <Row>
                    <Col span={3}>
                      <img
                        src={backendProps.domain +
                          '/media/' + object.author__profile_picture}
                        style={{width: 24, margin: 12, borderRadius: 50}}
                        /><br></br>
                      <span>{object.author__first_name + ' ' + object.author__last_name}</span><br></br>
                      <span>{object.author__title}</span>
                    </Col>
                    <Col span={20}>
                        <div style={{textAlign: 'left', margin: '0 24px 24px 24px'}}>
                            <a href={ link_to }><h2>{object.title}</h2></a>
                            <span style={{ fontWeight: 'bold' }}>{object.meta_title}</span>
                            <p>{ object.summary.slice(0, 172) }.. <a href={link_to}>More</a></p>
                            <span>{ 'Publish: ' + splited_create_date[0] + ' ' + splited_create_date[1].split('.')[0] }</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>)

        })

        setPopularPosts(mappedTrendingObjects)

      })

  }, [])

  useEffect(() => {

    fetch(backendProps.domain + "/api/blog/posts/", {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        }
    })
      .then((res) => res.json())
      .then((objects) => {

        let mappedObject = []

        objects.map((object) => {

        const link_to = "/" + object.author + "/" + object._id_slug + "/"
        const link_to_url = window.location.origin + link_to

        object.summary = object.summary + object.summary

        mappedObject.push(<Row style={{margin: '32px 48px 32px 48px'}} key={object._id_slug}>
            <Col span={3}>
                <img src={object.author_profile_picture} style={{width: 24, margin: 12, borderRadius: 50}}/><br></br>
                <span>{object.author_first_name + ' ' + object.author_last_name}</span><br></br>
                <span>{object.author_title}</span>
            </Col>
            <Col span={16} style={{'textAlign': 'left'}}>
                <Link
                  to={link_to}
                ><h2>{object.title}</h2></Link>
                <span style={{ fontWeight: 'bold' }}>{object.meta_title}</span>
                <p>{ object.summary.slice(0, 292) }.. <a href={link_to}>More</a></p>
            </Col>
            <Col span={5}>
                <div style={{'margin': '12px 0 12px 0'}}>
                    <img src="/blogging.jpg" style={{'width': '212px', borderRadius: 3}}/>
                </div>
                <div>
                    <ul className="social-icons" style={{'textAlign': 'right'}}>
                        <li key="1"><a className="facebook" href={ "https://www.facebook.com/sharer/sharer.php?u=" + link_to_url } target="_blank"><FacebookFilled /></a></li>
                        <li key="2"><a className="twitter" href={ "https://twitter.com/intent/tweet?text=" + link_to_url } target="_blank"><TwitterOutlined /></a></li>
                        <li key="3"><a className="linkedin" href={ "https://www.linkedin.com/sharing/share-offsite/?url=" + link_to_url } target="_blank"><LinkedinFilled /></a></li>
                    </ul>
                </div>
            </Col>
        </Row>)

        })

        setHomePagePosts(mappedObject)

      })


      const interest_url = backendProps.domain + "/api/blog/interests/";

      fetch(interest_url, {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((objects) => {

          const interests_perm = []

          objects.map((object) => {
            const interest_permalink = "/interest/" + object.title.replace(' ', '-') + "/";
            interests_perm.push(<li key={object._id_slug}><a href={interest_permalink}>{object.title}</a></li>)
          })

          setInterestsPermalink(interests_perm)

        })

  }, []);

  return (
    <div>
      <Layout className="site-layout-background">
        <Header>
          {SiteHeader()}
        </Header>
        <Content style={{ borderTop: '1px solid #40A9FF', borderBottom: '3px solid yellow' }}>
          <Row style={{ borderBottom: '2px solid #ffffff' }}>
            <Col span={12} style={{'padding': 48}}>
              <div style={{'textAlign': 'left'}} className="homeContentHead">
                <h1 style={{'fontSize': 52, 'padding': '32px 0'}}>{siteMetaProps.home_header}</h1>
                <p style={{'fontSize': 18}}>{siteMetaProps.home_summary}</p>
                <Link to="/signup"><Button type="ghost" size="large" style={{'margin': "24px 0"}}>Get Started</Button></Link>
              </div>
            </Col>
            <Col span={12}>
              <img src="/blogging.jpg" style={{'width': '100%'}}></img>
            </Col>
          </Row>
          <div>
              <div className="pop" style={{ backgroundColor: "#ECEDF0", padding: "48px 0" }}>
                  <Row style={{'padding': '72px 32px 48px 32px'}}>
                    <div style={{'textAlign': 'left', 'margin': '0 32px 0 32px'}}>
                      <h2>{siteMetaProps.popular_post_title}</h2>
                      <p>{siteMetaProps.popular_post_summary}</p>
                    </div>
                  </Row>
                  <Row style={{'padding': '0 32px 48px 32px'}}>
                      {popularPosts}
                  </Row>
              </div>
              <div className="pop_devider"></div>
              <div className="contents">
                  <Layout style={{ backgroundColor: "#FAFAFA", borderTop: '1px solid #40A9FF' }}>
                      <Content style={{ margin: '72px 0' }}>
                          {homePagePosts}
                      </Content>
                      <Sider style={{'backgroundColor': 'white', padding: '72px 0'}}>
                        <List
                          size="small"
                          header={<div><h3>Interest over time</h3></div>}
                          footer={<div></div>}
                          dataSource={interestsPermalink}
                          renderItem={item => <List.Item>{item}</List.Item>}
                        />
                      </Sider>
                  </Layout>
              </div>
          </div>
        </Content>
        {SiteFooter()}
      </Layout>
    </div>
  );
}
