import {Col, Row, Statistic, Typography} from "antd";
import {useEffect, useState} from "react";
import {BookStore} from "@/app/api/books/api";

interface IStats{
    books: String,
    genres: String,
    authors: String
}
export default function HomeStatistics(){
    const [data,setData] = useState<IStats>({
        books: "0",
        genres: "0",
        authors: "0"
    })

    const init =async ()=>{
        const store = new BookStore()
        const response = await store.getStatistics()
        console.log(response)
        if (response?.status){
            setData(response?.data)
        }
    }

    useEffect(()=>{
        init()
    })
    console.log(data)
    return (
        <div style={{width:"80%",margin:'0 auto',height:"30vh",transform:"translateY(15%)"}}>
            <Typography.Title level={3} style={{textAlign:"center"}}>Statistics</Typography.Title>
        <Row gutter={24} justify={"center"} align={"middle"}>
            <Col span={8} style={{textAlign:"center"}}>
                <Statistic title="Authors" value={data?.authors} />
            </Col>
            <Col span={8} style={{textAlign:"center"}}>
                <Statistic title="Genres" value={data?.genres} />
            </Col>
            <Col span={8} style={{textAlign:"center"}}>
                <Statistic title="Books" value={data?.books} />
            </Col>
        </Row>
        </div>
    )
}