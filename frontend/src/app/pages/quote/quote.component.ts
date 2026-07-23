import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
  quoteData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    floorType: '',
    roomType: '',
    squareFeet: 0,
    timeline: '',
    message: ''
  };

  constructor(private quoteService: QuoteService) {}

  onSubmit() {
    this.quoteService.submitQuote(this.quoteData).subscribe({
      next: (response) => {
        console.log('Quote submitted successfully', response);
        // Reset form
        this.quoteData = {
          name: '',
          email: '',
          phone: '',
          address: '',
          floorType: '',
          roomType: '',
          squareFeet: 0,
          timeline: '',
          message: ''
        };
        // Show success message
        alert('Quote submitted successfully!');
      },
      error: (error) => {
        console.error('Error submitting quote', error);
        alert('Error submitting quote. Please try again.');
      }
    });
  }
}