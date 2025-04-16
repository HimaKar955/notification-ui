import App from '../App';
import InsertUpdateForm from "../pages/InsertUpdateForm/InsertUpdateForm";
import DeleteForm from "../pages/DeleteForm/DeleteForm";
import ReadNotificationForm from "../pages/ReadNotificationForm/ReadNotificationForm";
import HomePage from '../components/HomePage/HomePage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {index:true, element:<HomePage/>},
      { path: 'insert-update', element: <InsertUpdateForm /> },
      { path: 'delete', element: <DeleteForm /> },
      { path: 'read-notification', element: <ReadNotificationForm /> },
    ],
  },
];

export default routes;
