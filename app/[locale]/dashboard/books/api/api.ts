import {API} from "@/helpers/API";

export class BookApi
{
    token: string;
    API: API;

    constructor(token?: string) {
        if (token) {
            this.token = token;
            this.API = new API(this.token);
        }
    }

    async getAllBooks(page)
    {
        const response = await this.API.getRequest(`books?page=${page}`)
        return response
    }

    async getBookDetails(id)
    {
        const response = await this.API.getRequest(`books/${id}`)
        return response
    }

    async getAuthors()
    {
        const response = await this.API.getRequest(`authors`)
        return response
    }

    async getGenres()
    {
        const response = await this.API.getRequest(`genres`)
        return response
    }

    async addNewBook({title,
    author_id,
    genre_id,
    publication_date,
    description}) {
        const response = await this.API.postRequest(`books`, {
            title: title,
            author_id: author_id,
            genre_id: genre_id,
            publication_date: publication_date,
            description: description
        }, {}, this.token)
        return response
    }

    async updateBook({title,
                         author_id,
                         genre_id,
                         publication_date,
                         description,id}) {
        const response = await this.API.postRequest(`books/${id}`, {
            title: title,
            author_id: author_id,
            genre_id: genre_id,
            publication_date: publication_date,
            description: description,
            _method:'PUT'
        }, {}, this.token)
        return response
    }

    async deleteBook(id) {
        const response = await this.API.deleteRequest(`books/${id}`)
        return response
    }
}