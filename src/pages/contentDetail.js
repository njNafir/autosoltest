 
import {Component, React, useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";
import { Button, Form, Layout, Row, Col, Card, Meta, Avatar, Menu, Tag } from "antd";
// import { FormComponent } from '../../snippets/formComponent.js'
import { LikeOutlined, HeartTwoTone, ShareAltOutlined, FacebookFilled, TwitterOutlined, DribbbleOutlined, LinkedinFilled } from '@ant-design/icons';
import parse from 'html-react-parser';
import { FormComponent } from '../snippets/formComponent.js';
import { SiteFooter } from '../snippets/footer.js';
import { SiteHeader } from '../snippets/header.js';
import Cookies from 'universal-cookie';

const {Header, Footer, Content, Sider} = Layout;


export default function ContentDetail() {

  const {
    username,
    slug,
  } = useParams();

  // const [allContent, setAllContent] = useState("");
  // const [siteTitle, setSiteTitle] = useState("");
  // const [siteDetail, setSiteDetail] = useState("");

  const cookies = new Cookies();

  const [postDetail, setPostDetail] = useState({});
  const [recentPosts, setRecentPosts] = useState("");
  const [allComment, setAllComment] = useState(""); 
  const [likeCount, setLikeCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);

  const backendProps = cookies.get('backendProps') || {domain:''}


  const likePost = function (props) {
    console.log(props)

    fetch(backendProps.domain + "/api/blog/post/like/", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          new: true,
          post: props.id,
          like_by: 1
        })
    })
      .then((res) => res.json())
      .then((like) => {
        console.log('Like', like)
        setLikeCount(like.like_count)
      })
  }


  const favouritePost = function (props) {
    console.log(props)

    fetch(backendProps.domain + "/api/blog/post/heart/", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          new: true,
          post: props.id,
          heart_by: 1
        })
    })
      .then((res) => res.json())
      .then((heart) => {
        console.log('Heart', heart)
        setHeartCount(heart.favourite_count)
      })
  }


  const sContent = function (props) {

    console.log(props)

  }


  useEffect(() => {

    const post_details = backendProps.domain + "/api/blog/posts/" + slug + "/"

    fetch(post_details, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((object) => {
        console.log(object)

        let buff = new Buffer(object.content, 'base64')
        object.content = parse(buff.toString('ascii'))

        setPostDetail(object)
        setLikeCount(object.like_count)
        setHeartCount(object.favourite_count)

        fetch(backendProps.domain + "/api/blog/post/view/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            post: object.id,
            viewed_by: 1
          })
        })
          .then((res) => res.json())
          .then((postview) => {
            console.log('Viewed result', postview)
          })


        const comments_url = backendProps.domain + "/api/blog/comments/post/" + object.id + "/"

        fetch(comments_url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((objects) => {
            console.log(objects)

            let comments = []

            objects.map((comment) => {
              comments.push(<Row>
                {/* <Col span={3}>
                  <img src="/blogging.jpg" style={{'width': '32px', 'borderRadius': '50%'}}/>
                  <br></br>
                  <span>John Due</span>
                </Col> */}
                <Col span={19}>
                  <p>{comment.content}</p>
                </Col>
              </Row>)
            })

            setAllComment(comments)

          })

      })


    fetch(backendProps.domain + "/api/blog/posts/", {
      method: "GET",
      header: {
          'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((objects) => {

        let mappedRecentObjects = []

        let recent_categorised_objects = objects.slice(0, 6);

        recent_categorised_objects.map((object) => {

          mappedRecentObjects.push(<Col span={6} style={{'padding': '12px'}}>
          <Row>
            <Col span={7}>
              <img src="/blogging.jpg" style={{'width': '100%'}}/>
            </Col>
            <Col span={17}>
              <div style={{'textAlign': 'left', 'padding': '0 12px'}}>
                <h6>{object.title}</h6>
                <span>{object.meta_title}</span>
                <p>{object.summary}</p>
              </div>
              <div>
                <img src="/blogging.jpg" style={{'width': '32px', 'borderRadius': '50%', 'paddingRight': '8px'}}/>
                <span>{object.author_first_name} {object.author_last_name}</span>
              </div>
            </Col>
          </Row>            
          </Col>)

        })
        
        setRecentPosts(mappedRecentObjects)

        })

  }, []);


  const addRespond = (values: object) => {
    const comments_url = backendProps.domain + "/api/blog/comments/"

    values.post = postDetail.id

    fetch(
      comments_url, {
        method: "POST",
        body: JSON.stringify(values)
      }
    )
      .then((res) => res.json())
      .then((addedData) => {
        console.log(addedData)
      })

  };
  
  const sharerButton = <div className="shab">
  <Button type="ghost"><a class="facebook" href={ "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href } target="_blank"><FacebookFilled /></a></Button>
  <Button type="ghost"><a class="twitter" href="https://twitter.com/intent/tweet" target="_blank"><TwitterOutlined /></a></Button>
  <Button type="ghost"><a class="linkedin" href={ "https://www.linkedin.com/sharing/share-offsite/?url=" + window.location.href }><LinkedinFilled /></a></Button>
</div>

  return (
    <div Component>
      <Layout className="site-layout-background">
        <Header>
          {SiteHeader()}
        </Header>
        <Layout style={{'padding': '56px'}}>
          <Sider style={{'backgroundColor': '#F0F2F5', 'padding': 8}}>
            <h2>{postDetail.title}</h2>
            <p style={{'textAlign': 'left'}}>{postDetail.content}</p>
            <Button type="dashed">Follow</Button><br></br>
            <span style={{'margin': '32px'}} onClick={() => {likePost(postDetail)}}><LikeOutlined  style={{'margin': '16px', 'cursor': 'pointer'}}/>{likeCount}</span><br></br>
            <span style={{'padding': '16px'}} onClick={() => {favouritePost(postDetail)}}><HeartTwoTone  style={{'margin': '16px', 'cursor': 'pointer'}}/>{heartCount}</span><br></br>

            {sharerButton}
          </Sider>
          <Content style={{'padding': '48px 48px', 'textAlign': 'left'}}>
            <div className="issue-head">
              <Row>
                <Col>
                  <h1>{postDetail.title}</h1>
                  <h2>{postDetail.meta_title}</h2>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <Row>
                    <Col span={3} style={{'padding': '24px 12px'}}>
                      <img src={postDetail.author_profile_picture} style={{'width': '48px', 'height': '48px', 'borderRadius': '50%'}}/>
                    </Col>
                    <Col span={21} style={{'padding': '24px 12px', 'textAlign': 'left'}}>
                      <h4>{postDetail.author_first_name} {postDetail.author_last_name}</h4>
                      <span>{postDetail.author_title}</span>
                    </Col>
                  </Row>
                </Col>
                <Col span={8} style={{'padding': '24px 12px'}}>
                  <div>
                    <Button type="link"><a class="facebook" href="#"><FacebookFilled /></a></Button>
                    <Button type="link"><a class="facebook" href="#"><TwitterOutlined /></a></Button>
                    <Button type="link"><a class="facebook" href="#"><LinkedinFilled /></a></Button>
                  </div>
                </Col>
              </Row>
              <Row style={{'padding': '32px 0'}}>
                <img src="/blogging.jpg" style={{'width': '100%'}}/>
              </Row>
            </div>
            <div className="issue-content">
              <p>{postDetail.summary}</p>
              <p>{postDetail.content}</p>
            </div>
            <div className="issue-content-foot" style={{'padding': '48px 12px'}}>
              <Row>
                <Col span={18}>
                  <Tag color="cyan">First</Tag>
                  <Tag color="cyan">Second</Tag>
                  <Tag color="cyan">Third</Tag>
                  <Tag color="cyan">Forth</Tag>
                  <Tag color="cyan">Fifth</Tag>
                </Col>
                <Col span={6} style={{'textAlign': 'right'}}>
                  {sharerButton}
                </Col>
              </Row>
            </div>
            <div className="issue-comm">
              <div className="mcomm">
                {allComment}
              </div>
              <Form
                  name="Comment form"
                  labelCol={{'span': 4}}
                  wrapperCol= {{'span': 20}}
                  onFinish={addRespond}
                  >
                  <Row>
                    <Col span={24}>
                      <Form.Item 
                        name="content"
                        rules={[{ required: true, message: "Enter valid response", type: 'string' }]}>
                          {FormComponent({'name': 'textarea', 'style': {'margin': '48px 0 0 0'}})}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20} style={{ textAlign: 'right' }}>
                      <Button type="primary" htmlType="submit">
                          Respond
                      </Button>
                    </Col>
                  </Row>                      
              </Form>
            </div>
          </Content>
        </Layout>
        <div className="issue-recent" style={{'padding': '48px'}}>
          <Row>
            {recentPosts}
          </Row>
        </div>
        {SiteFooter({})}
      </Layout>
    </div>
  );
}
