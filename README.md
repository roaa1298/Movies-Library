# Movies-Library
# Movies-Library - 1

**Author Name**: Roaa hailat

## WRRC
![WRRC](./wrrc.jpg)

## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
first we shoulde install the cors and express packages and then we can use them for creating the server. before creating the server we use the methode **require('express')** and **require('cors')** to grabbing the main Express and cors module from the package we installed. and then we can create the server by using the **express()** function. then we use **server.get** to tell our Express server how to handle a **GET** request to our server. Express includes similar functions for **POST**, **PUT** , using **server.post** and **server.put**. the **get** function contain the name of the function that We can use it to read data about what the client is requesting to do. when we finish building the app we can run it using npm start.

There is another way to read the data other than the local data , by using API URLs it contain API key that is unique for every one and it has some of parameters we can use to manage the result we respond. we can use the **axios.get** to get the data from the url link, and we can get the response  by using **then** method and we can map through the data and get what we want from it inside the **then**. there is anothor method called **catch** it can catch any server error may happen from the url or API key maybe. we can create a function to handle the server error and we can call this function inside the **catch** method.  

There is a package called **pg** it is create a client to link it with the database that we have created it by using postgres , we installed the postgres in the ubuntu and then we created our database and writing some sql lines such as drop, creat, insert and so on to build our database . then we should connect the client to the database before the listen function. 

Today we used some sql statements to get or delete or update on the data :
- get data => using **GET**.
- delete data => using **DELETE**.
- update data => using **UPDATE**.
And we use the WHERE in the sql statement to put a condition to the data that we want to update or delete or get. we can use the parameters in the route to use it as condition to the data, these parameters are entered by the user.  

## Project Features
<!-- What are the features included in you app -->
- Easy to Use.
- Well Designed and Functional.
- Readily accessible contact and location.