import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Books {
  name: String;
  author:  String;
  release_year: Number;
  rating:  Number;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  authorName: string = '';
  books: any[] = [];
  newBook: any = {};
  sortedBooks: any[] = [];
  booksByAuthor: Books[] = [];
  maxRatingBook: Books | null = null; // Holds the Book with maximum goals

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBooks();
  }

  // Retrieve Books data based on the number of goals scored in descending order:
  getBooks() {
    this.http.get<any[]>('http://localhost:3000/books')
      .subscribe(data => {
        this.books = data;
        //this.books.sort((a, b) => b.field_goals - a.field_goals); 
        this.sortedBooks = this.sortBooksByRating();
        this.calculateMaxRatingBook();
      });

  }

  // Get books by author
  getBooksByAuthor() {
    this.http.get<Books[]>(`http://localhost:3000/books/author/${this.authorName}`)
      .subscribe(data => {
        this.booksByAuthor = data;
      });
  }

  // Add a new Book
  addBook() {
    if (this.newBook._id) {
      // If the newBook has an ID, it means we are updating an existing Book
      this.updateBook();
    } else {
      // Otherwise, we are adding a new Book
      this.http.post<any>('http://localhost:3000/books', this.newBook)
        .subscribe(data => {
          this.books.push(data);
          this.newBook = {};
          //this.books.sort((a, b) => b.field_goals - a.field_goals); 
          this.calculateMaxRatingBook();
        });
    }
  }
  

  // Delete a Book
  deleteBook(bookId: string) {
    this.http.delete(`http://localhost:3000/books/${bookId}`)
      .subscribe(() => {
        this.books = this.books.filter(book => book._id !== bookId);
        this.calculateMaxRatingBook();
      });
  }

  // Edit a book
  editBook(books: any) {
    this.newBook = {
      _id: books._id,
      name: books.name,
      author: books.author, 
      release_year:books.release_year, 
      rating: books.rating
    };
  }

  //Update
  updateBook() {
    this.http.put<any>(`http://localhost:3000/books/${this.newBook._id}`, this.newBook)
      .subscribe(data => {
        const index = this.books.findIndex(book => book._id === data._id);
        if (index !== -1) {
          this.books[index] = data;
          this.newBook = {}; 
          this.calculateMaxRatingBook();
        }
      });
  }

  // return book with maximum rating
  calculateMaxRatingBook() {
    this.maxRatingBook = this.books.reduce((maxBook, book) => {
      if (!maxBook || book.rating > maxBook.rating) {
        return book;
      }
      return maxBook;
    }, null);
  }

  // Sort players by goals
  sortBooksByRating() {
        return this.books.slice().sort((a, b) => b.rating - a.rating);
  }

}


