function Book(title, author, year, isRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.isRead = isRead;
}

function listen() {
    const form = document.querySelector('section');
    form.style.visibility = 'hidden';      

    document.querySelector('.add-new').addEventListener('click', () => {
        form.style.visibility = 'visible';
    }); 

    document.querySelector('.submit-new').addEventListener('click', addBookToLibrary);
}

function addBookToLibrary() {   
    const book = new Book();

    //get details
    book.title = document.querySelector('#title').value;
    book.author = document.querySelector('#author').value;
    book.year = document.querySelector('#year').value;
    book.isRead = document.querySelector('#read').checked;

    if (book.title && book.author && book.year) {
        myLibrary.push(book);

        //reset
        document.querySelectorAll('form').forEach((form) => form.reset());
        document.querySelector('section').style.visibility = 'hidden';
    
        displayLibrary();
    }
}  

function displayLibrary() {
    const bookshelf = document.querySelector('main ul');

    myLibrary.forEach(book => {
        if (book.added) {
            return;
        }

        const bookCard = document.createElement('li');

        for (let prop in book) {
            const info = document.createElement('info');

            if (prop === 'isRead') {
                info.innerText = book[prop]
                    ? 'Read'
                    : 'Not read';
            } else {
                info.innerText = book[prop];
            }

            bookCard.appendChild(info);
        }

        const removeButton = document.createElement('button');
        removeButton.innerText = 'REMOVE';
        removeButton.addEventListener('click', () => {
            bookshelf.removeChild(bookCard);
        });
    
        bookCard.appendChild(removeButton);
        bookshelf.appendChild(bookCard);
        book.added = true;
    });
}

let myLibrary = [];
listen();