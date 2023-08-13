"use client";

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import MenuSider from "./components/layout/Sider";
import HeaderComponent from "./components/layout/Header";
import {SessionProvider} from "next-auth/react";

const { Header, Sider, Content } = Layout;

export default function RootLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
            <Layout style={{height:"100vh"}}>
        <SessionProvider>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <MenuSider collapsed={collapsed} />
                </Sider>
                <Layout>
                    <HeaderComponent collapsed={collapsed} color={colorBgContainer} setCollapsed={setCollapsed}/>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
        </SessionProvider>
            </Layout>
    );
};

