'use strict';
import axios from 'axios';

export class JsonPixabayApi {
    static BASE_URL = 'https://pixabay.com';
    static API_KEY = '32875866-ed83e1256a465fed3b39929d3';
    constructor() { 
        this.page = 1;
        this.query = null;
    }
    
    async fetchRequest() {
        // const searchParams = new URLSearchParams({
        //     key: JsonPixabayApi.API_KEY,
        //     q: this.query,
        //     image_type: 'photo',
        //     orientation: 'horizontal',
        //     safesearch: true,
        //     per_page: '40',
        //     page: this.page,
        // });
        const searchParams = {
            params: {
            key: JsonPixabayApi.API_KEY,
            q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: '40',
            page: this.page,
            }
        };

        const { data } = await axios.get(`${JsonPixabayApi.BASE_URL}/api/`, searchParams);
        // console.log(data);
        return data;

        // return fetch(`${JsonPixabayApi.BASE_URL}/api/?${searchParams}`)
        // .then(response => {
        //     // console.log(response.json());
        //     if (!response.ok) {
                
        //         throw new Error(response.status);
        //     };

        //     return response.json();
        // });
        
    };

};
