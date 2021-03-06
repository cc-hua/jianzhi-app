var db = require('../db');
var apiResult = require('../utils/apiResult');

module.exports={
    reg(app){
        // 后台登录
        app.get('/adminlogin',(req,res)=>{
            let username = req.query.username;
            let password = req.query.password;
            var sql = `select * from administrator where admin = '${username}' and pass = '${password}'`;
            db.DBHelper.handle(sql,result=>{
                // console.log(result.length);
                if(result.length>0){
                     res.send(apiResult(true,username,'登录成功'));
                }else{
                    res.send(apiResult(false,null,'登录信息错误'));
                }
            })
        });
        // 前端首页信息条件查询
        app.get('/index_word',(req,res)=>{
            let region = req.query.region;
            let type = req.query.type;
            let kind = req.query.kind;
            var sql = "select SQL_CALC_FOUND_ROWS * from worksheet where 1=1";
            if(region){
                sql +=` and region ='${region}'`
            }
            if(type){
                sql +=` and type ='${type}'`
            }
            if(kind){
                sql +=` and kind ='${kind}'`
            }
            sql += "; select FOUND_ROWS() as rowsCount;";
            db.DBHelper.handle(sql,function(result){
                res.send(apiResult(true,result));
            })
        });
        // 模糊查询
        app.get('/searchgoods',(req,res)=>{
            let sqlname =req.query.sqlname;
            let region = req.query.region;
            let type = req.query.type;
            let name = req.query.name;
            var sql = `select * from worksheet where concat(region, type,name) like '%${sqlname}%'`;
            sql += "; select FOUND_ROWS() as rowsCount;";
            db.DBHelper.handle(sql,function(result){
                res.send(apiResult(true,result));
            })
        });
    }    
}