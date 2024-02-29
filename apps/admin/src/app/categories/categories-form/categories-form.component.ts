import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder,  FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesService, Category } from '@bluebits/products2';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ColorPickerModule } from 'primeng/colorpicker';


@Component({
  selector: 'admin-categories-form',
  standalone: true,
  imports: [CommonModule,TableModule, ButtonModule, ToolbarModule, CardModule,
            InputTextModule, FormsModule, ReactiveFormsModule, ToastModule, MessagesModule, ColorPickerModule],
  templateUrl: './categories-form.component.html',
  styles: ``
})
export class CategoriesFormComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editMode = false;
  currentcategoryId = ''

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService,
              private messageService: MessageService, private location: Location,
              private route : ActivatedRoute){}




  ngOnInit(): void {
    this._checkEditMode();
    this.form = this.fb.group({
     name : ['', {validators :[
       Validators.required
     ],
     updateOn : 'blur'
   }],
     icon : ['', Validators.required],
     color: ['#fff']
   })
  }

  onSubmit(){

    this.isSubmitted = true;
    if(!this.form.valid){
      return
    }

    console.log("Form Value", this.form.value)

    const category : Category = {
      id: this.currentcategoryId,
      name: this.categoryForm["name"].value,
      icon: this.categoryForm["icon"].value,
      color: this.categoryForm["color"].value
    }

    if(this.editMode){
      this._updateCategory(category)
      return
    }

    this._createCategory(category)
  }


  private _updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe({
      next: async response => { console.log('response', response);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is updated!'})

            await firstValueFrom(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              timer(2000)).then(done => {
                this.location.back()
              })
    },
    error: error => {
      console.log('response', error);
        this.messageService.add({severity: 'error', summary: 'Success', detail: 'Category is not updated!'});
    }

    })
  }


  private _createCategory(category : Category){
    this.categoriesService.createCategory(category).subscribe(
      {
        next: async response => { console.log('response', response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is created!'})

        await firstValueFrom(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          timer(2000)).then(done => {
            this.location.back()
          })
      },
        error: error => {console.log('response', error);
        this.messageService.add({severity: 'error', summary: 'Success', detail: 'Category is not created!'});}
      }
    )
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['categoryId']){
        this.editMode = true;
        this.currentcategoryId = params['categoryId']
        this.categoriesService.getCategory(this.currentcategoryId).subscribe({
          next: response =>{
            this.categoryForm['name'].setValue(response.name);
            this.categoryForm['icon'].setValue(response.icon);
            this.categoryForm['color'].setValue(response.color);
          }
        })
      }
    })
  }

  get categoryForm(){
    return this.form.controls
  }


}
