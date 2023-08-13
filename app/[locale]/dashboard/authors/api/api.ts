import {API} from "@/helpers/API";

export class AuthorApi
{
    token: string;
    API: API;

    constructor(token?: string) {
        if (token) {
            this.token = token;
            this.API = new API(this.token);
        }
    }

    async getAllAuthors(page)
    {
        const response = await this.API.getRequest(`authors?page=${page}`)
        return response
    }

    async getAuthorDetails(id)
    {
        const response = await this.API.getRequest(`authors/${id}`)
        return response
    }

    async addNewAuthor({first_name,last_name,email,password,birthdate}) {
        const response = await this.API.postRequest(`authors`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            birthdate: birthdate,
        }, {}, this.token)
        return response
    }

    async updateAuthor({first_name,last_name,email,password,birthdate,id}) {
        const response = await this.API.postRequest(`authors/${id}`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            birthdate: birthdate,
            _method:'PUT'
        }, {}, this.token)
        return response
    }

    async deleteAuthor(id) {
        const response = await this.API.deleteRequest(`authors/${id}`)
        return response
    }
}