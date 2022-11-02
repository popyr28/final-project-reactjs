import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useReducer, useState} from 'react'
import Header from './Header'
import Search from './Search'
import '../App.css'
import Movie from './Movie'
import Modal from './Modal'
import ReactPaginate from 'react-paginate'

var DEFAULT_SEARCH = "mini"
const API_KEY = `aefda221`
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${DEFAULT_SEARCH}`
const DEFAULT_POSTER = `https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg`
var TEMP_SEARCH = "mini"

const initialState = {
  movie : [],
  loading : true,
  messageError: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE_REQUEST":
      return{
        ...state,
        loading: true,
        messageError: null
      }
    case "SEARCH_MOVIE_SUCCESS":
      return{
        ...state,
        loading: false,
        messageError: null,
        movie: action.payload
      }
    case "SEARCH_MOVIE_ERROR":
      return{
        ...state,
        loading: false,
        messageError: action.error
      }
    default:
      return state
  }
}

const Home = () => {
    const [state, setMovie] = useReducer(reducer, initialState)
    
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      fetch(API_URL+`&page=1`)
      .then((response) => response.json())
      .then(data => {
        setMovie({
          type: "SEARCH_MOVIE_SUCCESS",
          payload: data
        })
      })  
    }, [])

    const searchMovie = (searchValue) => {
      TEMP_SEARCH = searchValue
      setCurrentPage(0)
      setMovie({
        type: "SEARCH_MOVIE_REQUEST"
      })

      if(searchValue === ''){
        TEMP_SEARCH = DEFAULT_SEARCH
      }

      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${TEMP_SEARCH}&page=1`)
      .then((response) => response.json())
      .then((data) => {
        if(data.Response === "True"){
          setMovie({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: data
          })
        } else {
          setMovie({
            type: "SEARCH_MOVIE_ERROR",
            error: data.Error
          })
        }
      })
    }

    const [detail, setDetail] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleDetailClick = async (id) => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=aefda221&i=${id}`)
        const result = await response.json()
        setDetail(result)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const handlePageClick = (event) => {
      setCurrentPage(event.selected)
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${TEMP_SEARCH}&page=${event.selected+1}`)
      .then((response) => response.json())
      .then((data)=>{
        setMovie({
          type: "SEARCH_MOVIE_SUCCESS",
          payload: data
        })
      })
    }

    const { movie, messageError, loading} = state;
    const poster = (data) => {
      return (data.Poster === 'N/A' ? DEFAULT_POSTER : data.Poster)
    }

    return(
        <div className='App'>
            <nav className="navbar navbar-expand-lg bg-dark mb-3 fixed-top">
                <div className="container-fluid mx-5">
                    <Header name1='Cinema' name2='XXI'/>
                    <Search search={searchMovie}/>
                </div>
            </nav>
            <div className='bodyApp'>
              <div className='bg-head m-auto'>
                  <div className='head text-center'>Movie List</div>
              </div>
              <div className='row justify-content-center mt-3'>
                {loading && !messageError ? (
                  <div className='head-title text-center'>Loading...</div> 
                ) : messageError ? (
                  <div className='head-title text-center'>{messageError}</div>
                ) : (
                  movie.Search.map((data, index) => (
                    <div className='card m-2 col-sm-12 col-md-4 col-lg-2 shadow' key={index}>
                      <div className='content-card'>
                        <div className='photo-card' data-bs-toggle="modal" data-bs-target="#detailModal" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDetailClick(data.imdbID)
                          }}
                        >
                            <img src={poster(data)} className="card-img-top" alt='movie-poster'/>
                        </div>
                        <Movie title={data.Title}/>
                      </div>
                      <div className="modal modal-lg fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content bg-dark text-light">
                            {isLoading ? (<h2 className='p-5'>Loading...</h2>) : (
                                <Modal
                                  title={detail.Title} 
                                  src={poster(detail)} 
                                  year={detail.Year} 
                                  released={detail.Released} 
                                  runtime={detail.Runtime}
                                  imdbRating={detail.imdbRating}
                                  genre={detail.Genre}
                                  director={detail.Director}
                                  writer={detail.Writer}
                                  language={detail.Language}
                                  country={detail.Country}
                                  plot={detail.Plot}
                                />
                            )}
                          </div>
                        </div>
                      </div>
                  </div>
                ))
              )}
              <div className='page'>
                
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  forcePage = {currentPage}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={Math.ceil(parseInt(movie.totalResults)/10)}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  containerClassName={'pagination'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          </div>
      </div>
    )
}
export default Home