import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService, Category } from '@bluebits/products2';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'admin-categories-list',
    standalone: true,
    imports: [CommonModule, CardModule, ToolbarModule, ButtonModule, TableModule, RouterLink, MessagesModule, ToastModule, ConfirmDialogModule],
    templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit{
  categories : Category[] = []

  constructor(private categoriesService : CategoriesService,
              private messageService: MessageService,
              private confirmationService : ConfirmationService,
              private router : Router ){}

  ngOnInit(): void {
    this._getCategories()
  }

  _deleteCategory(categoryId : string){
    this.categoriesService.deleteCategory(categoryId).subscribe(
      {
        next: response => {
          console.log('deleted', response);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is deleted!'});
          this._getCategories();
          },
        error: error => {
          console.log('error', error);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Category is not deleted!'})
          }
      }
    )
  }


  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats
    })
  }

  updateCategory(categoryId : string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
  deleteCategory(categoryId : string) {
    this.confirmationService.confirm({
        message: 'Do you want to Delete this Category?',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this._deleteCategory(categoryId)
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        reject: () => {}
    });
  }

}
