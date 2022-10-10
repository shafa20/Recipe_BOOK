import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SafaService {
apiurl='https://shopketo.marketvision.com/wp-json/wp/pruvitnow/posts/'
  
  constructor(private httpClient:HttpClient) { }
  
  getdata(){
    return this.httpClient.get(this.apiurl);
  }
}
