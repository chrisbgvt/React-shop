import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

export const AuthGuard = ({children}) => {
    const { isAuthenticated } = useAuthContext();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export const IsAdminGuard = ({children}) => {
    const { user } = useAuthContext();

    if(user.userRole !== 'admin') {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};