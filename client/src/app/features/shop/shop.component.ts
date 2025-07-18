import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop';
import { Product } from '../../shared/models/product';
import { MatCardModule } from '@angular/material/card';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCardModule,
    ProductItemComponent,
    MatButton,
    MatIcon
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService)
  private dialogService = inject(MatDialog)
  products: Product[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error)      
    });
  }

  openFiltersDialog() {
    const dialog = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes
      }
    });
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
            this.selectedBrands = result.selectedBrands;
            this.selectedTypes = result.selectedTypes;
            this.shopService.getProducts(this.selectedBrands, this.selectedTypes).subscribe({
              next: response => this.products = response.data,
              error: error => console.log(error)              
            })
        }
      }
    })
  }
}
