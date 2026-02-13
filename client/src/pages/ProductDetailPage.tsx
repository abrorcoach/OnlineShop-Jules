import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight } from 'lucide-react';
import api from '../api/axios';
import type { Product } from '../types/product';
import { useCartStore } from '../store/useCartStore';

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get<Product>(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error || !product) return <div className="text-center py-20 text-red-500">{error || 'Product not found'}</div>;

    const price = product.discountPrice || product.price;
    const isDiscount = !!product.discountPrice;

    return (
        <div className="max-w-6xl mx-auto">
             <nav className="flex text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>{product.categoryName || 'Product'}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-sm text-gray-500">(12 reviews)</span>
                    </div>

                    <div className="text-3xl font-bold mb-6">
                        {price.toLocaleString()} sum
                        {isDiscount && (
                            <span className="text-lg text-gray-400 line-through ml-3 font-normal">
                                {product.price.toLocaleString()} sum
                            </span>
                        )}
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>

                    <div className="prose text-gray-600">
                        <h3 className="text-lg font-semibold text-black mb-2">Description</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
