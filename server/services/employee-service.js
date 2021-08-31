const Employee = require('../models/employee-model');

class EmployeeService {
    async insert(employee){
        const createdEmployee = await new Employee(employee).save();
        return createdEmployee;
    }

    async list({match = {}, sort = '', range = [0, 20]}){
        let offset = range[0];
        let limit = range[1] + 1 - offset;

        const employees = await Employee.find(match).sort(sort).limit(limit);
        return employees;
    }

    async getById(id){
        const employee = await Employee.findById(id);
        return employee;
    }

    async patchById(id, employeeData){
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, {new: true});
        return updatedEmployee;
    }

    async removeById(id){
        const removedEmployee = await Employee.findByIdAndDelete(id);
        return removedEmployee;
    }
}

module.exports = new EmployeeService();