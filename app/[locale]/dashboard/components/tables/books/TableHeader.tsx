import {Col, Row, Typography} from "antd";
import {useTranslations} from 'next-intl';
export function TableHeader(){
    const t = useTranslations('Books');
    return (
        <Row justify={'space-between'} align={'middle'} style={{ margin: '0 15px' }}>
            <Col span={1}>
                <Typography.Text style={{ fontSize: "12px" }}>#</Typography.Text>
            </Col>
            <Col span={1}>
                <Typography.Text style={{ fontSize: "12px" }}>{t("title")}</Typography.Text>
            </Col>
            <Col span={3} className="text-end">
                <Typography.Text style={{ fontSize: "12px" }}>{t("publish_date")}</Typography.Text>
            </Col>
            <Col span={2} className="text-end">
                <Typography.Text style={{ fontSize: "12px" }}>{t("genre")}</Typography.Text>
            </Col>
            
            <Col span={2}>
            </Col>
        </Row>
    )
}