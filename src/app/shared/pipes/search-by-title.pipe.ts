import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

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
    const lowerSearch = search.toLowerCase().trim();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().trim().includes(lowerSearch)
    );
  }
}
