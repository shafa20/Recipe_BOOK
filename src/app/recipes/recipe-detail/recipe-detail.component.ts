import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SafaService } from 'src/app/service/safa.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  data:any
  recipe!: Recipe;
  id!:number
  constructor(private recipeService:RecipeService , 
    private route:ActivatedRoute
    ,private router:Router ,
    private service:SafaService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
       this.getdata();
    })

 
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
     this.router.navigate(['edit'], {relativeTo:this.route})
  }
  
  onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id)
  this.router.navigate(['/recipes'])
  }
  getdata(){
    this.service.getdata()
    .subscribe(response =>{
  
      this.data=response;
    })
    
  }
 
}
