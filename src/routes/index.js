import LayoutDefault from '../components/LayoutDefault'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Search from '../pages/Search'
import JobDetail from '../pages/JobDetail'
import Company from '../pages/Company'
import CompanyDetail from '../pages/CompanyDetail'

import PrivateRoutes from '../components/PrivateRoutes'
import LayoutAdmin from '../components/LayoutAdmin'
import Dashboard from '../pages/Dashboard'
import InfoCompany from '../pages/InfoCompany'
import JobManage from '../pages/JobManage'
import CreateJob from '../pages/CreateJob'
import JobDetailAdmin from '../pages/JobDetailAdmin'
import CVManage from '../pages/CVManage'
import CVDetail from '../pages/CVDetail'

import { Navigate } from 'react-router-dom'




export const routes = [
    //public
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'logout',
                element: <Logout />
            }, 
            {
                path: 'search',
                element: <Search />
            },
            {
                path: 'job/:id',
                element: <JobDetail />
            },
            {
                path: 'company',
                element: <Company />
            },
            {
                path: 'company/:id',
                element: <CompanyDetail />
            },
            {
                path: '"',
                element: <Navigate to="/" />
            },
        ]
    },
    //end public

    // private
    {
        element: <PrivateRoutes />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: 'admin',
                        element: <Dashboard />
                    },
                    {
                        path: 'info-company',
                        element: <InfoCompany />
                    },
                    {
                        path: 'job-manage',
                        element: <JobManage />
                    }, 
                    {
                        path: 'create-job',
                        element: <CreateJob />
                    },
                    {
                        path: 'detail-job/:id',
                        element: <JobDetailAdmin />
                    },
                    {
                        path: 'cv-manage',
                        element: <CVManage />
                    },
                    {
                        path: 'detail-cv/:id',
                        element: <CVDetail />
                    }
                ]
            }
        ]
    }
]