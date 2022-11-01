import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Movie = (props) => {
    
    return(
        <div>
            <>
                <div className="card-body">
                    <h5 className="card-text text-center">{props.title}</h5>
                </div>
            </>
        </div>
    )
}

export default Movie