import { DatePicker, TimePicker, InputNumber, Switch, Input, Tooltip, Upload, Select, Button } from 'antd';
import { InfoCircleOutlined, UploadOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import moment from 'moment';

export function  FormComponent (props) {
    const name = props.name;

    if (name == "button") {
        return <Button
                    className={props.class || "w-25"}
                    style={props.style}
                    type={props.type || "primary"}
                    onClick={props.onClick}
                    onChange={props.onChange}>{props.text || "Simple Button"}</Button>;

    } else if (name == "datetime" || name == "date" || name == "time")  {
        if (name == "time") {
            return <TimePicker
                    className={props.class}
                    style={props.style}
                    format={props.format || "HH:mm:ss"}
                    disabledTime={props.disabledTime}
                    onChange={props.onChange}
                    defaultValue={props.value}/>;
        } else {
            let showtime = null

            if (name == "datetime") {
                showtime = {defaultValue: moment(props.moment_current || '00:00:00', props.moment_format || 'HH:mm:ss')}
            }

            return <DatePicker
                    className={props.class}
                    style={props.style}
                    format={props.format || name == "datetime"? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
                    disabledDate={props.disabledDate}
                    disabledTime={props.disabledTime}
                    showTime = {showtime}
                    onChange={props.onChange}
                    defaultValue={props.value}/>;
        }

    } else if (name == "integer") {
        return <InputNumber
                    className={props.class}
                    style={{'width': '132px', ...props.style}}
                    min={props.min || 0}
                    max={props.max || 9999999999999}
                    defaultValue={props.value || 0}
                    onChange={props.onChange}></InputNumber>

    } else if (name == "float") {
        return <InputNumber
                    className={props.class}
                    style={{'width': '132px', ...props.style}}
                    min={props.min || 0}
                    max={props.max || 9999999999999}
                    step={0.1}
                    defaultValue={props.value || 0}
                    onChange={props.onChange}></InputNumber>

    } else if (name == "boolean") {

        return <Switch
                    onChange={props.onChange}
                    className={props.class}
                    style={props.style}
                    defaultChecked={props.value}>
                        {props.text}
                </Switch>

    } else if (name == "text") {

       return <Input
                    className={props.class}
                    style={{'width': '256px', ...props.style}}
                    placeholder={props.text ||"Input field"}
                    onChange={props.onChange}
                    defaultValue={props.value} />

    } else if (name == "slug") {

        return <Input
                    className={props.class}
                    style={{'width': '256px', ...props.style}}
                    placeholder={props.text ||"Input field"}
                    onChange={props.onChange}
                    defaultValue={props.value} />

    } else if (name == "password") {

      return <Input.Password
                    className={props.class}
                    style={{'width': '256px', ...props.style}}
                    plaplaceholder={props.text ||"Password"}
                    onChange={props.onChange}
                    defaultValue={props.value}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />

    } else if (name == "textarea") {

       return <Input.TextArea showCount
                    maxLength={props.maxlength || 124}
                    rows={props.rows || 2}
                    className={props.class || "w-25"}
                    style={props.style}
                    placeholder={props.text || "TextArea content"}
                    onChange={props.onChange}
                    defaultValue={props.value} />

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
                    style={{'width': '256px', ...props.style}}
                    placeholder={props.text || "Email address"}
                    oonChange={props.onChange}
                    defaultValue={props.value}
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
                    style={{'width': '256px', ...props.style}}
                    onChange={props.onChange}
                    defaultValue={props.value}>
                        {props.text || "Select File"}
                </Button>
              </Upload>

    } else if (name == "select") {

        const select_options = props.options.map((option) =>
            <Select.Option value={option._id_slug}>{option.__str__}</Select.Option>
        )

        return <Select
                    showSearch
                    style={{ width: 256, ...props.style }}
                    className={props.class}
                    placeholder={props.placeholder || "Select a option"}
                    optionFilterProp="children"
                    onChange={props.onChange}
                    onFocus={props.on_focus}
                    onBlur={props.on_blur}
                    onSearch={props.on_search}
                    defaultValue={props.value}
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
                    style={{ 'width': '256px', ...props.style}}
                    className={props.class}
                    placeholder={props.placeholder || "Select options"}
                    optionFilterProp="children"
                    onChange={props.onChange}
                    onFocus={props.on_focus}
                    onBlur={props.on_blur}
                    onSearch={props.on_search}
                    defaultValue={props.value}
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

// export default FormComponent;
