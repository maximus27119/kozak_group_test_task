const validator = require('validator');
const ApiError = require("../exceptions/api-error");
const employeeService = require("../services/employee-service");

class EmployeeController{
    async insert(req, res, next){
        try {
            const {fullname, gender, contacts, salary, position} = req.body;
            let isDataValid = true;

            if(!fullname || validator.isEmpty(fullname) || !position || validator.isEmpty(position)){
                isDataValid = false; // Не правильное имя или должность
            }
                
            if(!isDataValid)
                return next(ApiError.BadRequest("Ошибка при валидации"));

            const result = await employeeService.insert({
                fullname,
                gender,
                contacts,
                salary,
                position
            });
            
            return res.json(result);
        }catch(e){
            next(e);
        }
    }

    async list(req, res, next){
        try{
            const { query } = req;
            
            let match = query.filter ? JSON.parse(query.filter) : {};
            let sort  = query.sort   ? JSON.parse(query.sort)   : { createdAt: 1};
            let range = query.range  ? JSON.parse(query.range)  : [0, 20];
            
            const result = await employeeService.list({match, sort, range})

            res.json(result);
        }catch(e){
            next(e);
        }
    }

    async getById(req, res, next){
        try{
            const employeeId = req.params.id;
            const result = await employeeService.getById(employeeId);
            res.json(result);
        }catch(e){
            next(e);
        }
    }

    async patchById(req, res, next){
        try{
            const data = req.body;
            const updates = Object.keys(data);
            const allowedUpdates = ['fullname', 'gender', 'contacts', 'salary', 'position'];
    
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update);
            });
    
            if(!isValidOperation){
                throw ApiError.BadRequest('Не правильный атрибут для обновления');
            }
        
            const id = req.params.id;
            
            const result = await employeeService.patchById(id, data);
            
            res.json(result);
        }catch(e){
            next(e);
        }
    }

    async removeById(req, res, next){
        try{
            const employeeId = req.params.id;
            const result = await employeeService.removeById(employeeId);
            res.json(result);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new EmployeeController();