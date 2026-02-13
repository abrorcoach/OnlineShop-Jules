import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCartStore } from '../store/useCartStore';

export const CheckoutPage = () => {
    const { items, total, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = async () => {
        if (items.length === 0) return;
        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            await api.post('/orders', orderData);
            clearCart();
            // Redirect to a success page or user orders page
            alert('Order placed successfully!');
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                    <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                    <div className="p-4 border rounded-lg bg-gray-50 text-gray-600">
                        Cash on Delivery / Card on Delivery
                    </div>

                    <h2 className="text-lg font-bold mt-6 mb-4">Shipping Address</h2>
                    <div className="p-4 border rounded-lg bg-gray-50 text-gray-600">
                        Main Warehouse Pickup Point (Demo)
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Your Order</h2>
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.quantity} x {item.name}</span>
                                <span>{((item.discountPrice || item.price) * item.quantity).toLocaleString()} sum</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{total().toLocaleString()} sum</span>
                        </div>
                    </div>

                    {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};
