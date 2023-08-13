import {Avatar, Button, Col, List, Modal, notification, Popconfirm, Row, Space, Typography} from "antd";
import {useTranslations} from 'next-intl';
import {useState} from "react";
import UpdateAuthor from "@/app/[locale]/dashboard/components/modals/Authors/UpdateAuthorModal";


export default function AuthorTable({item,authorApiClass,fetchData}){
    const [api,context] = notification.useNotification()
    const [submitForm, setSubmitForm] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const [isUpdateModal, setIsUpdateModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);
    const t = useTranslations("Authors")
    const reset = () => {
        setIsSuccess(false)
        setSubmitForm(false)
        setBtnLoader(false)
    }
    const confirm = async (id)=>{
        const res =await authorApiClass.deleteAuthor(id)
        if (res?.status){
            notification.success({message:t("deleted_successfully")})
            fetchData()
        }
    }

    return (
        <List.Item key={item.id} style={{width:'100%'}}>
            <Row style={{width:'100%'}} justify={"space-between"} align={"middle"}>
                <Col >
                    <Typography.Text>{item.id}</Typography.Text>
                </Col>
                <Col  >
                    <Typography.Text>{item.first_name} {item.last_name}</Typography.Text>
                </Col>
                <Col >
                    <Typography.Text>{item?.email}</Typography.Text>
                </Col>
                <Col >
                    <Typography.Text>{item?.created_at}</Typography.Text>
                </Col>
                <Col >
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
            <Modal title={t('update_author')} afterClose={reset} open={isUpdateModal} onCancel={() => { setIsUpdateModal(false) }}
                   footer={[
                       !isSuccess && <Button key="submit" type="primary" htmlType="submit" style={{ width: "100%" }} size={"large"} loading={btnLoader} onClick={() => setSubmitForm(!submitForm)}>
                           {t("update_author")}
                       </Button>
                   ]}>
                <UpdateAuthor author={item} isSuccess={isSuccess} setIsSuccess={setIsSuccess} fetchData={fetchData} authorApi={authorApiClass} submitForm={submitForm} setSubmitForm={setSubmitForm} setBtnloader={setBtnLoader} />
            </Modal>
        </List.Item>
    )
}