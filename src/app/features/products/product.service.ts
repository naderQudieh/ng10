import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }


  getProduct(product) {
    let prod = null
      prod = this.getAllProducts().find(prod => prod.title === product);
      console.log(prod)
    return prod
  }

  getAllProducts(): Product[] {
    return [
      {
        _id: 1,
        image: {
          src: '',
          srcOut: "./assets/amazon/p1.jpg",
          srcOn: "./assets/elhar/product/product1.JPG"
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 2,
        image: {
          src: '',
          srcOut: "./assets/amazon/p2.jpg",
          srcOn: "./assets/elhar/product/product4.JPG"
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 3,
        image: {
          src: '',
          srcOut: "./assets/amazon/p3.jpg",
          srcOn: "./assets/elhar/product/product6.JPG"
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 4,
        image: {
          src: '',
          srcOut: "./assets/amazon/p4.jpg",
          srcOn: "./assets/elhar/product/product1.JPG"
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 5,
        image: {
          src: '',
          srcOut: "./assets/amazon/p5.jpg",
          srcOn: "./assets/elhar/product/product3.JPG"
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 6,
        image: {
          src: '',
          srcOut: "./assets/amazon/p6.jpg",
          srcOn: "./assets/elhar/product/product5.JPG",
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 7,
        image: {
          src: '',
          srcOut: "./assets/amazon/p7.jpg",
          srcOn: "./assets/elhar/product/product7.JPG",
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 8,
        image: {
          src: '',
          srcOut: "./assets/amazon/p8.jpg",
          srcOn: "./assets/elhar/product/product7.JPG",
        },
        title: "Producct Title",
        subTitle: "Product Description",
        amount: 400
      }
    ]
  }


  getAllBrands() {

    return [
      {
        _id: 1,
        image: {
          src: '',
          srcOut: "./assets/elhar/brand/brand1.JPG",
          srcOn: "./assets/elhar/brand/brand4.JPG"
        },
        title: "dsgdfhgh",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 2,
        image: {
          src: '',
          srcOut: "./assets/elhar/brand/brand2.JPG",
          srcOn: "./assets/elhar/brand/brand5.JPG"
        },
        title: "dsgdfhgh",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 3,
        image: {
          src: '',
          srcOut: "./assets/elhar/brand/brand3.JPG",
          srcOn: "./assets/elhar/brand/brand1.JPG"
        },
        title: "dsgdfhgh",
        subTitle: "Product Description",
        amount: 400
      },
      {
        _id: 4,
        image: {
          src: '',
          srcOut: "./assets/elhar/brand/brand4.JPG",
          srcOn: "./assets/elhar/brand/brand1.JPG"
        },
        title: "dsgdfhgh",
        subTitle: "Product Description",
        amount: 400
      }
    ]
  }

  getBanners() {
    return [
      {
        src: '',
        srcOut: "./assets/elhar/banner/top_left_banner.JPG",
        srcOn: "./assets/elhar/banner/banner_left__bottom_2.JPG"
      },
      {
        src: '',
        srcOut: "./assets/elhar/banner/banner_left__bottom_1.JPG",
        srcOn: "./assets/elhar/banner/banner_left__bottom_2.JPG"
      },
      {
        src: '',
        srcOut: "./assets/elhar/banner/banner_left_1.JPG",
        srcOn: "./assets/elhar/banner/banner_left_2.JPG"
      }
    ]
  }
}
