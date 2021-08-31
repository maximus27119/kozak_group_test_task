import $api from '../http';

function insert(employee) {
    return $api.post('/employees', employee);
}

function list() {
    return $api.get('/employees');
}

function getById(id) {
    return $api.get(`/employees/${id}`);
}

function patchById(id, data) {
    return $api.patch(`/employees/${id}`, data);
}

function removeById(id) {
    return $api.delete(`/employees/${id}`);
}

export const employeeService = {
    insert,
    list,
    getById,
    patchById,
    removeById
};