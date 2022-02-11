import React, { ReactDOM, useState, useEffect } from 'react';
import { Button, Card, Layout, Menu, DatePicker, TimePicker, InputNumber, Checkbox, Input, Tooltip, Upload, Select } from 'antd';
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import Cookies from "universal-cookie";

const { Header, Content, Footer, Sider } = Layout;

const getComponent = function (props) {
    const name = props.name;

    if (name == "button") {
        return <Button
                    className={props.class || "w-25"}
                    type={props.type || "primary"}
                    onClick={props.onclick}>{props.text || "Simple Button"}</Button>;

    } else if (name == "datetime" || name == "date" || name == "time")  {
        if (name == "time") {
            return <TimePicker
                    className={props.class}
                    format={props.format || "HH:mm:ss"}
                    disabledTime={props.disabledTime}/>;
        } else {
            let showtime = null

            if (name == "datetime") {
                showtime = {defaultValue: moment(props.moment_current || '00:00:00', props.moment_format || 'HH:mm:ss')}
            }

            return <DatePicker
                    className={props.class}
                    format={props.format || name == "datetime"? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
                    disabledDate={props.disabledDate}
                    disabledTime={props.disabledTime}
                    showTime = {showtime}/>;
        }

    } else if (name == "integer") {
        return <InputNumber
                    className={props.class}
                    style={props.style || {'width': '132px'}}
                    min={props.min || 0}
                    max={props.max || 9999999999999}
                    defaultValue={props.value || 0}
                    onChange={props.onchange} />

    } else if (name == "float") {
        return <InputNumber
                    className={props.class}
                    style={props.style || {'width': '132px'}}
                    min={props.min || 0}
                    max={props.max || 9999999999999}
                    step={0.1}
                    defaultValue={props.value || 0}
                    onChange={props.onchange} />

    } else if (name == "boolean") {
        return <Checkbox
                    onChange={props.onchange}
                    className={props.class}
                    style={props.style}>
                        {props.text}
                </Checkbox>

    } else if (name == "text") {

       return <Input
                    className={props.class}
                    style={props.style || {'width': '256px'}}
                    placeholder="Input field" />

    } else if (name == "textarea") {

       return <Input.TextArea showCount
                    maxLength={props.maxlength || 124}
                    rows={props.rows || 2}
                    className={props.class || "w-25"}
                    style={props.style}
                    placeholder="Textarea Content" />

    } else if (name == "email") {

        const email_check = function (e) {
            const {value} = e.target

            if (
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                String(value).toLowerCase()
              )
            ) {
              return true;
            }
            return false;
        }

        return <Input
                    className={props.class}
                    style={props.style || {'width': '256px'}}
                    placeholder="Input field"
                    onChange={email_check}
                    suffix={
                        <Tooltip title={props.tooltip_text || "Type valid email format includes @ and ."}>
                          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                      }/>

    } else if (name == "file") {

        return <Upload>
                <Button
                    icon={<UploadOutlined />}
                    className={props.class}
                    style={props.style || {'width': '256px'}}>{props.text || "Select File"}</Button>
              </Upload>

    } else if (name == "select") {

        const select_options = props.options.map((option) =>
            <Select.Option value={option._id_slug}>{option.__str__}</Select.Option>
        )

        return <Select
                    showSearch
                    style={props.style || { width: 200 }}
                    className={props.class}
                    placeholder={props.placeholder || "Select a option"}
                    optionFilterProp="children"
                    onChange={props.on_change}
                    onFocus={props.on_focus}
                    onBlur={props.on_blur}
                    onSearch={props.on_search}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {select_options}
                  </Select>

    } else if (name == "multiselect") {

        const select_options = props.options.map((option) =>
            <Select.Option value={option._id_slug}>{option.__str__}</Select.Option>
        )

        return <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    style={props.style || { 'width': '100%' }}
                    className={props.class}
                    placeholder={props.placeholder || "Select options"}
                    optionFilterProp="children"
                    onChange={props.on_change}
                    onFocus={props.on_focus}
                    onBlur={props.on_blur}
                    onSearch={props.on_search}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {select_options}
                  </Select>

    } else {
        return props;
    }
}

const dynamicComponent = getComponent({'name': 'multiselect', 'class': 'mt-5 mx-2', 'text': 'Select File to Upload', 'options': [
    {
        '_id_slug': 'skdjfljsdfljds',
        '__str__': 'Nafir'
    },
    {
        '_id_slug': 'sdfsdfsdfdsfdsf',
        '__str__': 'Nj'
    },
    {
        '_id_slug': 'sdalfjiewjfdfjd',
        '__str__': 'Tushar'
    },
    {
        '_id_slug': 'aevsdfdsfere4r',
        '__str__': 'Abir'
    }
]})
const dynamicComponent2 = getComponent({'name': 'textarea', 'class': 'mt-5 mx-2 w-25', 'text': 'Is production'})
console.log(dynamicComponent)


