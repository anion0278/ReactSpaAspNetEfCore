import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HouseList from '../House/HouseList'
import './App.css'
import Header from './Header'
import HouseDetail from '../House/HouseDetail'
import HouseAdd from '../House/HouseAdd'
import HouseEdit from '../House/HouseEdit'

const NotFound = () => <h1>404 - Page Not Found</h1>;

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Header subtitle='List of houses on sale' />
        <Routes>
          <Route path="/" element={<HouseList/>}></Route>
          <Route path="/houses/:id" element={<HouseDetail/>}></Route>
          <Route path="/houses/add" element={<HouseAdd/>}></Route>
          <Route path="/houses/edit/:id" element={<HouseEdit/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
