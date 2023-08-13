import {Avatar, Button, Col, Layout, Row, Space} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import UserAccount from "./UserAccount";

const { Header, Sider, Content } = Layout;
export default function HeaderComponent({collapsed,color,setCollapsed}){
    const { Header } = Layout;
    const { data: session, status } = useSession();

    useEffect(() => {
        // setUser(new User(session?.user?.token));
    }, [status]);
    return (
        <Header className='header h-100 px-20' style={{ padding: 0, background: color }}>
            <Row justify={"space-between"}>
                <Col>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Col>
                <Col>
                    {
                        status == 'authenticated' ?
                            <Space align={"baseline"}>
                                <Avatar shape="square" icon={<SearchOutlined />} />
                                <UserAccount  session={session} status={status} />
                            </Space>
                            : ''
                    }
                </Col>
            </Row>
        </Header>
    )
}