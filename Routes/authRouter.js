const { register, login, adminlogin, getUsers } = require('../Controllers/authController');
const { taskAssign, getTask, updateTask, completedTask, getDailyReport, getMonthlyReport } = require('../Controllers/taskController');
const { checkUser } = require('../Middleware/authMiddleware');

const router = require('express').Router();

router.post('/',checkUser)
router.post('/register',register)
router.post('/login',login)
router.post('/admin',adminlogin)
router.get('/getusers',getUsers)
router.post('/taskassign',taskAssign)
router.post('/gettask',getTask)
router.post('/updatetask',updateTask)
router.post('/completedtask',completedTask)
router.post('/getdailyreport',getDailyReport)
router.post('/getmonthlyreport',getMonthlyReport)
module.exports = router;