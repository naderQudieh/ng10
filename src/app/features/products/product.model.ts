export interface Product {
    _id?: number;
    title: string;
    amount: number;
    date?: Date;
    subTitle?: string;
    currency?: 'rupee' | 'euro' | null;
    image?: ProductImage
}

export interface ProductImage {
    src: string;
    srcOut?: string;
    srcOn?: string;
}