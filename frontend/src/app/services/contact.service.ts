import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/types';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiUrl = `${environment.apiUrl}/contacts`;

    constructor(private http: HttpClient) { }

    getAllContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiUrl);
    }

    updateStatus(id: number, status: 'completed' | 'not completed'): Observable<Contact> {
        return this.http.patch<Contact>(`${this.apiUrl}/${id}/status?status=${status}`, {});
    }

    submitContact(contact: Omit<Contact, 'id' | 'createdAt' | 'status'>): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact);
    }
}