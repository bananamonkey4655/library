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
        bookCard.classList.toggle('book-grid-item');
        bookCard.style.backgroundColor = `${colors[counter]}`;
        console.log(colors[counter]);
        counter++;

        const mainInfo = document.createElement('div');
        const subInfo = document.createElement('div');
        mainInfo.classList.toggle('main-info');
        subInfo.classList.toggle('sub-info');
        
        for (let prop in book) {
            const info = document.createElement('div');
            info.classList.toggle(`book-${prop}`);

            if (prop === 'isRead') {
                info.style.color = book[prop]
                    ? 'forestgreen'
                    : 'firebrick';
                info.innerText = book[prop]
                    ? 'Read'
                    : 'Not read';
                subInfo.appendChild(info);
            } else {
                info.innerText = book[prop];
                mainInfo.appendChild(info);
            }
        }

        bookCard.appendChild(mainInfo);
        bookCard.appendChild(subInfo);
        const removeButton = document.createElement('button');
        removeButton.innerText = 'x';
        removeButton.addEventListener('click', () => {
            bookshelf.removeChild(bookCard);
        });
    
        subInfo.appendChild(removeButton);
        bookshelf.appendChild(bookCard);
        book.added = true;
    });
}

const colors = ['#faf884', '#baed91', '#f8b88b', '#f2a2e8', '#ead0d0', '#eaddc9', '#efeed7', '#c4d9c1', '#bfb7ca', '#fea3aa', '#b2cefe'];
let counter = 0;
let myLibrary = [];
listen();