export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    stock: number;
    imageUrl?: string;
    categoryId: number;
    categoryName?: string;
}
