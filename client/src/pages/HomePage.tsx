import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get<Product[]>('/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div>
            {/* Banner/Slider would go here */}
            <h1 className="text-2xl font-bold mb-6">Popular Products</h1>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                    <p className="text-gray-500 mb-4">No products found.</p>
                    {/* Only show for demo purposes if DB is empty */}
                    <p className="text-sm text-gray-400">
                        (If you are an admin/seller, add products via API)
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
