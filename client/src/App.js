
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Header';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import { createContext, useState } from 'react';
import PostPage from './pages/PostPage';
import EditPage from './pages/EditPage';

const MyContext = createContext();
function App() {

  
  const[userInfo,setUserInfo]=useState(null)


  return (
        <BrowserRouter>
        
        <MyContext.Provider value={{userInfo,setUserInfo}}>
        
        <Header/>
           <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>

            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/createpost' element={<CreatePost/>}/>
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPage />} />

           </Routes>
           </MyContext.Provider>
           

        </BrowserRouter>
  );
}

export {MyContext}
export default App;
