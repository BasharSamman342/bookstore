import {API} from "@/helpers/API";

export class GenreApi
{
    token: string;
    API: API;

    constructor(token?: string) {
        if (token) {
            this.token = token;
            this.API = new API(this.token);
        }
    }

    async getAllGenres(page)
    {
        const response = await this.API.getRequest(`genres?page=${page}`)
        return response
    }

    async getGenreDetails(id)
    {
        const response = await this.API.getRequest(`genres/${id}`)
        return response
    }

    async addNewGenre({name}) {
        const response = await this.API.postRequest(`genres`, {
            name: name,
        }, {}, this.token)
        return response
    }

    async updateGenre({name,id}) {
        const response = await this.API.postRequest(`genres/${id}`, {
            name: name,
            _method:'PUT'
        }, {}, this.token)
        return response
    }

    async deleteGenre(id) {
        const response = await this.API.deleteRequest(`genres/${id}`)
        return response
    }
}