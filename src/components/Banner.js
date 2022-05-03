import React, { useEffect, useState } from "react";
import axios from '../functModule/axios'
import request from "../functModule/request";
import '../styles/banner.css'
import {FaPlay, FaInfoCircle} from "react-icons/fa";
// import  from "react-icons/ai";

export default function Banner(){

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const requests = await axios.get(request.fetchTrending);
            setMovies(requests.data.results[Math.floor(Math.random() * requests.data.results.length - 1)])
        }
        fetchData();
    }, []);

    function truncate(str, n){
        return str?.length > n?str.substr(0, n-1) + " " : str;
    }

    return(
        <header className="banner"
         style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`}} >
            <div className="content" >
                <h1>{movies?.title || movies?.name || movies?.original_name}</h1>
                <div className="btnBanner">
                    <button className="btnPlay"><FaPlay /> PLAY</button>&nbsp;
                    <button className="btnInfo"><FaInfoCircle /> MORE INFO</button>
                </div>
                <div className="description">
                    {truncate(movies?.overview, 150)}
                </div>
               
            </div>
            <div className="fade" style={{"marginLeft":0}}></div> 
        </header>
    )
}