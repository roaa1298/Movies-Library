DROP TABLE IF EXISTS myMovie;

CREATE TABLE IF NOT EXISTS myMovie (
    id SERIAL PRIMARY KEY ,
    title VARCHAR(255),
    overview VARCHAR(10000),
    release_date VARCHAR(255),
    poster_path VARCHAR(255),
    video BOOLEAN,
    vote_count INTEGER
);