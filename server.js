'use strict';

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const axios=require('axios');
const pg=require('pg');
const moviesData=require('./Movie_Data/data.json');

const PORT=process.env.PORT;
const client= new pg.Client(process.env.DATABASE_URL);

const server=express();
server.use(cors());
server.use(express.json());


server.get('/',handleHomePage);
server.get('/favorite',handleFavorate);
server.get('/trending',handletrending);
server.get('/search',handleSearch);
server.get('/new',searchNew);
server.get('/Rings',searchRings);
server.post('/addMovie',addMovieHandler);
server.get('/getMovies',getMovieHandler);
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

function addMovieHandler(req,res){
    const movieObj=req.body;
    let sql=`INSERT INTO myMovie(title,overview,release_date,poster_path,video,vote_count) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`
    let value=[movieObj.title,movieObj.overview,movieObj.release_date,movieObj.poster_path,movieObj.video,movieObj.vote_count];
    client.query(sql,value).then(data =>{
        res.status(200).json(data);
    }).catch(error =>{
        errorHandler(error,req,res);
    });
}
function getMovieHandler(req,res){
    let sql2=`SELECT * FROM myMovie;`;
    client.query(sql2).then(data =>{
            res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res);
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

client.connect().then(()=>{
    server.listen(PORT,()=>{
    console.log("listening to port 3000");
});
});


