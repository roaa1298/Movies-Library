'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const axios=require('axios');
const moviesData=require('./Movie_Data/data.json');

const PORT=process.env.PORT;

const server=express();
server.use(cors());


server.get('/',handleHomePage);
server.get('/favorite',handleFavorate);
server.get('/trending',handletrending);
server.get('/search',handleSearch);
server.get('/new',searchNew);
server.get('/Rings',searchRings);
server.use('*',handleNotFound);
server.use(errorHandler);
let url=`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;

let word="2022";
let word2="Rings";



function Movie(id,title,poster_path,overview,release_date){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
    this.id=id;
    this.release_date=release_date;
}

function handleFavorate(req,res){
    return res.status(200).send("Welcome to Favorite Page");
}

function handleHomePage(req,res){
let movie=new Movie(moviesData.title,moviesData.poster_path,moviesData.overview);
res.status(200).json(movie);
}

function handletrending(req,res){
    axios.get(url).then((data)=>{
        let spiderman=new Movie(data.data.results[0].id,data.data.results[0].title,data.data.results[0].poster_path,data.data.results[0].overview,data.data.results[0].release_date);
        res.status(200).json(spiderman);
    }).catch((err)=>{
        errorHandler(err,req,res);
    });
}
function handleSearch(req,res){
    let url2=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=The&page=2`;
    axios.get(url2).then(result=>{
        let mov=result.data.results;
        res.status(200).json(mov);
    }).catch((err)=>{
        errorHandler(err,req,res);
    });
}

function searchNew(req,res){
    let url3=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${word}&page=2`;
    axios.get(url3).then(result=>{
        let newFilms=result.data.results;
        res.status(200).json(newFilms);
    }).catch((err)=>{
        errorHandler(err,req,res);
    });
}

function searchRings(req,res){
    let url4=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${word2}&page=2`;
    axios.get(url4).then(result=>{
        let rings=result.data.results;
        res.status(200).json(rings);
    }).catch((err)=>{
        errorHandler(err,req,res);
    });
}

function errorHandler(error,req,res){
    const err={
        status : 500 ,
        message : error
    }
    res.status(500).send(err);
}

function handleNotFound(req,res){
    res.status(404).send("this page does not exist!");
}


server.listen(PORT,()=>{
    console.log("listening to port 3000");
});

