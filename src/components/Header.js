import React from "react"

const Header = (props) => {
    return(
        <div>
            <header className="navbar-brand d-flex">
                <a href={'/'} className="d-flex">
                    <span><h2 className="name name1">{props.name1}&nbsp;</h2></span>
                    <span><h2 className="name name2">{props.name2}</h2></span>
                </a>
            </header>
        </div>

    )
}

export default Header