"use client";
import {Typography} from "antd";
import {useSession} from "next-auth/react";

export default function Dashboard(){
    const {data:session,status} = useSession()
    console.log(session)
    return (
        <Typography.Title>hello</Typography.Title>
    )
}