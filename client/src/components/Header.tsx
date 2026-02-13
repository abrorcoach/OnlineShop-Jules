import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, User, LogOut } from 'lucide-react';

export const Header = () => {
    const { isAuthenticated, logout, user } = useAuthStore();
    const cartItems = useCartStore(state => state.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary">UzumMarket</Link>

                <div className="flex-1 max-w-xl mx-8 hidden md:block">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary bg-secondary"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated() ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium hidden sm:block">{user?.email}</span>
                            <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full" title="Logout">
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                            <User className="w-6 h-6" />
                            <span className="font-medium">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
