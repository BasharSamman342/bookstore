"use client";

import {Menu} from "antd";
import {BookOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function SideBar({collapsed}){
    const router = useRouter();
    const items = [
        {
            key: '/en/dashboard/books',
            icon: <BookOutlined  />,
            label: 'Books',

        },
        {
            key: '/en/dashboard/genres',
            icon: <VideoCameraOutlined />,
            label: 'Genres',
        },
        {
            key: '/en/dashboard/authors',
            icon: <UserOutlined />,
            label: 'Authors',
        },
    ]

    function handleClick(e: any) {
        router.push(e.key);
    }
    return (
        <>
            <div className="demo-logo-vertical" />
            <Menu
                onClick={handleClick}

                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </>
    )
}