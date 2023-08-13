import React, {  useEffect, useRef, useState } from 'react';
import {
    DatePicker,
    Form,
    Input,
    Result,
} from 'antd';
import { useTranslations } from "next-intl";

const UpdateAuthor = ({ submitForm, setBtnloader, setSubmitForm, authorApi,author, fetchData, isSuccess, setIsSuccess }) => {
    const settingsFormRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const t = useTranslations("Authors")

    useEffect(() => {
        if (submitForm === true) {
            settingsFormRef?.current.submit()
        }
    }, [submitForm])

    const onFinish = async (values: any) => {
        setBtnloader(true)
        const response = await authorApi.updateAuthor(
            {
                first_name:values.first_name,
                last_name:values.last_name,
                email:values.email,
                password:values.password,
                birthdate:values.birthdate,
                id:author.id
            })
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
                title={t("author_updated_successfully")}
            />
        )
    }
    else {
        return (
            <Form
                name="validate_other"
                layout="vertical"
                ref={settingsFormRef}
                initialValues={{
                    first_name:author.first_name,
                    last_name:author.last_name,
                    email:author.email,
                }}
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

export default UpdateAuthor;