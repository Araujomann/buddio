import { Outlet } from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css';
import { Sidebar } from './components';

export const App = () => {
    return (
        <div className="flex w-screen h-full">  
            <Sidebar />

            <div className="flex grow h-full">
                <Outlet />
            </div>
        </div>
    );
};
