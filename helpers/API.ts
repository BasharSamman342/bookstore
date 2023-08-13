import axios from "axios";

const BASE_URL = "http://157.175.176.124/api/";

// export async function postRequest(
// 	url,
// 	body: any = {},
// 	header: any = {},
// 	token?: string
// ) {
// 	const result = await axios
// 		.post(`${BASE_URL}${url}`, body, {
// 			headers: {
// 				...header,
// 				Authorization: `Bearer ${token}`,
// 			},
// 		})
// 		.then((response) => {
// 			console.log(`respionse for ${url}`);
// 			console.log(url);
// 			console.log(response.status);
// 			return { data: response.data, status: response.status };
// 		})
// 		.catch((error) => {
// 			console.log(`error for ${url}`);
// 			console.log(error);
// 		});
// 	console.log(`call before finish`);
// 	console.log(result);
// 	console.log(`end call`);

// 	return result;
// }

// export function getRequest(url, body: any = {}, header: any = {}) {
// 	axios
// 		.post(`${BASE_URL}${url}`, body, header)
// 		.then((response) => {
// 			console.log(response);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

export class API {
    token?: string;

    constructor(value?: string) {
        this.token = value;
    }

    updateToken(token) {
        this.token = token;
    }

    async postRequest(url, body: any = {}, header: any = {}, token?: string) {
        const result = await axios.post(`${BASE_URL}${url}`, body, {
            headers: {
                // Accept: "application/json",
                Authorization: `Bearer ${token ? token : this.token}`,
                'Content-Type': 'multipart/form-data',
                ...header,
            },
        }).then((response) => {
            console.log('success response', response);
            return { code: response.status, status: true, message: response.data.message, data: response.data.data, extra: response?.data?.extras };
            // return { data: response.data, status: response.status };
        }).catch((error) => {
            console.log('error response', error.response);
            var errors = {};
            var message = 'Something went wrong, please try again later.';
            const errorResponseData = error.response;
            console.log('errorResponseData=>', errorResponseData);
            if (errorResponseData.status == 422) {
                if (errorResponseData.errors)
                    for (let key in errorResponseData.errors) Object.assign(errors, { [key]: errorResponseData.errors[key][0] });
                else if (errorResponseData.data.errors)
                    for (let key in errorResponseData.data.errors) Object.assign(errors, { [key]: errorResponseData.data.errors[key][0] });
            } else {
                if (errorResponseData.data.errors) message = Array.isArray(errorResponseData.data.errors) ? JSON.stringify(errorResponseData.data.errors) : errorResponseData.data.errors;
                else if (errorResponseData.message) message = errorResponseData.message;
                else if (errorResponseData.data) message = Array.isArray(errorResponseData.data) ? JSON.stringify(errorResponseData.data) : errorResponseData.data;
            }
            return { code: errorResponseData.status, status: false, message: message, errors: errors };
        });
        return result;
    }

    async getRequest(url, body: any = {}, header: any = {}, token?: string) {
        const result = await axios.get(`${BASE_URL}${url}`, {
            params: body,
            headers: {
                ...header,
                Authorization: `Bearer ${token ? token : this.token}`,
            },
        }).then((response) => {
            // return { data: response.data, status: response.status };
            return { code: response.status, status: true, message: response.data.message, data: response.data.data, extra: response?.data?.extras, pagination: response.data.pagination ? response.data.pagination : [] };
        }).catch((error) => {
            // console.log(`error for ${url}`);
            // console.log(error);
            // return { data: error.response.data.errors, status: -1 };
            var errors = {};
            var message = 'Something went wrong, please try again later.';
            // const errorResponseData = error.response.data;
            // if (errorResponseData.status == 422 && errorResponseData.errors) {
            // 	for (let key in errorResponseData.errors) Object.assign(errors, { [key]: errorResponseData.data[key][0] });
            // } else {
            // 	if (errorResponseData.data) message = Array.isArray(errorResponseData.data) ? JSON.stringify(errorResponseData.data) : errorResponseData.data;
            // 	else if (errorResponseData.message) message = errorResponseData.message;
            // }
            // return { code: errorResponseData.status, status: false, message: message, errors: errors };
            return { code: 422, status: false, message: message, errors: errors };
        });
        return result;
    }

    async deleteRequest(url, header: any = {}, token?: string) {
        console.log("the data for auth", this.token);
        const headers = {
            Authorization: "Bearer " + token ? token : this.token,
        };
        const result = await axios.delete(`${BASE_URL}${url}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).then((response) => {
            return { data: response.data, status: response.status };
        }).catch((error) => {
            return error.response ? { data: error.response.data.errors, status: -1 } : { data: undefined, status: -1 };
        });
        return result;
    }

    // handleResponse(response: any) {
    // 	var status = true;
    // 	var message = 'Something went wrong, please try again later.';
    // 	var errors = {};
    // 	var data = [];
    // 	if (response.status == -1) {
    // 		status = false;
    // 		for (let key in response.data) {
    // 			Object.assign(errors, { [key]: response.data[key][0] });
    // 		}
    // 	}
    // 	if (response.status == 200) {
    // 		status = true;
    // 		message = response.data.message ?? '';
    // 		data = response.data.data;
    // 	} else {
    // 		status = false;
    // 		if (response.data) message = Array.isArray(response.data) ? JSON.stringify(response.data) : response.data;
    // 		else if (response.errors) message = Array.isArray(response.errors) ? JSON.stringify(response.errors) : response.errors;
    // 		else if (response.message) message = response.message;
    // 		console.log('response for the error=>', response);
    // 	}
    // 	return { code: response.status, status: status, message: message, data: data, errors: errors };
    // }
}
