import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/graphql/generated';

@Pipe({
  name: 'filterAuthor'
})
export class FilterAuthorPipe implements PipeTransform {

  transform(value: Post[] | undefined | null, searchText?: string): Post[] | undefined | null{
    if (!searchText) {
      return value;
    } else {      
      return value?.filter(function (item: any) {
       if (item["user"]["name"].toString().toLowerCase().includes(searchText.toLowerCase())) {
            return true;
          }
        
        return false;
      });
    }
  }

}
