import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const addToCart = useCartStore(state => state.addToCart);

    const price = product.discountPrice || product.price;
    const isDiscount = !!product.discountPrice;
    const discountPercent = isDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0;

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group h-full flex flex-col">
            <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] bg-gray-100 overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                {isDiscount && (
                    <span className="absolute bottom-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercent}%
                    </span>
                )}
            </Link>

            <div className="p-3 flex flex-col flex-1">
                <Link to={`/product/${product.id}`} className="text-sm text-gray-700 line-clamp-2 mb-2 hover:text-primary transition-colors flex-1">
                    {product.name}
                </Link>

                <div className="mt-auto">
                    <div className="text-xs text-gray-400 mb-1">
                        {isDiscount ? <span className="line-through">{product.price.toLocaleString()} sum</span> : <span>&nbsp;</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{price.toLocaleString()} sum</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 active:bg-gray-100"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
