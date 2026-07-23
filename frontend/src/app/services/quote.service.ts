import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/types';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private apiUrl = `${environment.apiUrl}/quotes`;

    constructor(private http: HttpClient) { }

    getAllQuotes(): Observable<Quote[]> {
        return this.http.get<Quote[]>(this.apiUrl);
    }

    updateStatus(id: number, status: 'completed' | 'not completed'): Observable<Quote> {
        return this.http.patch<Quote>(`${this.apiUrl}/${id}/status?status=${status}`, {});
    }

    submitQuote(quote: Omit<Quote, 'id' | 'createdAt' | 'status'>): Observable<Quote> {
        return this.http.post<Quote>(this.apiUrl, quote);
    }
}