import './App.css'
import  { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "pastes",
        element: <Paste />,
      },
      {
        path: "pastes/:id",
        element: <ViewPaste />,
      },
    ],
  },
])

function App() {

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App
