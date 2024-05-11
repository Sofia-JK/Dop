import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainPage from './MainPage.jsx'
import Index from './Index.jsx'
import AboutUs from './components/Index/AboutUs.jsx'
import Questions from './components/Index/Questions.jsx'
import Lecturer from './components/Index/Lecturer.jsx'
import Profile from './Profile.jsx'
import Directions from './Directions.jsx'
import Task from './components/Lecturer/Task.jsx'
import Student_task from './components/Student/Task.jsx'
import Answer from './Answer.jsx'


const router = createBrowserRouter([
    {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <Index/>, 
        children: [
          {
            path: '/',
            element: <AboutUs/>
          },
          {
            path: '/questions',
            element: <Questions/>
          },
          {
            path: '/lecturer',
            element: <Lecturer/>
          }
        ]
      },

      {
        path: '/direction',
        element: <Directions/>
      },

      {
        path:'/prof',
        element: <Navigate to='/'/>
      },

      {
        path:'/prof/task',
        element: <Navigate to='/'/>
      },

      {
        path:'/prof/student-task',
        element: <Navigate to='/'/>
      },
      {
        path:'/answer',
        element: <Navigate to='/'/>
      },

      {
        path:'/',
        element: <Navigate to='/prof'/>
      }
      
    ]}
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <Index/>, 
        children: [
          {
            path: '/',
            element: <AboutUs/>
          },
          {
            path: '/questions',
            element: <Questions/>
          },
          {
            path: '/lecturer',
            element: <Lecturer/>
          }
        ]
      },

      {
        path: '/direction',
        element: <Directions/>
      },

      {
        path: '/prof',
        element: <Profile/>,
        children: [
          {
            path: '/prof/task',
            element: <Task/>
          },
          {
            path: '/prof/student-task',
            element: <Student_task/>
          }
        ]
      },

      {
        path: '/answer',
        element: <Answer/>
      }
      
    ]}
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/prof',
        element: <Profile/>
      },
      {
        path: '/',
        element: <Navigate to='/prof' />
      }
    ]}
])

function App() {

  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)

  console.log(token);


  return (
    token ? role === "ADMIN" ? <RouterProvider router={authRouterAdmin} /> : <RouterProvider router={authRouter} /> :
    <RouterProvider router={router} />
  )
}

export default App
