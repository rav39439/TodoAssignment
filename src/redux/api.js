import axios from "axios";
const API = axios.create({
    baseURL: "https://todomangerapi.onrender.com",
    // baseURL: "http://localhost:5000", 

    headers: { "Content-Type": "application/json" } 
});
// const API=axios.create({baseURL:'https://stackoverflowcloneapi.onrender.com'})
export const logIn=(authData)=>API.post('/api/users/login',authData);
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const SignUp=(authData)=>API.post('/api/users/signup',authData);
export const addnewtask=(taskData)=>API.post('/api/tasks/add',taskData)
export const getalltasksforuser=(id)=>API.get(`/api/tasks/get/${id}`)
export const deletetask=(id)=>API.delete(`/api/tasks/delete/${id}`)
export const updatetask=(data,id)=>API.put(`/api/tasks/update/${id}`,data)
