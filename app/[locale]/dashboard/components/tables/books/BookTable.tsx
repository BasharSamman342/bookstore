import {Avatar, Button, Col, List, Modal, notification, Popconfirm, Row, Space, Typography} from "antd";
import {useTranslations} from 'next-intl';
import AddNewBook from "@/app/[locale]/dashboard/components/modals/books/AddNewModal";
import UpdateBookModal from "@/app/[locale]/dashboard/components/modals/books/UpdateBookModal";
import {useState} from "react";

export default function BookTable({item,bookApiClass,fetchData}){
    const [api,context] = notification.useNotification()
    const [submitForm, setSubmitForm] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const [isUpdateModal, setIsUpdateModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);

    const reset = () => {
        setIsSuccess(false)
        setSubmitForm(false)
        setBtnLoader(false)
    }
    const confirm = async (id)=>{
        const res =await bookApiClass.deleteBook(id)
        if (res?.status){
            notification.success({message:t("deleted_successfully")})
            fetchData()
        }
    }

    const t = useTranslations("Books")
    return (
        <List.Item key={item.id} style={{width:'100%'}}>
            <Row style={{width:'100%'}} justify={"space-between"} align={"middle"}>
                <Col span={1}>
                    <Typography.Text>{item.id}</Typography.Text>
                </Col>
                <Col span={1}>
                    <Typography.Text>{item.title}</Typography.Text>
                </Col>
                <Col span={3}>
                    <Typography.Text>{item.publication_date}</Typography.Text>
                </Col>
                <Col span={2}>
                    <Typography.Text>{item?.genre?.name}</Typography.Text>
                </Col>
                <Col span={2}>
                    <Space>
                        <Button type={"primary"} onClick={()=>{setIsUpdateModal(true)}}>{t("edit")}</Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={()=>{confirm(item.id)}}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                </Col>
            </Row>
            <Modal title={t('update_book')} afterClose={reset} open={isUpdateModal} onCancel={() => { setIsUpdateModal(false) }}
                   footer={[
                       !isSuccess && <Button key="submit" type="primary" htmlType="submit" style={{ width: "100%" }} size={"large"} loading={btnLoader} onClick={() => setSubmitForm(!submitForm)}>
                           {t("update_book")}
                       </Button>
                   ]}>
                <UpdateBookModal book={item} isSuccess={isSuccess} setIsSuccess={setIsSuccess} fetchData={fetchData} bookApi={bookApiClass} submitForm={submitForm} setSubmitForm={setSubmitForm} setBtnloader={setBtnLoader} />
            </Modal>
        </List.Item>
    )
}