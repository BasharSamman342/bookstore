"use client";
import {Button, Col, Row, Typography} from "antd";
import Link from "next/link";
import MainHeader from "@/app/components/layout/MainHeader";
import HomeStatistics from "@/app/components/layout/Statistics";

export default function HomePage(){
    return (
        <>
            <MainHeader />
            <HomeStatistics />
        </>
    )
}