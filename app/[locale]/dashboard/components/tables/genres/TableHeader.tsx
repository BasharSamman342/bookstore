import {Col, Row, Typography} from "antd";
import {useTranslations} from 'next-intl';
export function GenreTableHeader(){
    const t = useTranslations('Genres');
    return (
        <Row justify={'space-between'} align={'middle'} style={{ margin: '0 15px' }}>
            <Col >
                <Typography.Text style={{ fontSize: "12px" }}>#</Typography.Text>
            </Col>
            <Col  className="text-end">
                <Typography.Text style={{ fontSize: "12px" }}>{t("name")}</Typography.Text>
            </Col>
            <Col >
                <Typography.Text style={{ fontSize: "12px" }}>{t("created_at")}</Typography.Text>
            </Col>
            <Col span={5}>
            </Col>
        </Row>
    )
}