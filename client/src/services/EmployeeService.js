import $api from '../http';

async function insert(employee) {
    try {
        const response = await $api.post('/employees', employee);
        return response;
    }catch(e){
        console.log(e);
    }
}

async function list() {
    try {
        const response = await $api.get('/employees');
        return response;
    }catch(e){
        console.log(e);
    }
}

async function getById(id) {
    try {
        const response = await $api.get(`/employees/${id}`);
        return response;
    }catch(e){
        console.log(e);
    }
}

async function patchById(id, data) {
    try {
        const response = await $api.patch(`/employees/${id}`, data);
        return response;
    }catch(e){
        console.log(e);
    }
}

async function removeById(id) {
    try {
        const response = await $api.delete(`/employees/${id}`);
        return response;
    }catch(e){
        console.log(e);
    }
}

export const employeeService = {
    insert,
    list,
    getById,
    patchById,
    removeById
};