import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from './models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private apiUrl = 'https://localhost:7023/api/Participants';

  constructor(private http: HttpClient) {} 

  login(userId: number, password: string): Observable<{ IsAdmin: boolean }> {
    return this.http.post<{ IsAdmin: boolean }>(`${this.apiUrl}/login`, { userId, password });
  }
  
  
  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl);
  }

  muteParticipant(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mute/${id}`, {});
  }

  muteAll(adminId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mute-all`, { adminId });
  }
}
