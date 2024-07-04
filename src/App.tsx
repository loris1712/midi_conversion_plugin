import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppBar from "./components/AppBar";
import UploadPage from './pages/Upload';
import Navigation from './layout/Navigation';
const  App = () => {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <UploadPage />,
    },
    {
      path: '/home',
      element: <UploadPage />,
    },
    {
      path: '/setting',
      element: <UploadPage />,
    },
  ], {
    basename: "/"
  });
  

  return (
    <div className="h-screen w-screen bg-black">
      <AppBar />
      <Navigation>
        <RouterProvider router={router} />
      </Navigation>
    </div>
  );
}

export default App
