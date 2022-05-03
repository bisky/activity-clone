import React, { useEffect, useRef, useState } from "react";
import axios from "../functModule/axios";
import '../styles/poster.css'
import styles from 'styled-components'
import { ModalPreview } from "./ModalPreview";
import { AiOutlineClose } from "react-icons/ai";
import {FaPlay, FaInfoCircle} from "react-icons/fa";

const base_url = "https://image.tmdb.org/t/p/original/";


const ModalBackground = styles.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);

`;

const ModalBody = styles.div`
    background-color: rgba(0,0,0,0.5);
    margin: 10% auto;
    padding: 5px;
    margin:10%;
`;

export default function Row({title, fetchUrl, isLargeRow}){
    
    const [movies, setMovies] = useState([]);

    const [state, setState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0
    });

    const ref = useRef();

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
        return request;
        }
        fetchData();
    }, [fetchUrl]);
    
    // onWheel
    useEffect(() => {
        const el = ref.current;
        
        if(el){
            const onWheel = e => {
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 4,
                    behavior: 'smooth'
                })
            }
            el.addEventListener('wheel', onWheel)
        }
    }, [])

    // onMouseMove EventListener
    const onMouseMove = e => {
        if(ref && ref.current && !ref.current.contains(e.target)){
            return
        }
        e.preventDefault()

        const {clientX, scrollX, isScrolling} = state 

        if(isScrolling){
            ref.current.scrollLeft = scrollX + e.clientX - clientX
            let sX = scrollX + e.clientX - clientX
            let cX = e.clientX
            setState({
                ...state,
                scrollX: sX,
                clientX: cX
            })
        }
    }
    const onMouseUp = e => {
        if(ref && ref.current && !ref.current.contains(e.target)){
            return
        }
        e.preventDefault()

        setState({
            ...state,
            isScrolling: false
        })
    }

    const onMouseDown = e => {
        if(ref && ref.current && !ref.current.contains(e.target)){
            return
        }
        e.preventDefault()

        setState({
            ...state,
            isScrolling: true,
            clientX: e.clientX
        })
    }



    useEffect(() => {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    })
    // end of event mouseMove

    const [shouldShow, setShouldShow] = useState(false);

    const [selected, setSelected] = useState([]);

 

    return(
        <div className="row"  
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove} >
            <h2>{title}</h2>
        
            <div className="poster" id="slider" 
                ref={ref}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}

            >
                {
                    movies.map((movie) => (
                        <React.Fragment key={movie.id} >
                          <img 
                            onClick={() => (
                                setShouldShow(true),
                                setSelected({id:movie.id, overview: movie.overview, 
                                    name: movie.original_name, 
                                    release_date: movie.release_date,
                                    cover: movie.backdrop_path
                                })
                            )}
                            className={`posters ${isLargeRow && "posterLarge"}` } 
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                            alt={movie.name} /> 
                         
                        </React.Fragment>
                    ))
                }
               
            {shouldShow && (
                <ModalBackground onClick={() => setShouldShow(false)}>
                    <ModalBody onClick={e => e.stopPropagation()}>
                      <div className="modal-container">
                       
                        {/* banner */}
                        {/* <header className="modalBanner"
                            style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${selected.cover}")`}} >
                       
                        <h4 className="modalText">{selected.release_date}</h4>
                        <h4 className="modalText">{selected.overview}</h4>
                        </header> */}
                        {/* end banner */}
                        <header className="modal-banner"
                            style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${selected.cover}")`}} >
                            <button className="btnModalClose" onClick={() => setShouldShow(false)}><AiOutlineClose /></button>

                           <div className="modal-banner-descri" >
                            <h1>{selected.name}</h1>
                                <div className="btnBanner">
                                    <button className="btnPlay"><FaPlay /> PLAY</button>&nbsp;
                                    <button className="btnInfo"><FaInfoCircle /> MORE INFO</button>
                                </div>
                           </div>
                        </header>
                           
                        <h4 className="modalText"><b style={{'color': 'green'}}>Date Released: </b>{selected.release_date}</h4>
                        <h4 className="modalText">{selected.overview}</h4>
                      </div>
                    </ModalBody>
                </ModalBackground>
            )}

            </div> 
            
        </div>
    )
}