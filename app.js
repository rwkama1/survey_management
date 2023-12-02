// const { DataCustomer } = require("./data/DataCustomer");
// const { DataCustomerResponses } = require("./data/DataCustomerResponses");
// const { DataQuestions } = require("./data/DataQuestions");
// const { DataSurvey } = require("./data/DataSurvey");
// const { DTOCustomerResponses } = require("./entity/DTOCustomerResponses");
// const { DTOSurvey } = require("./entity/DTOSurvey");

// #region SURVEY



// async function registerSurvey() {

//         for (let index = 1; index < 8; index++) {

//             let dtosurvey = new DTOSurvey();
//             dtosurvey.Title = "Title" + index.toString();
//             dtosurvey.Descriptionn = "Description" + index.toString();
//             dtosurvey.StartDate = `2023-12-02`;
//             dtosurvey.EndDate = `2023-12-19`;

//             let registerSurvey = await DataSurvey.registerSurvey(dtosurvey);
//             if (registerSurvey===-1) {
//                throw new
//              Error("The End Date must be higher than Start Date");
//               }
//                 console.log("Survey registered successfully");
//         }
//     }
//     registerSurvey().then()

// async function updateSurveyNameDescription() {

//   let SurveyID = 5;
//   let Title = "TitleUpdate";
//   let Descriptionn = "DescriptionnUpdate";

//   let updateSurveyNameDescription =
//    await DataSurvey.updateSurveyNameDescription(
//    SurveyID,Title,Descriptionn);
//   if (updateSurveyNameDescription===-1) {
//       throw new
//        Error("The Survey does not exists");
//   }
//   console.log("Survey updated successfully");
// }
// updateSurveyNameDescription().then()


// async function updateEndDateSurvey() {


//   let SurveyID = 5;
//   let EndDate = '2023-12-30';


//   let updateEndDateSurvey =
//    await DataSurvey.updateEndDateSurvey(SurveyID,EndDate);
//   if (updateEndDateSurvey===-1) {
//       throw new
//        Error("The Survey does not exists");
//   }
//   if (updateEndDateSurvey===-2) {
//       throw new
//       Error("The End Date must be higher than Start Date");
//   }
//   console.log("Survey updated successfully");
// }

// updateEndDateSurvey().then()




// async function getSurveyById() {

//   let getSurveyById =
//   await DataSurvey.getSurveyById(1);
//     if (getSurveyById===-1) {
//       throw new
//        Error("The Survey does not exists");
//   }
//   console.log(getSurveyById);
// }
// getSurveyById().then()



// async function getAllSurvey() {

//   let getAllSurvey =
//   await DataSurvey.getAllSurvey();

//   console.log(getAllSurvey);
// }
// getAllSurvey().then()


// async function getActiveSurvey() {

//   let getActiveSurvey =
//   await DataSurvey.getActiveSurvey();

//   console.log(getActiveSurvey);
// }
// getActiveSurvey().then()



// async function getSurveysByDate() {
//    let stardate=`2023-11-05`;
//    let enddate=`2023-12-20`;
//   let getSurveysByDate =
//   await DataSurvey.getSurveysByDate(stardate,enddate);

//   console.log(getSurveysByDate);
// }
// getSurveysByDate().then()


// async function getCurrentSurveys() {

//   let getCurrentSurveys =
//   await DataSurvey.getCurrentSurveys();

//   console.log(getCurrentSurveys);
// }
// getCurrentSurveys().then()



// async function getFinishedSurveys() {

//   let getFinishedSurveys =
//   await DataSurvey.getFinishedSurveys();

//   console.log(getFinishedSurveys);
// }
// getFinishedSurveys().then()





// #endregion SURVEY

// #region QUESTIONS

// async function registerQuestions() {

//         for (let index = 1; index < 8; index++) {

//             let QuestionText="QuestionText"+index.toString();
//             let SurveyID=index;

//             let registerQuestions = await DataQuestions.registerQuestions(QuestionText,SurveyID);
//             if (registerQuestions===-1) {
//                throw new
//              Error("Survey Not Found");
//               }
//                 console.log("Question registered successfully");
//         }
//     }
//     registerQuestions().then()


// async function updateTextQuestion() {

//   let QuestionID = 5;
//   let QuestionText = "QuestionTextUpdate";
 

//   let updateTextQuestion =
//    await DataQuestions.updateTextQuestion(
//     QuestionID,QuestionText);
//   if (updateTextQuestion===-1) {
//       throw new
//        Error("The Question does not exists");
//   }
//   console.log("Question updated successfully");
// }
// updateTextQuestion().then()


// async function getQuestionBySurvey() {

//   let getQuestionBySurvey =
//   await DataQuestions.getQuestionBySurvey(5);

//   console.log(getQuestionBySurvey);
// }
// getQuestionBySurvey().then()

// async function getQuestionById() {

