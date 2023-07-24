import React, {useCallback, useEffect, useState} from 'react';
import {Button, Layout, Space, Col, Row, Typography, Modal, message} from 'antd';
import {ExclamationCircleFilled} from '@ant-design/icons';
import http from "../utils/http";
import "./css/common.css"
import {LoginSocialGoogle, IResolveParams} from 'reactjs-social-login';
import {useNavigate} from "react-router-dom";

const {Content} = Layout;
const {confirm} = Modal;
const {Title, Paragraph, Text, Link} = Typography;


const Login = () => {
    const ROLE_STUDENT = 'student';
    const ROLE_PROFESSOR = 'professor';
    const navigateTo = useNavigate();
    const [uri, setUri] = useState('http://localhost:3000/login');
    const [size, setSize] = useState(50);
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState({});

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled/>,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onLoginStart = useCallback(() => {
        message.loading('google login...', 0)
    }, []);

    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    const onLogout = useCallback(() => {
    }, []);

    // 副作用
    useEffect(() => {
        message.destroy();
        if (provider && profile) {
            message.success("Successfully logged in!");
            localStorage.setItem("__google_user_data__", JSON.stringify(profile));
            navigateTo("/home")
        } else {
            console.log(provider, profile);
        }
    }, [provider, profile])
    return (
        <Layout>
            <Content className="login-container">
                <Row>
                    <Col span={24} className="title">
                        <Title>Welcome to Schedule my Professor!</Title>
                    </Col>
                    <Col span={24}>
                        <LoginSocialGoogle
                            client_id={'245826321820-bg1g8bb4i0jjel6eervp34lhg7dfbtov.apps.googleusercontent.com'}
                            onLoginStart={onLoginStart}
                            redirect_uri={uri}
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({provider, data}: IResolveParams) => {
                                try {
                                    setProvider(provider);
                                    setProfile(data);
                                    localStorage.setItem("__google_user_data__", JSON.stringify(data));
                                    http.post('/api/login', data).then(res => {
                                        console.log(res)
                                    })
                                } catch (err) {
                                    console.log(err);
                                }
                            }}
                            onReject={err => {
                                console.log(err);
                            }}>
                            <Space size={size}>
                                <Button onClick={() => {
                                    window.localStorage.setItem("__google_login_role__", ROLE_PROFESSOR);
                                }}>Login as Professor</Button>

                                <Button type="primary" onClick={() => {
                                    window.localStorage.setItem("__google_login_role__", ROLE_STUDENT);
                                }}>Login as Student</Button>
                            </Space>
                        </LoginSocialGoogle>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
};

export default Login;