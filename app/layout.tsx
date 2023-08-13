"use client";
import React from 'react';
import {Breadcrumb, Col, Layout, Menu, Row, theme, Typography} from 'antd';
import Link from "next/link";
import {useTranslations} from "next-intl";

const { Header, Content, Footer } = Layout;
export default  function RootLayout({children,params: { locale }}) {

    return (
        <html lang={locale}>
        <body suppressHydrationWarning={true} style={{ margin: 0 }}>
            <Layout className="layout">
                <Header style={{ width:"100%"}}>
                    {/*<div className="demo-logo" />*/}
                    <Row justify={"space-between"} align={"top"} style={{width:"100%"}}>
                        <Col span={12}>
                            <Link href={"/"}><Typography.Title level={4} style={{color:"#fff"}}>Bookaty</Typography.Title></Link>
                        </Col>
                        <Col span={12} style={{textAlign:"right"}}>
                            <Link href={"en/login"}><Typography.Title level={4} style={{color:"#fff"}}>Login</Typography.Title></Link>
                        </Col>
                    </Row>
                    {/*<Menu*/}
                    {/*    theme="dark"*/}
                    {/*    mode="horizontal"*/}
                    {/*    defaultSelectedKeys={['2']}*/}
                    {/*    items={new Array(5).fill(null).map((_, index) => {*/}
                    {/*        const key = index + 1;*/}
                    {/*        return {*/}
                    {/*            key,*/}
                    {/*            label: `nav ${key}`,*/}
                    {/*        };*/}
                    {/*    })}*/}
                    {/*/>*/}
                </Header>
                <Content >

                    <div className="site-layout-content" >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center',height:"15vh",verticalAlign:"middle",color:"#fff", backgroundColor:"#333" }}>Developerd with ❤️ by bashar alsamman</Footer>
            </Layout>

        </body>
        </html>
    );
}
