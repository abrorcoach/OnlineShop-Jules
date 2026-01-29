import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export const CartPage = () => {
    const { items, removeFromCart, updateQuantity, total } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/" className="text-primary hover:underline">Go shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length})</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-medium text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {(item.discountPrice || item.price).toLocaleString()} sum
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-white rounded-md shadow-sm transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-white rounded-md shadow-sm transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                        <div className="space-y-2 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{total().toLocaleString()} sum</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{total().toLocaleString()} sum</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
