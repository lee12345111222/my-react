import React  from 'react';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import HomePage from "./pages/HomePage";
import SearchProject from './pages/SearchProject';
import ProjectDetail from './pages/ProjectDetailPage';
import MyProject from './pages/MyProject';
import ProjectFormPage from "./pages/ProjectFormPage";
import Test from "./components/Test";
import MyChat from './pages/MyChat';
import ViewOtherProfile from './pages/ViewOtherProfile';

const AppRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: 'NewProject',
    element: <ProjectFormPage />
  },
  {
    path: 'UpdateProject/:projectId',
    element: <ProjectFormPage />
  },
  { 
    path: 'ProjectDetails/:projectId',
    element: <ProjectDetail />
  },
  {
    path:'Profile/:userId',
    element: <ViewOtherProfile />
  },
  {
    path: 'SearchProject',
    element: <SearchProject />
  },
  {
    path: '/ProjectDetail',
    element: <ProjectDetail />
  },
  {
    path: 'MyProject',
    element: <MyProject />
  },
  {
    path: 'Test/:projectId',
    element: <Test />
  },
  {
    path: 'Test',
    element: <Test />
  },
  {
    path: 'MyChat',
    element: <MyChat />
  },
  {
    path: 'ViewOtherProfile',
    element: <ViewOtherProfile />
  },
  ...ApiAuthorizationRoutes
];


export default AppRoutes;
