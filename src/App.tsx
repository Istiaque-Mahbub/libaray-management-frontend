import { Outlet } from "react-router"
import Footer from "./components/layout/Footer"
import NavBar from "./components/layout/NavBar"


function App() {


  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
