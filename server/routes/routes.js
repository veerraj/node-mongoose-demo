module.exports = (app)=>{
    const companyCtrl = require('../controllers/company.controller');
    const deptCtrl = require('../controllers/department.controller');
    const empCtrl = require('../controllers/employee.controller');
    const skillCtrl = require('../controllers/skills.controller');

    app.route('/company')
      .post(companyCtrl.addCompany)
      .get(companyCtrl.getCompanies);
    
    app.route('/department')
    .post(deptCtrl.addDepartment)
    .get(deptCtrl.getDepartments);


    app.route('/employee')
    .post(empCtrl.addEmployee)
    .get(empCtrl.getAllEmployee);

    app.route('/employee/:paramsId')
    .get(empCtrl.getEmployeeById);

    app.route('/skill')
    .post(skillCtrl.addSkills)
    .get(skillCtrl.getSkills);

}