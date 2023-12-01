const { VarChar,Int ,Date} = require("mssql");
const { DTOSurvey } = require("../entity/DTOSurvey");


const { Conection } = require("./Connection");

class DataSurvey
{

     //SET

     static  registerSurvey=async(dtosurvey)=>
     {
         let {Title ,
            Descriptionn ,StartDate,EndDate}=dtosurvey;
         let resultquery;
         let queryinsert = `

         DECLARE @Title VARCHAR(100) = '${Title}';
         DECLARE @Descriptionn VARCHAR(500) = '${Descriptionn}';
         DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';
        

             IF @EndDate <= @StartDate
            BEGIN
                  SELECT -1 AS DateError
                  RETURN;
             END

      
             INSERT INTO Surveys (Title, Descriptionn, StartDate, EndDate)
             VALUES (@Title, @Descriptionn, @StartDate,@EndDate);
                 
            SELECT 1 AS insertsuccess;
         
         
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].DateError;
             if(resultquery===undefined)
             { 
                 resultquery = result.recordset[0].insertsuccess;
            
             }
         pool.close();
         return resultquery;
         
     }
     static  updateSurveyNameDescription=async(SurveyID,Title,Descriptionn)=>
     {
        
         let resultquery;
         let queryinsert = `
 
         declare @SurveyID int = ${SurveyID};
         DECLARE @Title VARCHAR(100) = '${Title}';
         DECLARE @Descriptionn VARCHAR(500) = '${Descriptionn}';

          IF NOT EXISTS (SELECT SurveyID 
             FROM Surveys WHERE SurveyID = @SurveyID)
          BEGIN
              SELECT -1 AS notexistsurvey
              RETURN;
          END

             UPDATE Surveys SET
             Title = @Title,
             Descriptionn = @Descriptionn
             WHERE SurveyID = @SurveyID;

             select 1 as updatesucess
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistsurvey;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].updatesucess;
                 
             }
         pool.close();
         return resultquery;
         
     }
     static  updateEndDateSurvey=async(SurveyID,End_date)=>
     {
        
         let resultquery;
         let queryinsert = `
 

         DECLARE @SurveyID INT = ${SurveyID};
         DECLARE @EndDate DATE = '${End_date}';
         
       
         IF EXISTS (SELECT 1 FROM Surveys WHERE SurveyID = @SurveyID)
         BEGIN
          
             IF @EndDate > (SELECT StartDate FROM Surveys WHERE SurveyID = @SurveyID)
             BEGIN
            
                 UPDATE Surveys
                 SET EndDate = @EndDate
                 WHERE SurveyID = @SurveyID;
                 
                 SELECT 1 AS updatesuccess;
             END
             ELSE
             BEGIN
                 SELECT -2 AS DateError;
             END
         END
         ELSE
         BEGIN
             SELECT -1 AS SurveyIDNotFound;
         END
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].updatesuccess;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].SurveyIDNotFound;
                 if(resultquery===undefined)
                 {  
                     resultquery = result.recordset[0].DateError;
                 }
             }
         pool.close();
         return resultquery;
         
     }


      //GET

      static  getSurveyById=async(SurveyID)=>
      {
          let resultquery;
  
          let queryinsert = `
  
          DECLARE @SurveyID INT = ${SurveyID};

          IF NOT EXISTS (SELECT 1 FROM Surveys WHERE SurveyID = @SurveyID)
          BEGIN
              SELECT -1 AS SurveysNotFound;
          END
          ELSE
          BEGIN
              c
              WHERE SurveyID = @SurveyID;
          END
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           resultquery = result.recordset[0].SurveysNotFound;
           if(resultquery===undefined)
           {
                  let dtosurvey = new DTOSurvey();   
                  this.getInformation(dtosurvey,result.recordset[0]);
                  resultquery=dtosurvey;
  
          }
       return resultquery;
          
      }

      static  getAllSurvey=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
                SELECT 
                S.SurveyID, 
                S.Title,
                S.Descriptionn,
                S.StartDate,
                S.EndDate
                
            FROM Surveys S
                    
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtosurvey = new DTOSurvey();   
             this.getInformation(dtosurvey,re);
             arrayn.push(dtosurvey);
          }
           return arrayn;
      
          
      }
      static  getActiveSurvey=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
                SELECT 
                S.SurveyID, 
                S.Title,
                S.Descriptionn,
                S.StartDate,
                S.EndDate
            FROM Surveys S
            WHERE GETDATE() BETWEEN StartDate AND EndDate;
         
  
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtosurvey = new DTOSurvey();   
             this.getInformation(dtosurvey,re);
             arrayn.push(dtosurvey);
          }
           return arrayn;
      
          
      }
      static  getSurveysByDate=async(StartDate,EndDate)=>
      {

        let arrayn=[];
  
          let queryinsert = `
  
          DECLARE @StartDate DATE = '${StartDate}';
          DECLARE @EndDate DATE = '${EndDate}';

          SELECT 
          S.SurveyID, 
          S.Title,
          S.Descriptionn,
          S.StartDate,
          S.EndDate
            FROM Surveys S
          WHERE StartDate >= @StartDate AND EndDate <= @EndDate;
     
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtosurvey = new DTOSurvey();   
             this.getInformation(dtosurvey,re);
             arrayn.push(dtosurvey);
          }
           return arrayn;
      }
      static  getCurrentSurveys=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
                SELECT 
                S.SurveyID, 
                S.Title,
                S.Descriptionn,
                S.StartDate,
                S.EndDate
            FROM Surveys S
            WHERE GETDATE() BETWEEN StartDate AND EndDate;
         
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtosurvey = new DTOSurvey();   
             this.getInformation(dtosurvey,re);
             arrayn.push(dtosurvey);
          }
           return arrayn;
      
          
      }
      static  getFinishedSurveys=async()=>
      {
 
 
          let arrayn=[];
  
          let queryinsert = `
  
                SELECT 
                S.SurveyID, 
                S.Title,
                S.Descriptionn,
                S.StartDate,
                S.EndDate
            FROM Surveys S
            WHERE GETDATE() > EndDate;
         
          `
          let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtosurvey = new DTOSurvey();   
             this.getInformation(dtosurvey,re);
             arrayn.push(dtosurvey);
          }
           return arrayn;
      
          
      }

      static getInformation(dtosurvey, result) {
        
        dtosurvey.SurveyID = result.SurveyID;
        dtosurvey.Title = result.Title;
        dtosurvey.Descriptionn = result.Descriptionn;
       
        dtosurvey.StartDate = result.StartDate;
        dtosurvey.EndDate = result.EndDate;



        
    }
}
module.exports = { DataSurvey };