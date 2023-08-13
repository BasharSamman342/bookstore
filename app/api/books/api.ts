import {API} from "@/helpers/API"
import axios from "axios";

export class BookStore
{
    API;
    baseurl;
    constructor() {
        this.API = new API()
        this.baseurl  = "http://157.175.176.124/api/";
    }
    async getStatistics()
    {
        const result = await axios.get(`${this.baseurl}statistics` )
            .then((response) => {
            return { code: response.status, status: true, message: response.data.message, data: response.data.data, extra: response?.data?.extras, pagination: response.data.pagination ? response.data.pagination : [] };
        }).catch((error) => {
            var errors = {};
            var message = 'Something went wrong, please try again later.';
            return { code: 422, status: false, message: message, errors: errors };
        });
        return result;
    }
}