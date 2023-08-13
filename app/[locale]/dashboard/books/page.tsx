"use client";

import {Avatar, Button, Col, Divider, List, Modal, Row, Skeleton, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {BookApi} from "./api/api";
import {useTranslations} from "next-intl";
import InfiniteScroll from 'react-infinite-scroll-component';
import BookTable from "../components/tables/books/BookTable";
import {DefaultPageLoader} from "../components/loading/PageLoader";
import {TableHeader} from "../components/tables/books/TableHeader";
import AddNewBook from "@/app/[locale]/dashboard/components/modals/books/AddNewModal";

export default function BookPage(){
    const {data:session,status} = useSession()
    const [pagination,setPagination] = useState(null)
    const [bookApiClass,setBookApiClass] = useState<BookApi>()
    const t = useTranslations('Books');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [submitForm, setSubmitForm] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);

    const reset = () => {
        setIsSuccess(false)
        setSubmitForm(false)
        setBtnLoader(false)
    }

    useEffect(() => {
        loadMoreData();
    }, [bookApiClass]);

    useEffect(()=>{
        if (status == "authenticated"){
            setBookApiClass(new BookApi(session?.user?.token))
        }
    },[session])
    const init = async ()=>{
        setLoading(true)
        const res = await bookApiClass?.getAllBooks(1)
        if (res?.status){
            setData(res?.data)
            setPagination(res?.pagination)
            setLoading(false)
        }
    }
    const fetchData = async ()=>{
        const res = await bookApiClass?.getAllBooks(pagination?.current_page+1)
        console.log(res)
        if (res?.status){
            setData([...data, ...res?.data])
            setPagination(res?.pagination)
        }
    }

    useEffect(()=>{
        init()
    },[bookApiClass])

    const loadMoreData = async () => {
        setLoading(true);
        fetchData()
        setLoading(false)

    };

    if (loading){
        return(
            <DefaultPageLoader />
        )
    }
    else{
        return (
            <>
                <Space direction={"vertical"} style={{width:"100%"}}>
                    <Row justify={"space-between"} align={"middle"} style={{width:"100%"}}>
                        <Col span={12}>
                            <Typography.Title>{t("title")}</Typography.Title>
                        </Col>
                        <Col span={12} >
                            <Button onClick={()=>setIsAddNewModalOpen(true)} style={{float:"right"}}>{t("add_new")}</Button>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={data.length}
                            next={loadMoreData}
                            hasMore={data.length < pagination?.total}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                header={<TableHeader />}
                                dataSource={data}
                                renderItem={(item) => (
                                    <BookTable item={item} fetchData={fetchData} bookApiClass={bookApiClass}/>

                                )}
                            />
                        </InfiniteScroll>
                    </div>
                    <Modal title={t('add_new_book')} afterClose={reset} open={isAddNewModalOpen} onCancel={() => { setIsAddNewModalOpen(false) }}
                           footer={[
                               !isSuccess && <Button key="submit" type="primary" htmlType="submit" style={{ width: "100%" }} size={"large"} loading={btnLoader} onClick={() => setSubmitForm(!submitForm)}>
                                   {t("create_book")}
                               </Button>
                           ]}>
                        <AddNewBook isSuccess={isSuccess} setIsSuccess={setIsSuccess} fetchData={fetchData} bookApi={bookApiClass} submitForm={submitForm} setSubmitForm={setSubmitForm} setBtnloader={setBtnLoader} />
                    </Modal>
                </Space>
            </>
        )
    }
}

