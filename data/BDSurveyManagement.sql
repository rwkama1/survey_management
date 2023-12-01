USE survey_management
go

---------------------------------------------
----TABLES

CREATE TABLE Surveys (
    SurveyID INT NOT NULL PRIMARY KEY Identity(1,1),
    Title varchar(100) NOT NULL ,
    Descriptionn varchar(500) NOT NULL ,
    StartDate DATE not null,
    EndDate DATE not null
);
go
CREATE TABLE Questions (
    QuestionID INT NOT NULL PRIMARY KEY Identity(1,1),
    QuestionText varchar(1000) not null,
 
	SurveyID INT  FOREIGN KEY REFERENCES Surveys(SurveyID) not null,
   
);
go
CREATE TABLE Customers (
    CustomerID INT NOT NULL PRIMARY KEY Identity(1,1),
    Name VARCHAR(50) not null,
    Email VARCHAR(100) not null,
  
);
go
CREATE TABLE CustomerResponses (
    ResponseID INT NOT NULL PRIMARY KEY Identity(1,1),
    ResponseText VARCHAR(1000) not null,
	QuestionID INT  FOREIGN KEY REFERENCES Questions(QuestionID) not null,
	CustomerID INT  FOREIGN KEY REFERENCES Customers(CustomerID) not null,

    
);
go

select * from surveys
select * from questions
select * from customers
select * from CustomerResponses


