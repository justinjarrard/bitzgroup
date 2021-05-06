import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './components/Navbar'
// import Jumbotron from './components/Jumbotron'


const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          {/* <Jumbotron /> */}
          <Switch>
            <Route path='/Home'>
              <Home />
            </Route>
            <Route path='/Profile'>
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
