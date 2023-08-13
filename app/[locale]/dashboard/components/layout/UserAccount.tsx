
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Typography, theme, Space, Row, Col } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { signOut } from "next-auth/react";
import React, { useState } from "react";


const { Text } = Typography;

const UserAccount = ({  session,status }) => {
    const [user] = useState(session?.user?.user);
    const items: MenuProps['items'] = [
        {
            label: (
                <Space>
                    <Avatar icon={<UserOutlined />} size={60} shape="square" src={user?.profile_image} alt={"Profile Image of" + user?.name} />
                    <Space direction="vertical" size={"small"}>
                        <Text strong>{user?.name}</Text>
                        <Text type="secondary" disabled>{user?.email}</Text>
                    </Space>
                </Space>
            ),
            key: '0',
            style: { width: '300px' },
            className: 'px-20 py-10'
        },
        {
            type: 'divider',
        },
        // {
        //     label: (<a rel="noopener noreferrer" href={toAuthUrl('profile')}>{tCommon('my_profile')}</a>),
        //     key: '1',
        //     className: 'px-20 py-10'
        // },
        // {
        //     label: (<a rel="noopener noreferrer" href={toAuthUrl('/')}>{tCommon('my_accounts')}</a>),
        //     key: '2',
        //     className: 'px-20 py-10'
        // },
        {
            type: 'divider',
        },
        {
            label: (
                <Row align={"middle"} justify={"space-between"}>
                    <Col>mode</Col>
                </Row>
            ),
            key: '3',
            className: 'px-20 py-5'
        },
        {
            label: (
                <Row align={"middle"} justify={"space-between"}>
                    <Col>language</Col>

                </Row>
            ),
            key: '4',
            className: 'px-20 py-5'
        },
        {
            label: (<a rel="noopener noreferrer" onClick={() => signOut()}>sign_out</a>),
            key: '5',
            className: 'px-20 py-10'
        }
    ];

    return <Dropdown menu={{ items }}>
        <a>
            <Avatar icon={<UserOutlined />} shape="square" src={user?.profile_image} alt={"Profile Image of" + user?.name} />
        </a>
    </Dropdown>
}

export default UserAccount;