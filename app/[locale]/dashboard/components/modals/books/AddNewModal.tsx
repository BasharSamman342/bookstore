import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button, DatePicker, DatePickerProps,
    Form,
    Input,
    InputNumber,
    Result,
    Select,
    Slider,
    Upload,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchData } from 'next-auth/client/_utils';
import { DefaultPageLoader } from "@/app/[locale]/dashboard/components/loading/PageLoader";
import { useTranslations } from "next-intl";

const AddNewBook = ({ submitForm, setBtnloader, setSubmitForm, bookApi, fetchData, isSuccess, setIsSuccess }) => {
    const settingsFormRef = useRef(null)
    const [loading, setLoading] = useState(false);
    // const [imgfile, setFile] = useState<UploadFile>()
    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    const t = useTranslations("Books")
    const [genres,setGenres] = useState([])
    const [authors,setAuthors] = useState([])
    const [date,setDate] = useState('')

    const init = async () => {
        setLoading(true)
        const session = await getSession()
        const authorRes = await bookApi.getAuthors()
        const genresRes = await bookApi.getGenres()
        if (authorRes?.status) {
            setAuthors(authorRes.data)
            setLoading(false)
        }
        if (genresRes?.status) {
            setGenres(genresRes.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [bookApi])

    useEffect(() => {
        if (submitForm === true) {
            settingsFormRef?.current.submit()
        }
    }, [submitForm])

    // const normFile = (e: any) => {
    //     console.log('Upload event:', e.file.originFileObj);
    //     setFile(e.file.originFileObj)
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e?.fileList;
    // };

    const onFinish = async (values: any) => {
        setBtnloader(true)
        const response = await bookApi.addNewBook({title:values.title,author_id:values.author_id,genre_id:values.genre_id,publication_date:date,description:values.description})
        if (response.status) {
            setBtnloader(false)
            fetchData()
            setSubmitForm(false)
            setIsSuccess(true)
        }
    };
    // ---------------------- Upload configs ------------------
    // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };
    //
    // const onPreview = async (file: UploadFile) => {
    //     let src = file.url as string;
    //     if (!src) {
    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj as RcFile);
    //             reader.onload = () => resolve(reader.result as string);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString)
    };

    if (isSuccess) {
        return (
            <Result
                status="success"
                title={t("book_created_successfully")}
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
                    name="title"

                    label={t("title")}
                    style={{ width: '100%' }}
                    rules={[{ required: true }]}
                >
                    <Input maxLength={35} />
                </Form.Item>
                <Form.Item
                    name="author_id"
                    label={t("author_id")}
                >
                    <Select loading={loading} placeholder={t("choose_account")}>
                        {
                            authors.map((author) => {
                                return (
                                    <Select.Option key={author?.id} value={`${author?.id}`}>{author?.first_name} {author?.last_name}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="genre_id"
                    label={t("genre_id")}
                >
                    <Select loading={loading} placeholder={t("choose_account")}>
                        {
                            genres.map((genre) => {
                                return (
                                    <Select.Option key={genre?.id} value={`${genre?.id}`}>{genre?.name}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="publication_date"
                    label={t("publication_date")}
                    hasFeedback
                    rules={[{ required: true }]}
                >
                    <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={t("description")}
                >
                    <Input.TextArea></Input.TextArea>

                </Form.Item>
            </Form >
        )
    }



};

export default AddNewBook;