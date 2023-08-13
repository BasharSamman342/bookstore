import {Button, Col, Row, Typography} from "antd";
import Link from "next/link";
export default function MainHeader(){
    return (
        <div style={{
            height:"90vh",
            width:"100%",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundImage:'url("/images/book-cover.jpg")',

        }}>
            <div style={{backgroundColor:"rgba(0,0,0,0.6)"}}>
                <div style={{width:"80%",margin:'0 auto', height:"90vh", }}>
                    <Row gutter={24} justify={"space-between"} align={"middle"} style={{position:"relative",top:"20%"}}>
                        <Col span={12}>
                            <Typography.Title style={{color:"#fff"}}>Bookaty</Typography.Title>
                            <Typography.Text style={{color:"#fff"}}>Welcome to the largest bookstore that contains more than a hundred book.</Typography.Text>
                            <br/><br/>
                            <Link href={"/en/login"}>
                                <Button type={"primary"}>Login</Button>
                            </Link>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}