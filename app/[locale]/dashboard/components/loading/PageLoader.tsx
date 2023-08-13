import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";

export const DefaultPageLoader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                marginLeft: "50%",
                transform:"translate(-50%,-50%)"
            }}
        >
            <center>
                <Spin indicator={antIcon} />
            </center>
        </div>
    );
};
export const APIDataLoadingLoader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return <Spin indicator={antIcon} />;
};
