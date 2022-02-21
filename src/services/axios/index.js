import axios from "axios";
// const port = (process && process.env.PORT) || 3030;
export const axiosBase = axios.create({
	baseURL: `https://booklike-app-jsdb-heroku.herokuapp.com/api`,
})
