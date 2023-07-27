
import dotenv from 'dotenv';
dotenv.config();
// kich hoat mysql
import mysql from 'mysql';
var mySQL = mysql.createConnection({
    host     : process.env.MY_SQL_HOST,
    user     : process.env.MY_SQL_USER_NAME,
    password : process.env.MY_SQL_PASSWORD,
    database : process.env.MY_SQL_DATABASE_NAME
  });

  function mysqlConnect(){
    try{
        mySQL.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return;
            }
           
            console.log('connected mySQL');
          });
          

    }catch(err){
        console.log("loi cu phap")

    }
  }

module.exports = {
    mysqlConnect,
    mySQL
}