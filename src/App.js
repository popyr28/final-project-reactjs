import About from "./components/About"
import Home from "./components/Home"

function App (){
    return(
        <Routes>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    )
}

export default App