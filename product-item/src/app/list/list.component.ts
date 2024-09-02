import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface Product {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
      });
  }

  filterProducts(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  sortProducts(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const direction = select.value as 'asc' | 'desc';
    this.sortDirection = direction;
    this.filteredProducts.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return direction === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }
}
