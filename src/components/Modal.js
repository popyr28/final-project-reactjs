const Modal = (props) => {
    return(
        <div className="modal-content bg-dark text-light">
            <div className="modal-header">
                <h4 className="modal-title" id="detailModalLabel">{props.title}</h4>
                <button typename="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='d-flex'>
                    <div className='photo-detail'>
                        <img src={props.src} alt="detail-poster"/>
                    </div>
                    <div className='text-detail d-flex'>
                    <ul className='text mr-1 fw-bold'>
                        <li>Year</li>
                        <li>Released</li>
                        <li>Runtime</li>
                        <li>Rating</li>
                        <li>Genre</li>
                        <li>Director</li>
                        <li>Writer</li>
                        <li>Language</li>
                        <li>Country</li>
                        <li>Synopsis</li>
                    </ul>
                    <ul className='text mr-3'>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                        <li>:</li>
                    </ul>
                    <ul className='text'>
                        <li>{props.year}</li>
                        <li>{props.released}</li>
                        <li>{props.runtime}</li>
                        <li>{props.imdbRating}&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 20 20">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </li>
                        <li>{props.genre}</li>
                        <li>{props.director}</li>
                        <li>{props.writer}</li>
                        <li>{props.language}</li>
                        <li>{props.country}</li>
                        <li>{props.plot}</li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Modal