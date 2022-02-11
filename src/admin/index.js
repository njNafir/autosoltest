import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Space, Modal, Form, Row, Col, Card } from 'antd';
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

// import { DatePicker, TimePicker, InputNumber, Checkbox, Switch, Input, Tooltip, Upload, Select } from 'antd';
import { ExclamationCircleOutlined  } from '@ant-design/icons';
import { FormComponent } from '../snippets/formComponent.js';
import DashBoard from '../admin/dashboard.js';
import {getLastMonths} from '../snippets/utils.js';
import ManagePages from '../admin/pages.js';
import MyProfile from "../pages/myProfile.js";

// const strCapital = function(str){
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const createReactClass = require('create-react-class');

const typeConversion = function (value, convert_to) {
    if (convert_to === 'string') {
        return String(value)
    } else if (convert_to === 'number') {
        return Number(value)
    } else if (convert_to === 'boolean') {
        return Boolean(value)
    } else {
        return value
    }
}

const { Header, Content, Footer, Sider } = Layout;

export default function AdminPage () {
    const cookies = new Cookies();
    const loggedInUser = cookies.get('currentUser');
    const backendProps = cookies.get('backendProps') || {domain:''}

    const [form] = Form.useForm();
    const [form_update] = Form.useForm();

    const [aboutPageForm] = Form.useForm();
    const [contactPageForm] = Form.useForm();

    const {confirm} = Modal;

    const [modelDetail, setmodelDetail] = useState("");
    const [layoutHeaderInfo, setLayoutHeaderInfo] = useState("");
    const [modelDetailTableHeader, setModelDetailTableHeader] = useState("");

    const [addRowVisible, setAddRowVisible] = useState(false);
    const [addRowForm, setAddRowForm] = useState("");
    const [addNewRowTitle, setAddNewRowTitle] = useState("");

    const [updateRowVisible, setUpdateRowVisible] = useState(false);
    const [updateRowForm, setUpdateRowForm] = useState("");
    const [updateRowTitle, setUpdateRowTitle] = useState("");

    const [aboutPageContent, setAboutPageContent] = useState({});
    const [contactPageContent, setContactPageContent] = useState({});

    const [editAboutPageVisible, setEditAboutPageVisible] = useState(false);
    const [editContactPageVisible, setEditContactPageVisible] = useState(false);

    // const [updateRowInitialValues, setUpdateRowInitialValues] = useState({});

    const [runningAddNewModelIns, setRunningAddNewModelIns] = useState("");
    const [runningUpdateRowModelIns, setRunningUpdateRowModelIns] = useState("");

    const [modelFieldMap, setModelFieldMap] = useState(cookies.get("modelFieldMap"));

    const [allModelData, setAllModelData] = useState({});

    const Iframe = createReactClass({
        render: function() {
          return(
            <div>
              <iframe src={this.props.src} height={this.props.height} width={this.props.width}/>
            </div>
          )
        }
    });

    const addNewSubmit = (values: object) => {
        const base_url = runningAddNewModelIns.base_url

        if (base_url == "posts") {
            let content = values.content
            let buff = new Buffer(content)
            values.content = buff.toString('base64')
        }

        const model_data_url = backendProps.domain + "/api/" + runningAddNewModelIns.app_level + "/" + base_url + "/"

        fetch(
            model_data_url, {
                method: "POST",
                body: JSON.stringify(values)
            }
        )
          .then((res) => res.json())
          .then((addedData) => {
            // console.log(addedData)
          })

    };

    const addNewRow = function (modelInstance) {

        setRunningAddNewModelIns(modelInstance)

        let columns = []

        Object.entries(modelFieldMap[modelInstance.base_url]).map(([key, value]) => {
            if (value.show_create || value.show_create == null || value.show_create === null) {
                const field_n = value.field
                const title = value.name
                const model = value.model
                const model_to = value.to

                const props = {'name': field_n, 'text': title, 'style': {'margin': 0}}

                if (field_n == 'select' || field_n == 'multiselect') {
                    props.options = []
                    // props.key = model + model_to + title

                    // console.log(allModelData[model])

                    if (value.options) {
                        value.options.map((object) => {
                            props.options.push({
                                _id_slug: object.tag,
                                __str__: object.text
                            })
                        })
                    } else {
                        allModelData[model].map((object) => {
                            props.options.push({
                                _id_slug: object.id,
                                __str__: object[model_to]
                            })
                        })
                    }
                }

                if (field_n == "texteditor") {
                    columns.push(<Col span={value.col} key={field_n}>
                        <Form.Item
                            label={title}
                            name={key}
                            valuePropName='data'
                            getValueFromEvent={(event, editor) => {
                                const data = editor.getData();
                                return data;
                            }}
                            rules={[{ required: value.required, message: value.message }]}>
                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                        </Form.Item>
                    </Col>)
                } else {
                    columns.push(<Col span={value.col} key={field_n}>
                        <Form.Item
                            name={key}
                            label={title}
                            rules={[{ required: value.required, message: value.message, type: value.type }]}>
                                {FormComponent(props)}
                        </Form.Item>
                    </Col>)
                }
            }
        })

        setAddNewRowTitle(<span>Add new data to {modelInstance.title} table</span>)
        setAddRowForm(columns)
        setAddRowVisible(true)
    }

    const updateRowSubmit = function (values: object) {
        // console.log(values)
        // // console.log(runningUpdateRowModelIns)

        const model_data_update_url = backendProps.domain + "/api/" + runningAddNewModelIns.app_level + "/" + runningAddNewModelIns.base_url + "/" + runningUpdateRowModelIns.record._id_slug + "/"

        fetch(
            model_data_update_url, {
                method: "PUT",
                body: JSON.stringify(values)
            }
        )
          .then((res) => res.json())
          .then((updatedData) => {
            // console.log(updatedData)
          })
    }

    const updateRow = function (modelInstance, record) {
        const runningUpdateRow = {
            model: modelInstance,
            record: record
        }
        // // console.log(modelInstance, record)
        setRunningUpdateRowModelIns(runningUpdateRow)

        let columns = []
        let form_update_values = {}

        Object.entries(modelFieldMap[modelInstance.base_url]).map(([key, value]) => {
            if (value.show_create || value.show_create == null || value.show_create === null) {

                const field_n = value.field
                const title = value.name

                const props = {'name': field_n, 'text': title, 'style': {'margin': 0}, 'value': record[key]}

                if (field_n == 'select' || field_n == 'multiselect') {
                    props.options = []
                }

                form_update_values[key] = typeConversion(record[key], value.type)

                columns.push(<Col span={value.col} key={field_n}>
                    <Form.Item
                        name={key}
                        label={title}
                        rules={[{ required: value.required, message: value.message, type: value.type }]}>
                            {FormComponent(props)}
                    </Form.Item>
                </Col>)
            }
        })

        form_update_values['_id_slug'] = record['_id_slug']

        // // console.log(form_update_values)

        form_update.setFieldsValue(form_update_values)

        setUpdateRowTitle(<span>Update data from {modelInstance.title} table</span>)
        setUpdateRowForm(columns)
        setUpdateRowVisible(true)
    }

    const updateMenu = function () {

        const model_list = cookies.get("modelListForUser") || []

        let model_buttons = [<Menu.Item className="border border-warning w-100 " type="primary" key='myprofile' onClick={(e) => { updateProfile() }}>My Profile</Menu.Item>]

        model_buttons.push(<Menu.Item className="border border-warning w-100 " type="primary" key='dashboard' onClick={(e) => { updateDashboard() }}>DashBoard</Menu.Item>)

        model_list.map((model) => {
                model_buttons.push(<Menu.Item className="border border-warning w-100 " type="primary" key={model.base_url} onClick={(e) => { updatemodel(model) }}>{model.title}</Menu.Item>)
            }
        );

        if (loggedInUser.admin){
          model_buttons.push(<Menu.Item className="border border-warning w-100 " type="primary" key='pages' onClick={(e) => { updatePages() }}>Manage pages</Menu.Item>)
        }

        // console.log(model_buttons, typeof model_buttons)

        if (modelDetail === "") {
            updateDashboard()
        }

        return model_buttons
    }

    const updateProfile = function () {
      setmodelDetail(MyProfile);
      setLayoutHeaderInfo("");
      setModelDetailTableHeader("");
    }

    const updateDashboard = function () {
        const months = getLastMonths()
        // console.log(months)

        const models_stats_url = backendProps.domain + "/api/blog/model/statistics"

        fetch(models_stats_url, {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'models': Object.keys(cookies.get("modelMappedList") || {}),
                'months': months
            })
        })
        .then((res) => res.json())
        .then((models_stats) => {
            // console.log("Model states", models_stats)

            const model_details = Object.entries(models_stats).map(([key, value]) =>
                <Col span={6} style={{'margin': '56px 0'}}>
                    <div style={{'textAlign': 'center'}}><span>{key} statistics by month</span></div>
                    {DashBoard({'values': value})}
                </Col>
            )

            // console.log(model_details)

            setmodelDetail(<Row>
                {model_details}
            </Row>)

        })
    }

    const editContactPageSubmit = function (values: object) {
        let page_head = values.page_head
        let head_buff = new Buffer(page_head)
        values.page_head = head_buff.toString('base64')

        let page_main = values.page_main
        let main_buff = new Buffer(page_main)
        values.page_main = main_buff.toString('base64')

        let page_footer = values.page_footer
        let footer_buff = new Buffer(page_footer)
        values.page_footer = footer_buff.toString('base64')

        console.log(values)

        fetch(backendProps.domain + "/api/blog/pages/contact/update/", {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((contactPageData) => {
          console.log(contactPageData)
        })

    }

    const editAboutPageSubmit = function (values: object) {
        let page_head = values.page_head
        let head_buff = new Buffer(page_head)
        values.page_head = head_buff.toString('base64')

        let page_main = values.page_main
        let main_buff = new Buffer(page_main)
        values.page_main = main_buff.toString('base64')

        let page_footer = values.page_footer
        let footer_buff = new Buffer(page_footer)
        values.page_footer = footer_buff.toString('base64')

        console.log(values)

        fetch(backendProps.domain + "/api/blog/pages/about/update/", {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((aboutPageData) => {
          console.log(aboutPageData)
        })

    }

    const editContactPage = function () {
        setEditContactPageVisible(true)
    }

    const editAboutPage = function () {
        setEditAboutPageVisible(true)
    }

    const updatePages = function () {

        setmodelDetail(<div>

            <Row>
                <Col span={8}>
                    <Card
                        hoverable
                        style={{ margin: '24px 24px' }}
                        cover={<Iframe src="http://localhost:3000/" height="400" width="100%"/>}
                    >
                        <Card.Meta title="About page" description="localhost:3000/about/" onClick={() => {editAboutPage()}}/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        hoverable
                        style={{ margin: '24px 24px' }}
                        cover={<Iframe src="http://localhost:3000/" height="400" width="100%"/>}
                    >
                        <Card.Meta title="Contact page" description="localhost:3000/contact/" onClick={() => {editContactPage()}}/>
                    </Card>
                </Col>
            </Row>

        </div>)
    }

    const updatemodel = function (modelInstance) {
        setRunningAddNewModelIns(modelInstance)

        const model_data_url = backendProps.domain + "/api/" + modelInstance.app_level + "/" + modelInstance.base_url

        fetch(model_data_url, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((modelData) => {

            console.log('Model Data', modelData)

            let columns = []

            Object.entries(modelFieldMap[modelInstance.base_url]).map(([key, value]) => {
                columns.push({
                    key: key,
                    dataIndex: key,
                    title: key,
                    width: 200,
                    ellipsis: true,
                    sorter: (a, b) => a[key].length - b[key].length,
                    sortDirections: ['descend', 'ascend'],
                })
            })

            columns.push({
                title: 'Action',
                key: 'action',
                sorter: true,
                render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={(e) => {updateRow(modelInstance, record)}}>Update</Button>
                    <Button type="link" onClick={(e) => {deleteRow(modelInstance, record)}}>Delete</Button>
                </Space>
                ),
            })

            let data = []

            modelData.map((row) => {
                let value_row = {}

                Object.entries(modelFieldMap[modelInstance.base_url]).map(([key, value]) => {
                    // console.log(key, row)
                    value_row[key] = row[key] !== null?row[key].toString():null
                })

                value_row.key = value_row['_id_slug']

                data.push(value_row);

            })

            const modelTitle = modelInstance.title;

            setLayoutHeaderInfo(<div>
                <h4>Here you can view, add, update or delete data from {modelTitle}</h4>
            </div>)

            setModelDetailTableHeader(<div>
                <Button type="dashed" style={{ marginBottom: 16, marginRight: 16 }}>
                    CSV
                </Button>
                <Button type="dashed" style={{ marginBottom: 16, marginRight: 16 }}>
                    Print
                </Button>
                <Button type="primary" style={{ marginBottom: 16 }} onClick={() => addNewRow(modelInstance)}>
                    Add New {modelTitle}
                </Button>
            </div>)

            setmodelDetail(<div>
                <Table
                columns={columns}
                pagination={{ position: ['none', 'bottomRight'] }}
                dataSource={data}
                scroll={{ x: columns.length*200 }}
                bordered
                style={{ overflow: 'hidden' }}
                />
            </div>)
        })
    };

    const deleteRow = function (modelInstance, record) {
        confirm({
            title: 'Are you sure delete this row?',
            icon: <ExclamationCircleOutlined />,
            content: "If you delete this, it can't be undone!",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                const model_data_delete_url = backendProps.domain + "/api/" + modelInstance.app_level + "/" + modelInstance.base_url + "/" + record._id_slug + "/"

                fetch(
                    model_data_delete_url, {
                        method: "DELETE",
                        header: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((res) => res.json())
                .then((deletedData) => {
                    // console.log(deletedData)
                })
            },
            onCancel() {
              // console.log('Cancel');
            },
          });
    }

    useEffect(() => {
        fetch(backendProps.domain + "/api/blog/pages/about/", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((about_page_content) => {
                let page_data = about_page_content[0]

                const head_buff = new Buffer(page_data.page_head, 'base64')
                page_data.page_head = head_buff.toString('ascii')

                const main_buff = new Buffer(page_data.page_main, 'base64')
                page_data.page_main = head_buff.toString('ascii')

                const footer_buff = new Buffer(page_data.page_footer, 'base64')
                page_data.page_footer = head_buff.toString('ascii')

                // console.log('Contact page content', page_data)

                console.log('About page content', page_data)
                setAboutPageContent(page_data)
            })

        fetch(backendProps.domain + "/api/blog/pages/contact/", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((contact_page_content) => {
                let page_data = contact_page_content[0]

                const head_buff = new Buffer(page_data.page_head, 'base64')
                page_data.page_head = head_buff.toString('ascii')

                const main_buff = new Buffer(page_data.page_main, 'base64')
                page_data.page_main = head_buff.toString('ascii')

                const footer_buff = new Buffer(page_data.page_footer, 'base64')
                page_data.page_footer = head_buff.toString('ascii')

                // console.log('Contact page content', page_data)

                setContactPageContent(page_data)
            })

    }, []);

    useEffect(() => {

        const active_model_url = backendProps.domain + "/api/models";

        let mapped_models = {}

        fetch(active_model_url, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((model_list) => {

            console.log(model_list)

            model_list.map((model) => {
                mapped_models[model.base_url] = model
                mapped_models[model.base_url]['fields'] = {}
            });

            cookies.set("modelList", model_list)
            cookies.set("modelMappedList", mapped_models)

            const model_fields_url = backendProps.domain + "/api/blog/model/field-map"

            fetch(model_fields_url, {
                method: "POST",
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'models': Object.keys(cookies.get("modelMappedList"))})
            })
            .then((res) => res.json())
            .then((model_fields_map) => {
                cookies.set("modelFieldMap", model_fields_map)
                setModelFieldMap(model_fields_map)

                Object.entries(mapped_models).map(([key, value]) => {
                    const model_data_url = backendProps.domain + "/api/blog/" + key + "/"

                    fetch(model_data_url, {
                        method: "GET",
                        header: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then((res) => res.json())
                    .then((model_data) => {
                        let modelsData = allModelData;
                        modelsData[key] = model_data
                        setAllModelData(modelsData)
                    })
                })

            })

            })

        const active_model_user_url = backendProps.domain + "/api/models/user/";

        fetch(active_model_user_url, {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loggedInUser)
        })
            .then((res) => res.json())
            .then((model_list_for_user) => {

            console.log(model_list_for_user)
            cookies.set("modelListForUser", model_list_for_user)

          })

    }, []);

    return (
        <div className="container-fluid bg-white py-3">
            <Layout style={{ minHeight: '90vh' }}>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                    >
                    <Link to="/">
                      <div className="logo" style={{'cursor': 'pointer', 'padding': '20px'}}>
                        <span style={{'color': 'white', 'fontSize': '1.3rem'}}>Go to Home</span>
                      </div>
                    </Link>
                    <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
                        {updateMenu()}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background">
                        { layoutHeaderInfo }
                    </Header>
                    <Content style={{ margin: '8px 8px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24 }}>
                            { modelDetailTableHeader }
                            { modelDetail }
                        </div>
                        <Modal
                            title={addNewRowTitle}
                            centered
                            visible={addRowVisible}
                            onOk={() => setAddRowVisible(false)}
                            onCancel={() => setAddRowVisible(false)}
                            footer={[]}
                            width={1000}
                        >
                            <Form
                                name={addNewRowTitle}
                                labelCol={{'span': 4}}
                                wrapperCol= {{'span': 20}}
                                onFinish={addNewSubmit}
                                form={form}
                                >
                                <Row gutter={24}>{addRowForm}</Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                            form.resetFields();
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                        <Modal
                            title={updateRowTitle}
                            centered
                            visible={updateRowVisible}
                            onOk={() => setUpdateRowVisible(false)}
                            onCancel={() => setUpdateRowVisible(false)}
                            footer={[]}
                            width={1000}
                        >
                            <Form
                                name={updateRowTitle}
                                labelCol={{'span': 6}}
                                wrapperCol= {{'span': 14}}
                                onFinish={updateRowSubmit}
                                form={form_update}
                                // initialValues={updateRowInitialValues}
                                >
                                <Row gutter={24}>{updateRowForm}</Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                form_update.resetFields();
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                        <Modal
                            title="Edit About Page"
                            centered
                            visible={editAboutPageVisible}
                            // onOk={() => setEditAboutPageVisible(false)}
                            onCancel={() => setEditAboutPageVisible(false)}
                            footer={[]}
                            width={1000}
                        >
                            <Form
                                name="Edit About Page"
                                labelCol={{'span': 4}}
                                wrapperCol= {{'span': 20}}
                                onFinish={editAboutPageSubmit}
                                form={aboutPageForm}
                                initialValues={{
                                    'page_title': aboutPageContent.page_title,
                                    'page_head': aboutPageContent.page_head,
                                    'page_main': aboutPageContent.page_main,
                                    'page_footer': aboutPageContent.page_footer,
                                  }}
                                >
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="page_title"
                                            label="Page Title"
                                            rules={[{ required: true, message: "About page title required", type: "string" }]}>
                                                {FormComponent({'name': 'text', 'text': 'Page Title', 'style': {'margin': 0}})}
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Head"
                                            name='page_head'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: 'Heading required' }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Main Content"
                                            name='page_main'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: "Main content required" }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Footer"
                                            name='page_footer'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: "Footer required" }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                        <Modal
                            title="Edit Contact Page"
                            centered
                            visible={editContactPageVisible}
                            // onOk={() => setEditAboutPageVisible(false)}
                            onCancel={() => setEditContactPageVisible(false)}
                            footer={[]}
                            width={1000}
                        >
                            <Form
                                name="Edit Contact Page"
                                labelCol={{'span': 4}}
                                wrapperCol= {{'span': 20}}
                                onFinish={editContactPageSubmit}
                                form={contactPageForm}
                                initialValues={{
                                    'page_title': contactPageContent.page_title,
                                    'page_head': contactPageContent.page_head,
                                    'page_main': contactPageContent.page_main,
                                    'page_footer': contactPageContent.page_footer,
                                  }}
                                >
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="page_title"
                                            label="Page Title"
                                            rules={[{ required: true, message: "Contact page title required", type: "string" }]}>
                                                {FormComponent({'name': 'text', 'text': 'Page Title', 'style': {'margin': 0}})}
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Head"
                                            name='page_head'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: 'Heading required' }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Main Content"
                                            name='page_main'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: "Main content required" }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Footer"
                                            name='page_footer'
                                            valuePropName='data'
                                            getValueFromEvent={(event, editor) => {
                                                const data = editor.getData();
                                                return data;
                                            }}
                                            rules={[{ required: true, message: "Footer required" }]}>
                                            <CKEditor editor={ClassicEditor} style={{'height': '300px'}}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>BlogDi ©2020 Created by CircleDi</Footer>
                </Layout>
            </Layout>
        </div>
    )
}
