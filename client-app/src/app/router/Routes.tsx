import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../feature/activities/form/ActivityForm";
import ActivityDetails from "../../feature/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'createActivity', element: <ActivityForm key={"create"}/>},
            {path: `activities/:id`, element: <ActivityDetails/>},
            {path: `manage/:id`, element: <ActivityForm key={"manage"}/>},
        ]
    }
]

export const router = createBrowserRouter(routes)