//     let getQuestionById =
//     await DataQuestions.getQuestionById(1);
//     if (getQuestionById===-1) {
//       throw new
//        Error("The Question does not exists");
//   }
//     console.log(getQuestionById);
//   }
//   getQuestionById().then()
  
// async function getQuestionUnanswered() {

//   let getQuestionUnanswered =
//   await DataQuestions.getQuestionUnanswered();

//   console.log(getQuestionUnanswered);
// }
// getQuestionUnanswered().then()



// #endregion QUESTIONS

// #region CUSTOMER

// async function registerCustomer() {

//         for (let index = 1; index < 8; index++) {

//             let Name="CustomerName"+index.toString();
//             let Email=`email${index}@gmail.com`;

//             let registerCustomer = await DataCustomer.registerCustomer(Name,Email);
//             if (registerCustomer===-1) {
//                  throw new
//                   Error("Incorrect Email");
//                  }
//              if (registerCustomer===-2) {
//                  throw new
//                    Error("Email already exists in the system");
//                  }
//                 console.log("Customer registered successfully");
//         }
//     }
//     registerCustomer().then()

//        async function updateCustomerEmail() {

//         let idcustomer = 5;
//         let PhoneCustomer = "emailupdate@gmail.com";

//         let updateCustomerEmail =
//          await DataCustomer.updateCustomerEmail(idcustomer,PhoneCustomer);
//         if (updateCustomerEmail===-1) {
//             throw new
//              Error("The Customer does not exists");
//         }
//         if (updateCustomerEmail===-2) {
//             throw new
//             Error("Incorrect Email");
//         }
//         if (updateCustomerEmail===-3) {
//          throw new
//          Error("Email already exists in the system");

//         }

//         console.log("Customer updated successfully");
//     }
//     updateCustomerEmail().then()



//       async function updateCustomerName() {

//         let idcustomer = 1;
//         let customername = "CustomerUpdate";

//         let updateCustomerName =
//          await DataCustomer.updateCustomerName(idcustomer,customername);
//         if (updateCustomerName===-1) {
//             throw new
//              Error("The Customer does not exists");
//         }
//         console.log("Customer updated successfully");
//     }
//     updateCustomerName().then()




// async function getCustomerById() {

//     let getCustomerById =
//     await DataCustomer.getCustomerById(1);
//     if (getCustomerById===-1) {
//       throw new
//        Error("The Customer does not exists");
//   }
//     console.log(getCustomerById);
//   }
//   getCustomerById().then()
  



// async function getCustomerByEmail() {

//     let email="email3@gmail.com"

//     let getCustomerByEmail =
//     await DataCustomer.getCustomerByEmail(email);
   
//     console.log(getCustomerByEmail);
//   }
//   getCustomerByEmail().then()



// async function getAllCustomers() {

   

//     let getAllCustomers =
//     await DataCustomer.getAllCustomers();
   
//     console.log(getAllCustomers);
//   }
//   getAllCustomers().then()




// #endregion CUSTOMER


// #region  CUSTOMER RESPONSE

// async function registerResponse() {

//         for (let index = 1; index < 8; index++) {

//             let dtoresponse = new DTOCustomerResponses();
//             dtoresponse.ResponseText = "ResponseText" + index.toString();
//             dtoresponse.QuestionID = index;
//             dtoresponse.CustomerID = index;
           

//             let registerResponse = await DataCustomerResponses.registerResponse(dtoresponse);
//             if (registerResponse===-1) {
//                throw new
//              Error("Question not exists");
//               }
//               if (registerResponse===-2) {
//                 throw new
//               Error("Customer not exists");
//                }

//                 console.log("Response registered successfully");
//         }
//     }
//     registerResponse().then()



//       async function updateTextResponse() {

      
//   let ResponseID = 5;
//   let ResponseText = "ResponseTextUpdate";
 

//         let updateTextResponse =
//          await DataCustomerResponses.updateTextResponse(ResponseID,ResponseText);
//         if (updateTextResponse===-1) {
//             throw new
//              Error("The Response does not exists");
//         }
//         console.log("Response updated successfully");
//     }
//     updateTextResponse().then()


// async function getResponseById() {

//     let getResponseById =
//     await DataCustomerResponses.getResponseById(1);
//     if (getResponseById===-1) {
//       throw new
//        Error("The Response does not exists");
//   }
//     console.log(getResponseById);
//   }
//   getResponseById().then()




// async function getAllRespones() {
//     let getAllRespones =
//     await DataCustomerResponses.getAllRespones();
   
//     console.log(getAllRespones);
//   }
//   getAllRespones().then()
  
  
// async function getResponseByQuestion() {

//     let getResponseByQuestion =
//     await DataCustomerResponses.getResponseByQuestion(1);
  
//     console.log(getResponseByQuestion);
//   }
//   getResponseByQuestion().then()


// #endregion CUSTOMER RESPONSE
