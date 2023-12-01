const { VarChar,Int ,Date} = require("mssql");
const { DTOCustomerResponses } = require("../entity/DTOCustomerResponses");


const { Conection } = require("./Connection");

class DataCustomerResponses
{
    //SET
    static  registerResponse=async(dtoresponse)=>
    {
        let {ResponseText ,
            QuestionID ,CustomerID}=dtoresponse;
        let resultquery;


        let queryinsert = `

        DECLARE @ResponseText VARCHAR(1000) = '${ResponseText}';
        DECLARE @QuestionID int =${QuestionID};
        DECLARE @CustomerID int =${CustomerID};

        IF NOT EXISTS (SELECT QuestionID 
           FROM Questions WHERE QuestionID = @QuestionID)
        BEGIN
            SELECT -1 AS notexistquestion
            RETURN;
        END

        IF NOT EXISTS (SELECT CustomerID 
            FROM Customers WHERE CustomerID = @CustomerID)
         BEGIN
             SELECT -2 AS notexistcustomer
             RETURN;
         END
            INSERT INTO CustomerResponses (ResponseText,QuestionID,CustomerID)
            VALUES (@ResponseText, @QuestionID,@CustomerID);
                
           SELECT 1 AS insertsuccess;
        
        
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistquestion;
            if(resultquery===undefined)
            { 
                resultquery = result.recordset[0].notexistcustomer;
                if(resultquery===undefined)
                { 
                    resultquery = result.recordset[0].insertsuccess;
               
                }
            }
        pool.close();
        return resultquery;
        
    }

    static  updateTextResponse=async(ResponseID,ResponseText)=>
     {
        
         let resultquery;
         let queryinsert = `
 

         DECLARE @ResponseID INT = ${ResponseID};
         DECLARE @ResponseText varchar(1000) = '${ResponseText}';
         
       
     
         IF NOT EXISTS (SELECT ResponseID 
            FROM CustomerResponses WHERE ResponseID = @ResponseID)
         BEGIN
             SELECT -1 AS notexistresponse
             RETURN;
         END
            
         UPDATE CustomerResponses
         SET ResponseText = @ResponseText
         WHERE ResponseID = @ResponseID;
                 
        SELECT 1 AS updatesuccess;
         
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistresponse;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].updatesuccess;
    
             }
         pool.close();
         return resultquery;
         
     }
     //GET

     static  getResponseById=async(ResponseID)=>
     {
 
 
         let resultquery;
 
         let queryinsert = `
 
         DECLARE @ResponseID INT = ${ResponseID};
         
         IF NOT EXISTS (SELECT ResponseID 
            FROM CustomerResponses WHERE ResponseID = @ResponseID)
         BEGIN
             SELECT -1 AS notexistresponse
             RETURN;
         END
        
             SELECT 
                  R.ResponseID, 
                  R.ResponseText,
                  R.QuestionID, 
                 Q.QuestionText,
                 R.CustomerID, 
                 C.Name
                
             FROM CustomerResponses R
             INNER JOIN Questions Q ON R.QuestionID = Q.QuestionID
             INNER JOIN Customers C ON R.CustomerID = C.CustomerID
             WHERE ResponseID = @ResponseID;
        
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          resultquery = result.recordset[0].notexistresponse;
          if(resultquery===undefined)
          {
                 let dtoresponse = new DTOCustomerResponses();   
                 this.getInformation(dtoresponse,result.recordset[0]);
                 resultquery=dtoresponse;
 
         }
      return resultquery;
         
     }
     static  getAllRespones=async()=>
     {
 
 
         let arrayn=[];
 
         let queryinsert = `
        
         SELECT 
         R.ResponseID, 
         R.ResponseText,
         R.QuestionID, 
        Q.QuestionText,
        R.CustomerID, 
        C.Name
       
    FROM CustomerResponses R
    INNER JOIN Questions Q ON R.QuestionID = Q.QuestionID
    INNER JOIN Customers C ON R.CustomerID = C.CustomerID
   
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          for (let re of result.recordset) {
             let dtoresponse = new DTOCustomerResponses();   
             this.getInformation(dtoresponse,re);
             arrayn.push(dtoresponse);
          }
           return arrayn;
 
      
 
         
     }
     static  getResponseByQuestion=async(QuestionID)=>
     {
 
 
         let resultquery;
 
         let queryinsert = `
 
         DECLARE @QuestionID INT = ${QuestionID};
         
             SELECT 
                  R.ResponseID, 
                  R.ResponseText,
                  R.QuestionID, 
                 Q.QuestionText,
                 R.CustomerID, 
                 C.Name
                
             FROM CustomerResponses R
             INNER JOIN Questions Q ON R.QuestionID = Q.QuestionID
             INNER JOIN Customers C ON R.CustomerID = C.CustomerID
             WHERE R.QuestionID = @QuestionID;
        
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          resultquery = result.recordset[0].notexistresponse;
          if(resultquery===undefined)
          {
                 let dtoresponse = new DTOCustomerResponses();   
                 this.getInformation(dtoresponse,result.recordset[0]);
                 resultquery=dtoresponse;
 
         }
      return resultquery;
         
     }

     static getInformation(dtoresponse, result) {
        
        dtoresponse.ResponseID = result.ResponseID;
        dtoresponse.ResponseText = result.ResponseText;
        dtoresponse.QuestionID = result.QuestionID;
        dtoresponse.QuestionText = result.QuestionText;
        dtoresponse.CustomerID = result.CustomerID;
        dtoresponse.CustomerName = result.Name;
      
       
    }
}
module.exports = { DataCustomerResponses };