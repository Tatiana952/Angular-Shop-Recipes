import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Pipe({
  name: 'searchByTitle',
})
export class SearchByTitlePipe implements PipeTransform {
  transform(recipes: Recipe[], search: string): Recipe[] | null {
    if (recipes.length === 0) {
      return null;
    }
    if (!search) {
      return recipes;
    }
    const lowerSearch = search.toLowerCase();
    let filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowerSearch)
    );
    console.log(filtered);
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowerSearch)
    );
  }
}
