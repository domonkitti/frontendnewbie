import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV_CONFIG } from '../env.config';
import { Observable } from 'rxjs';
import { UserEditable, UserEditable2, UserProfile } from '../auth/models/logged-in-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  envConfig = inject(ENV_CONFIG);
  readonly URL = `${this.envConfig.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  constructor() {}
  list():Observable<UserEditable[]>{
    return this.httpClient.get<UserEditable[]>(this.URL)
  }
  edit(id: number, user: UserEditable) {
    return this.httpClient.patch<UserEditable>(`${this.URL}/${id}`, user);
  }
  get(id: number) {
    return this.httpClient.get<UserEditable>(`${this.URL}/${id}`)
  }
}

