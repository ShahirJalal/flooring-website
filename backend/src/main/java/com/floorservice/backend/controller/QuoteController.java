package com.floorservice.backend.controller;

import com.floorservice.backend.model.Quote;
import com.floorservice.backend.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = {
        "https://flooring-website-frontend-c2dd1b199c2c.herokuapp.com",
        "http://localhost:4200"
}, allowCredentials = "true")
public class QuoteController {

    private final QuoteService quoteService;

    @Autowired
    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteService.getAllQuotes();
    }

    @PostMapping
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) {
        Quote savedQuote = quoteService.saveQuote(quote);
        return new ResponseEntity<>(savedQuote, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Quote> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        Quote updatedQuote = quoteService.updateQuoteStatus(id, status);
        return ResponseEntity.ok(updatedQuote);
    }
}