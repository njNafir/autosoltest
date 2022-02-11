import { React, useEffect, useState } from 'react';
import { Layout, Input, Select, Switch, Form, Button } from "antd";
import { SiteFooter } from '../snippets/footer';
import { SiteHeader } from '../snippets/header';
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';

const {Header, Footer, Content } = Layout;

export default function MyProfile() {
  const { pathname } = useLocation();

  const cookies = new Cookies();
  const loggedInUser = cookies.get('currentUser');
  const  backendProps = cookies.get('backendProps') || {domain:''}

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const submitMyProfileUpdateForm = function (values: object) {
    // console.log(values)
    values.id = loggedInUser.id
    values._id_slug = loggedInUser._id_slug

    fetch(backendProps.domain + "/api/blog/update-my-profile/", {
          method: "POST",
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
      })
        .then((res) => res.json())
        .then((updated_payload) => {
          // console.log(updated_payload)
          cookies.set('currentUser', updated_payload, { path: '/'})
        })
  }

  return (
    <div>
        <Form
          name="myprofile-form"
          {...layout}
          onFinish={submitMyProfileUpdateForm}
          initialValues={{
            'title': loggedInUser.title,
            'site_title': loggedInUser.site_title,
            'email': loggedInUser.email,
            'first_name': loggedInUser.first_name,
            'last_name': loggedInUser.last_name,
            'about': loggedInUser.about,
            'gender': loggedInUser.gender,
            'homepage': loggedInUser.homepage,
            'occupation': loggedInUser.occupation,
            'phone': loggedInUser.phone,
            'city': loggedInUser.city,
            'state': loggedInUser.state,
            'zip_postal_code': loggedInUser.zip_postal_code,
            'country': loggedInUser.country,
            'industry': loggedInUser.industry,
            'interest': loggedInUser.interest,
            'custom_interest': loggedInUser.custom_interest,
            'goals': loggedInUser.goals,
            'stage': loggedInUser.stage,
            'custom_stage': loggedInUser.custom_stage,
            }}
          >
            <Form.Item name='title' label='Title' rules={[{ required: true }]}>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='site_title' label='Site Title' rules={[{ required: true }]}>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true }]}>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='first_name' label='First Name' rules={[{ required: true, type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='last_name' label='Last Name' rules={[{ type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='about' label='About' rules={[{ type: 'string' }]}>
                <Input.TextArea style={{'width': '372px'}} rows={4}/>
            </Form.Item>
            <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
                <Select
                      showSearch
                      style={{ width: 372 }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value='m'>Male</Select.Option>
                      <Select.Option value='f'>Female</Select.Option>
                      <Select.Option value='o'>Other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name='homepage' label='Homepage' rules={[{ type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='occupation' label='Occupation' rules={[{ type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>

            <Form.Item name='phone' label='Phone' rules={[{ required: true, type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='city' label='City' rules={[{ required: true, type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='state' label='State' rules={[{ type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='zip_postal_code' label='Zip/Postal Code' rules={[{ required: true, type: 'string' }]}>
                <Input style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='country' label='Country' rules={[{ required: true, type: 'string' }]}>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>

            <Form.Item name='share_profile' label='Share my profile'>
                <Switch defaultChecked={loggedInUser.share_profile}></Switch>
            </Form.Item>
            <Form.Item name='show_email_address' label='Share email address'>
                <Switch defaultChecked={loggedInUser.show_email_address}></Switch>
            </Form.Item>
            <Form.Item name='show_blogs' label='Publish blogs'>
                <Switch defaultChecked={loggedInUser.show_blogs}></Switch>
            </Form.Item>
            <Form.Item name='show_followed_sites' label='Share my follow list'>
                <Switch defaultChecked={loggedInUser.show_followed_sites}></Switch>
            </Form.Item>
            <Form.Item name='comment_auto_publish' label='Auto publish comment'>
                <Switch defaultChecked={loggedInUser.comment_auto_publish}></Switch>
            </Form.Item>

            <Form.Item name='industry' label='Industry'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='interest' label='Interest'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='custom_interest' label='Custom Interest'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='goals' label='Goals'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='stage' label='Stage'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>
            <Form.Item name='custom_stage' label='Custom Stage'>
                <Input disabled={true} style={{'width': '372px'}}/>
            </Form.Item>

            <Form.Item style={{'textAlign': 'right'}}>
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

// profile_picture = models.ImageField(default="dummy-profile-pic-male1.webp", null=True)
