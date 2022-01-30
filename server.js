'use strict';

const express=require('express');
const cors=require('cors');
const moviesData=require('./Movie_Data/data.json');

const server=express();
server.use(cors());


server.get('/',handleHomePage);
server.get('/favorite',handleFavorate);
server.get('*',handleNotFound);


function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}

function handleFavorate(req,res){
    return res.status(200).send("Welcome to Favorite Page");
}

function handleHomePage(req,res){
let movie=new Movie(moviesData.title,moviesData.poster_path,moviesData.overview);
res.status(200).json(movie);
}

function handleNotFound(req,res){
    res.status(404).send("this page does not exist!");
}


server.listen(3000,()=>{
    console.log("listening to port 3000");
});

