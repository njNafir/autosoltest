import {Component, React, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Layout, Row, Col } from "antd";
// import { FormComponent } from '../../snippets/formComponent.js'
import { LikeOutlined, HeartTwoTone, ShareAltOutlined } from '@ant-design/icons';
import {IssuePage} from "../../ticket/IssuePage.js";

const {Header, Footer, Content, Sider} = Layout;

export default function ContentDetail() {

  const [allContent, setAllContent] = useState("");

  const lContent = function (props) {
    console.log(props)

    fetch("http://127.0.0.1:8000/api/models/", {
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
        console.log(jsonResponse)
      })

  }

  const hContent = function (props) {
    console.log(props)

    fetch("http://127.0.0.1:8000/api/models/", {
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
        console.log(jsonResponse)
      })

  }

  const sContent = function (props) {

    console.log(props)

  }

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/models/", {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        }
    })
      .then((res) => res.json())
      .then((objects) => {

        let mappedObject = []

        console.log(objects)

        objects.map((object) => {

          mappedObject.push(<section>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <LikeOutlined onClick={() => {
                  lContent(objects)
                }}/>,
                <HeartTwoTone onClick {() => {
                  hContent(objects)
                }}/>,
                <div>
                  {/* <Popover
                    content={<a onClick={this.hide}>Close</a>}
                    title="Title"
                    trigger="click"
                    visible={false}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <Button type="primary">Click me</Button>
                  </Popover> */}
                  <ShareAltOutlined onClick {() => {sContent(objects)}}/>
                </div>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Content title"
                description="Brief description about content"
              />
            </Card>
          </section>)

        })

        setAllContent(mappedObject)

      })

  }, []);

  return (
    <div Component>
      <Layout className="site-layout-background">
        <Sider></Sider>
        <Content>
          {allContent}
        </Content>
        <Sider></Sider>
        </Layout>
    </div>
  );
}
