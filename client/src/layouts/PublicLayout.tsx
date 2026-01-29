import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-white py-8 border-t mt-auto">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    &copy; 2024 UzumMarket Clone. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
