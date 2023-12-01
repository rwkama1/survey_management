const { VarChar,Int ,Date} = require("mssql");
const { DTOCustomer } = require("../entity/DTOCustomer");

const { Conection } = require("./Connection");

class DataCustomer
{
    //SET

    static  registerCustomer=async(Name,Email)=>
    {
        let resultquery;
        let queryinsert = `

        DECLARE @Name VARCHAR(50) = '${Name}';
        DECLARE @Email VARCHAR(100) = '${Email}';

            IF @Email LIKE '%@%.%'
            AND @Email NOT LIKE '%@%@%'
            AND @Email NOT LIKE '%..%'
            AND PATINDEX('%[^a-zA-Z0-9.@_-]%', @Email) = 0
            AND LEN(@Email) - LEN(REPLACE(@Email, '.', '')) <= 1
            AND LEN(@Email) - LEN(REPLACE(@Email, '@', '')) = 1
            AND LEN(@Email) - LEN(REPLACE(@Email, '-', '')) <= 1
            AND RIGHT(@Email, 1) != '.'
            AND CHARINDEX('.', @Email) > CHARINDEX('@', @Email) + 1
            AND CHARINDEX('@', @Email) > 1
            BEGIN
                IF EXISTS (SELECT 1 FROM Customers WHERE Email = @Email)
                BEGIN
                    SELECT -2 AS duplicateemail;
                END
                ELSE
                BEGIN
                INSERT INTO Customers (Name, Email)
                VALUES (@Name, @Email);
                    
                    SELECT 1 AS insertsuccess;
                END
            END
            ELSE
            BEGIN
                SELECT -1 AS incorrectemail;
            END
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].duplicateemail;
            if(resultquery===undefined)
            { 
                resultquery = result.recordset[0].incorrectemail;
                if(resultquery===undefined)
                { 
                    resultquery = result.recordset[0].insertsuccess;
               
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  updateCustomerEmail=async(idcustomer,Email)=>
    {
       
        let resultquery;
        let queryinsert = `

            declare @CustomerID int = ${idcustomer};
            DECLARE @Email VARCHAR(100) = '${Email}';
           

            IF NOT EXISTS (SELECT CustomerID 
               FROM Customers WHERE CustomerID = @CustomerID)
            BEGIN
                SELECT -1 AS notexistcustomer
                RETURN;
            END
            IF @Email LIKE '%@%.%'
            AND @Email NOT LIKE '%@%@%'
            AND @Email NOT LIKE '%..%'
            AND PATINDEX('%[^a-zA-Z0-9.@_-]%', @Email) = 0
            AND LEN(@Email) - LEN(REPLACE(@Email, '.', '')) <= 1
            AND LEN(@Email) - LEN(REPLACE(@Email, '@', '')) = 1
            AND LEN(@Email) - LEN(REPLACE(@Email, '-', '')) <= 1
            AND RIGHT(@Email, 1) != '.'
            AND CHARINDEX('.', @Email) > CHARINDEX('@', @Email) + 1
            AND CHARINDEX('@', @Email) > 1
        BEGIN
            IF EXISTS (SELECT 1 FROM Customers WHERE Email = @Email)
            BEGIN
                SELECT -3 AS duplicateemail;
            END
            ELSE
            BEGIN
               UPDATE Customers SET
               Email = @Email
               WHERE CustomerID = @CustomerID;

               select 1 as updatesucess
            END
        END
        ELSE
        BEGIN
            SELECT -2 AS incorrectemail;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcustomer;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].incorrectemail;
                if(resultquery===undefined)
                {  
                    resultquery = result.recordset[0].duplicateemail;
                    if(resultquery===undefined)
                    {  
                        resultquery = result.recordset[0].updatesucess;
                    }
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  updateCustomerName=async(idcustomer,CustomerName)=>
    {
       
        let resultquery;
        let queryinsert = `

            declare @CustomerID int = ${idcustomer};
            DECLARE @Name VARCHAR(100) = '${CustomerName}';
           

             IF NOT EXISTS (SELECT CustomerID 
                FROM Customers WHERE CustomerID = @CustomerID)
             BEGIN
                 SELECT -1 AS notexistcustomer
             END
             ELSE
             BEGIN
                UPDATE Customers SET
                Name = @Name
                WHERE CustomerID = @CustomerID;

                select 1 as updatesucess
            END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcustomer;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
                
            }
        pool.close();
        return resultquery;
        
    }
    //GET
    static  getCustomerById=async(idcustomer)=>
    {


        let resultquery;

        let queryinsert = `

        DECLARE @CustomerID INT = ${idcustomer};
        
        IF NOT EXISTS (SELECT CustomerID 
           FROM Customers WHERE CustomerID = @CustomerID)
        BEGIN
            SELECT -1 AS notexistcustomer
            RETURN;
        END
       
            SELECT 
                C.CustomerID, 
                C.Name,
                C.Email
               
            FROM Customers C
            WHERE CustomerID = @CustomerID;
       

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         resultquery = result.recordset[0].notexistcustomer;
         if(resultquery===undefined)
         {
                let dtocustomer = new DTOCustomer();   
                this.getInformation(dtocustomer,result.recordset[0]);
                resultquery=dtocustomer;

        }
     return resultquery;
        
    }
    static  getCustomerByEmail=async(email)=>
    {


        let resultquery;

        let queryinsert = `

        DECLARE @Email varchar(100) ='${email}';
        
       
            SELECT 
                C.CustomerID, 
                C.Name,
                C.Email
               
            FROM Customers C
            WHERE Email = @Email;
       

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
        let dtocustomer = new DTOCustomer();   
        this.getInformation(dtocustomer,result.recordset[0]);
        resultquery=dtocustomer;

     
     return resultquery;
        
    }
    static  getAllCustomers=async()=>
    {


        let arrayn=[];

        let queryinsert = `
       
            SELECT 
                C.CustomerID, 
                C.Name,
                C.Email
               
            FROM Customers C

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtocustomer = new DTOCustomer();   
            this.getInformation(dtocustomer,re);
            arrayn.push(dtocustomer);
         }
          return arrayn;

     

        
    }
    static getInformation(dtocustomer, result) {
        
        dtocustomer.CustomerID = result.CustomerID;
        dtocustomer.Name = result.Name;
        dtocustomer.Email = result.Email;
       
    }
}

module.exports = { DataCustomer };