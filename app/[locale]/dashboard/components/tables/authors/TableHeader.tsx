import {Col, Row, Typography} from "antd";
import {useTranslations} from 'next-intl';
export function AuthorTableHeader(){
    const t = useTranslations('Authors');
    return (
        <Row justify={'space-between'} align={'middle'} style={{ margin: '0 15px' }}>
            <Col >
                <Typography.Text style={{ fontSize: "12px" }}>#</Typography.Text>
            </Col>
            <Col  className="text-end">
                <Typography.Text style={{ fontSize: "12px" }}>{t("name")}</Typography.Text>
            </Col>
            <Col >
                <Typography.Text style={{ fontSize: "12px" }}>{t("email")}</Typography.Text>
            </Col>
            <Col >
                <Typography.Text style={{ fontSize: "12px" }}>{t("joined_at")}</Typography.Text>
            </Col>
            <Col span={4}>
            </Col>
        </Row>
    )
}