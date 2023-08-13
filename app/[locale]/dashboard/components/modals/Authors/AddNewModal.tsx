import React, {  useEffect, useRef, useState } from 'react';
import {
    DatePicker,
    Form,
    Input,
    Result,
} from 'antd';
import { useTranslations } from "next-intl";

const AddNewAuthor = ({ submitForm, setBtnloader, setSubmitForm, authorApi, fetchData, isSuccess, setIsSuccess }) => {
    const settingsFormRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const t = useTranslations("Authors")
    const [date,setDate] = useState('')

    useEffect(() => {
        if (submitForm === true) {
            settingsFormRef?.current.submit()
        }
    }, [submitForm])

    const onFinish = async (values: any) => {
        setBtnloader(true)
        const response = await authorApi.addNewAuthor(
            {
                first_name:values.first_name,
                last_name:values.last_name,
                email:values.email,
                password:values.password,
                birthdate:values.birthdate,
            }
        )
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
                title={t("author_created_successfully")}
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
                    name="first_name"
                    label={t("first_name")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input maxLength={35} />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label={t("last_name")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input maxLength={35} />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={t("email")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input maxLength={35} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t("password")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input.Password placeholder="input password" />
                </Form.Item>

                <Form.Item
                    name="birthdate"
                    label={t("birthdate")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <DatePicker />
                </Form.Item>
            </Form >
        )
    }
};

export default AddNewAuthor;