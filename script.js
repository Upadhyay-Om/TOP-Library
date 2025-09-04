const modal = document.getElementById("myModal");
const addBtn = document.querySelector(".new-book-btn");
const closeBtn = document.getElementById("cancel-btn");
const submitBtn = document.getElementById("submit-btn");
// Open <odal On ADD btn
function openBookForm()  {
    modal.style.display = "block";
}
// Close Modal on Cancel btn
function closeBookForm()  {
    modal.style.display = "none";
}
window.onclick = function(event) { // If the user clicks outside the modal, close it
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Library Code
let myLibrary = [];
// Book Constructor with ID
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now() + Math.random(); // Added missing ID
}

// Fixed addBookToLibrary function
function addBookToLibrary(title, author, pages, read) { // Added parameters
    const newbook = new Book(title, author, pages, read);
    myLibrary.push(newbook);
    displayBooks();
}

const form = document.getElementById("id-form");

// Display Books
function displayBooks() {
    const booksContainer = document.getElementById('booksContainer'); 
    booksContainer.innerHTML = '';

    if (myLibrary.length === 0) {
        booksContainer.innerHTML = '<div class="empty-library">No books in your library yet. Add your first book!</div>';
        return;
    }

    myLibrary.forEach((book, index) => {
        const bookcard = document.createElement('div');
        bookcard.className = 'book-card';
        bookcard.setAttribute('data-book-id', book.id);

        bookcard.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-pages">${book.pages} pages</div>
        <div class="book-status ${book.read ? 'read' : 'not-read'}">
          ${book.read ? '✓ Read' : '○ Not Read'}
        </div>
        <div class="book-actions">
        <button class="btn toggle-btn" onclick="toggleReadStatus('${book.id}')">
          ${book.read ? 'Read' : 'Not Read'}
        </button>
        <button class="btn delete-btn" onclick="deleteBook('${book.id}')">
        Remove
        </button>
        </div>
        `;
        booksContainer.appendChild(bookcard); // Fixed variable name and typo
    });
}
// Added missing functions
function toggleReadStatus(bookId) {
    const book = myLibrary.find(b => b.id == bookId);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}
function deleteBook(bookId) {
    const index = myLibrary.findIndex(b => b.id == bookId);
    if (index > -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    } 
}
// Adding to page after submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    closeBookForm();
    form.reset(); 
});
// Add some sample books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 376, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, false);
displayBooks(); // Refresh display on page load