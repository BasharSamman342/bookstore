import React, {  useEffect, useRef, useState } from 'react';
import {
    Form,
    Input,
    Result,
} from 'antd';
import { useTranslations } from "next-intl";

const AddNewGenre = ({ submitForm, setBtnloader, setSubmitForm, genreApi, fetchData, isSuccess, setIsSuccess }) => {
    const settingsFormRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const t = useTranslations("Genres")
    const [date,setDate] = useState('')

    useEffect(() => {
        if (submitForm === true) {
            settingsFormRef?.current.submit()
        }
    }, [submitForm])

    const onFinish = async (values: any) => {
        setBtnloader(true)
        const response = await genreApi.addNewGenre({name:values.name})
        if (response.status) {
            setBtnloader(false)
            fetchData()
            setSubmitForm(false)
            setIsSuccess(true)
        }
    };

    if (isSuccess) {
        return (
            <Result
                status="success"
                title={t("genre_created_successfully")}
            />
        )
    }
    else {
        return (
            <Form
                name="validate_other"
                layout="vertical"
                ref={settingsFormRef}
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    name="name"
                    label={t("name")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input maxLength={35} />
                </Form.Item>
            </Form >
        )
    }
};

export default AddNewGenre;