import axios from 'redaxios';
// here we use light-wight fetch wrapper instead of default axios, but we can use default '@nuxtjs/axios'
const $axios = axios.create({});
export default $axios
