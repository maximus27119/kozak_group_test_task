import $api from '../http';

export default class employeeService{
    static async insert(employee) {
        return $api.post('/employees', employee);
    }
    
    static async list() {
        return $api.get('/employees');
    }
    
    static async quickSearch(word) {
        return $api.get(`/employees?filter={"fullname":{"$regex":".*${word || ''}.*"}}`);
    }
    
    static async getById(id) {
        return $api.get(`/employees/${id}`);
    }
    
    static async patchById(id, data) {
        return $api.patch(`/employees/${id}`, data);
    }
    
    static async removeById(id) {
        return $api.delete(`/employees/${id}`);
    }
}