import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slForm!:NgForm
editMode= false
editedItemIndex !:number
subscription!:Subscription
editedItem !:Ingredient
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
   this.subscription= this.slService.startedEditing.subscribe((index:number)=>{
    this.editedItemIndex=index
  this.editMode= true
  this.editedItem=this.slService.getIngredient(index)
        this.slForm.setValue({
          name: this.editedItem.name ,
          amount: this.editedItem.amount
        })
   })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe() 
  }

  onSubmit(form:NgForm){
  const value= form.value;
    const newIngrident= new Ingredient(value.name , value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngrident)
    }else{
      this.slService.addIngredient(newIngrident);
    }
   this.editMode=false
   form.reset()

  }
  onClear(){
    this.slForm.reset()
    this.editMode=false
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex) 
    this.onClear()
  }
  
}
