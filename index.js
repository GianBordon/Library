console.log("Buenas buenas")

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
        const container = document.getElementById('container');
        container.innerHTML = ''; 
    
        myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
    
        const title = document.createElement('h2');
        title.textContent = book.title;
    
        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
    
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
    
        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const readButton = document.createElement('button');
        readButton.classList.add('btn-read')
        readButton.textContent = '';
        readButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks(); 
        });
    
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeBook(index));
    
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(readButton);
        bookCard.appendChild(removeButton);
        
        if (book.read) {
            bookCard.classList.add('read');
        } else {
            bookCard.classList.remove('read'); 
        }

        container.appendChild(bookCard);
        });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);



const newBookBtn = document.getElementById('btn');
const newBookForm = document.getElementById('new-book');
const closeDialogBtn = document.getElementById('close-dialog');
const dialog = document.getElementById('my_dialog');
const submit = document.getElementById('submit');   

submit.addEventListener('click', () => {
    event.preventDefault();
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    
    addBookToLibrary(title, author, pages, read);
    dialog.close(); 
    displayBooks();
})

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    dialog.close();
});

displayBooks();