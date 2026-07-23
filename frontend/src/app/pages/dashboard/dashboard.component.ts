import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { QuoteService } from '../../services/quote.service';
import { Contact, Quote } from '../../models/types'; 
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    activeTab: 'contacts' | 'quotes' = 'contacts';
    contacts: Contact[] = [];
    quotes: Quote[] = [];
    filteredContacts: Contact[] = [];
    filteredQuotes: Quote[] = [];
    contactSearchTerm: string = '';
    quoteSearchTerm: string = '';
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private contactService: ContactService,
        private quoteService: QuoteService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadContacts();
        this.loadQuotes();
    }

    loadContacts() {
        this.isLoading = true;
        this.contactService.getAllContacts().subscribe({
            next: (data) => {
                this.contacts = data;
                this.filteredContacts = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading contacts:', error);
                this.isLoading = false;
            }
        });
    }

    loadQuotes() {
        this.isLoading = true;
        this.quoteService.getAllQuotes().subscribe({
            next: (data) => {
                this.quotes = data;
                this.filteredQuotes = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading quotes:', error);
                this.isLoading = false;
            }
        });
    }

    searchContacts() {
        this.filteredContacts = this.contacts.filter(contact => 
            contact.name.toLowerCase().includes(this.contactSearchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(this.contactSearchTerm.toLowerCase())
        );
    }

    searchQuotes() {
        this.filteredQuotes = this.quotes.filter(quote => 
            quote.name.toLowerCase().includes(this.quoteSearchTerm.toLowerCase()) ||
            quote.email.toLowerCase().includes(this.quoteSearchTerm.toLowerCase())
        );
    }

    toggleStatus(contact: Contact) {
        const newStatus = contact.status === 'completed' ? 'not completed' : 'completed';
        
        this.contactService.updateStatus(contact.id, newStatus).subscribe({
            next: (updatedContact) => {
                contact.status = updatedContact.status;
            },
            error: (error) => {
                console.error('Error updating contact status:', error);
                // Revert the status if update fails
                contact.status = contact.status === 'completed' ? 'not completed' : 'completed';
            }
        });
    }

    toggleQuoteStatus(quote: Quote) {
        const newStatus = quote.status === 'completed' ? 'not completed' : 'completed';
        
        this.quoteService.updateStatus(quote.id, newStatus).subscribe({
            next: (updatedQuote) => {
                quote.status = updatedQuote.status;
            },
            error: (error) => {
                console.error('Error updating quote status:', error);
                // Revert the status if update fails
                quote.status = quote.status === 'completed' ? 'not completed' : 'completed';
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    // Optional: Add refresh method
    refresh() {
        this.loadContacts();
        this.loadQuotes();
    }
}