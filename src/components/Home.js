import React, {useLayoutEffect, useState} from 'react'
import {Button, Col, Layout, message, Row, Space, Typography, DatePicker, TimePicker} from 'antd';
import {useNavigate} from 'react-router-dom';
import http from "../utils/http";
import "./css/common.css"

const {Content} = Layout;
const {Title, Paragraph, Text, Link} = Typography;


export default function Home() {
    const navigateTo = useNavigate();
    const [date, setDate] = useState('');
    let _userObj = {};
    const user_data = localStorage.getItem("__google_user_data__");
    if (user_data) {
        _userObj = JSON.parse(user_data);
    }
    const role = localStorage.getItem("__google_login_role__");
    const onLogout = () => {
        localStorage.removeItem('__google_user_data__');
        localStorage.removeItem('__google_login_role__');
        navigateTo("/login")
    }
    const onSave = () => {
        http.post('/api/calendar', {
            date: date.format('YYYY-MM-DD'),
            sub: Object.keys(_userObj).length > 0 ? _userObj.sub : '',
            remark: 'meeting'
        }).then(res => {
            console.log(res)
            message.success("Successfully added!");
        })
    }

    let _content = "";
    if (role === 'professor') {
        _content = (
            <Row>
                <Col span={24} className="title">
                    <DatePicker picker="date" onChange={(value) => setDate(value)}/>
                </Col>
                <Col span={12} offset={6}>
                    <Button type="primary" onClick={onSave}>Save</Button>
                </Col>
            </Row>
        )
    } else {
        _content = <span>Please setup your office hour...</span>
    }
    return (
        <Layout>
            <div className="logout">
                <Button type="primary" danger onClick={onLogout}>Logout</Button>
            </div>
            <Content className="home-container">
                <Row>
                    <Col span={24} className="title">
                        <Title>Your are now logged in as {role}!</Title>
                    </Col>
                    <Col span={12} offset={6}>
                        {_content}
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}