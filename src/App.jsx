import Sidebar from './components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="bg-light col-md-3 col-lg-2 border-end">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
