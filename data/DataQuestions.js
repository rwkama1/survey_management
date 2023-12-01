const { VarChar,Int ,Date} = require("mssql");
const { DTOQuestions } = require("../entity/DTOQuestions");



const { Conection } = require("./Connection");

class DataQuestions
{
     //SET

     static  registerQuestions=async(QuestionText,SurveyID)=>
     {
         let resultquery;
         let queryinsert = `

         DECLARE @QuestionText VARCHAR(1000) = '${QuestionText}';
         DECLARE @SurveyID int =${SurveyID};

         IF NOT EXISTS (SELECT SurveyID 
            FROM Surveys WHERE SurveyID = @SurveyID)
         BEGIN
             SELECT -1 AS notexistsurvey
             RETURN;
         END
             INSERT INTO Questions (QuestionText,SurveyID)
             VALUES (@QuestionText, @SurveyID);
                 
            SELECT 1 AS insertsuccess;
         
         
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistsurvey;
             if(resultquery===undefined)
             { 
                 resultquery = result.recordset[0].insertsuccess;
            
             }
         pool.close();
         return resultquery;
         
     }
     static  updateTextQuestion=async(QuestionID,QuestionText)=>
     {
        
         let resultquery;
         let queryinsert = `
 

         DECLARE @QuestionID INT = ${QuestionID};
         DECLARE @QuestionText varchar(1000) = '${QuestionText}';
         
       
     
         IF NOT EXISTS (SELECT QuestionID 
            FROM Questions WHERE QuestionID = @QuestionID)
         BEGIN
             SELECT -1 AS notexistquestion
             RETURN;
         END
            
         UPDATE Questions
         SET QuestionText = @QuestionText
         WHERE QuestionID = @QuestionID;
                 
        SELECT 1 AS updatesuccess;
         
 
           `;
           let pool = await Conection.conection();
             const result = await pool.request()
             .query(queryinsert)
             resultquery = result.recordset[0].notexistquestion;
             if(resultquery===undefined)
             {  
                 resultquery = result.recordset[0].updatesuccess;
    
             }
         pool.close();
         return resultquery;
         
     }

     //GET
     static  getQuestionBySurvey=async(SurveyID)=>
     {
         let arrayn=[];
 
         let queryinsert = `
 
         DECLARE @SurveyID INT = ${SurveyID};

            SELECT 
            Q.QuestionID, 
            Q.QuestionText,
            Q.SurveyID,
            S.Title
            FROM Questions Q
            INNER JOIN Surveys S ON Q.SurveyID = S.SurveyID
             WHERE Q.SurveyID = @SurveyID;
         
 
         `
         let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoquestion = new DTOQuestions();   
             this.getInformation(dtoquestion,re);
             arrayn.push(dtoquestion);
          }
           return arrayn;
      
         
     }
     static  getQuestionById=async(QuestionID)=>
     {
         let resultquery;
 
         let queryinsert = `
 
            DECLARE @QuestionID INT = ${QuestionID};


            IF NOT EXISTS (SELECT QuestionID 
                FROM Questions WHERE QuestionID = @QuestionID)
             BEGIN
                 SELECT -1 AS notexistquestion
                 RETURN;
             END

            SELECT 
            Q.QuestionID, 
            Q.QuestionText,
            Q.SurveyID,
            S.Title
            FROM Questions Q
            INNER JOIN Surveys S ON Q.SurveyID = S.SurveyID
             WHERE Q.QuestionID = @QuestionID;
         
 
         `
         let pool = await Conection.conection();
         const result = await pool.request()
          .query(queryinsert)
          resultquery = result.recordset[0].notexistquestion;
          if(resultquery===undefined)
          {
                 let dtoquestion = new DTOQuestions();   
                 this.getInformation(dtoquestion,result.recordset[0]);
                 resultquery=dtoquestion;
 
         }
      return resultquery;
         
     }
     static  getQuestionUnanswered=async()=>
     {
         let arrayn=[];
 
         let queryinsert = `
 
         

            SELECT 
            Q.QuestionID, 
            Q.QuestionText,
            Q.SurveyID
        
            FROM Questions Q
            LEFT JOIN CustomerResponses cr ON Q.QuestionID = cr.QuestionID
            WHERE cr.QuestionID IS NULL;
         
 
         `
         let pool = await Conection.conection();
          const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
             let dtoquestion = new DTOQuestions();   
             this.getInformation(dtoquestion,re);
             arrayn.push(dtoquestion);
          }
           return arrayn;
      
         
     }
     
     static getInformation(dtoquestion, result) {
        
        dtoquestion.QuestionID = result.QuestionID;
        dtoquestion.QuestionText = result.QuestionText;
        dtoquestion.SurveyID = result.SurveyID;
        dtoquestion.SurveyTitle = result.Title;
        
    }

}

module.exports = { DataQuestions };