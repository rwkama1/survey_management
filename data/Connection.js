const sql  = require("mssql");

 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama74_SQLLogin_1',
            password:'zdnkeek2bz',
            database: 'survey_management',
           server: 'survey_management.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };