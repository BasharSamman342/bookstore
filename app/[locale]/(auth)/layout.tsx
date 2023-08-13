"use client";


import { Layout, theme } from "antd";
import { SessionProvider } from "next-auth/react";
// import AuthLayout from "../components/layout/AuthLayout";

const { Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { token: { colorBgContainer } } = theme.useToken();
  // const [api, contextHolder] = notification.useNotification();
  return (
    <Layout>
      {/* {contextHolder} */}
      <SessionProvider>
        <Content className='content' style={{ background: colorBgContainer, padding: 0 }}>
          {children}
        </Content>
      </SessionProvider>
    </Layout>
  );
}
