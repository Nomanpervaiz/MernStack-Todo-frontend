const dev = 'http://localhost:4000/'
const prod = 'https://mern-stack-todo-backend.vercel.app/'
const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
    task: BASE_URL + "task",
}