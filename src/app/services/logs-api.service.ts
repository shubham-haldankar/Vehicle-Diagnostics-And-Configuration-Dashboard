import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchDto } from '../models/search-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SearchResultDto } from '../models/search-result-dto';

@Injectable({
  providedIn: 'root',
})
export class LogsApiService {
  private readonly baseUrl: string = `${environment.apiUrl}/logs`;

  constructor(private http: HttpClient) {}

  getLogs(searchDto: SearchDto): Observable<SearchResultDto> {
    let params = new HttpParams();

    // Add query params only if they exist
    Object.entries(searchDto).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });

    return this.http.get<SearchResultDto>(this.baseUrl, { params });
  }
}
