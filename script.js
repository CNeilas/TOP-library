var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
  modal.style.flexDirection = "column"
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


let titleInput = document.getElementById("title")
let authorInput = document.getElementById("author")
let pagesInput = document.getElementById("pages")
let readInput = document.getElementById("read")
let submitButton = document.getElementById("submit")

const myLibrary = [];
let container = document.querySelector(".container");

let toggleStatus = (index) => {
    myLibrary[index].read = !myLibrary[index].read;
    renderLibrary(); 
};

let deleteBook = (index) => {
    myLibrary.splice(index, 1)
    renderLibrary(); 
};

const Book = function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
    };
};

const addBookToLibrary = (event) => {
    event.preventDefault();
    const title = titleInput.value
    const author = authorInput.value
    const pages = pagesInput.value
    const read = readInput.checked;
  
    if (title && author && pages) {
      const book = new Book(title, author, pages, read);
      myLibrary.push(book);
      renderLibrary();
      modal.style.display = "none";
      document.querySelector("form").reset();
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  submitButton.addEventListener("click", addBookToLibrary)

  const renderLibrary = () => {
    container.innerHTML = ""; 
    myLibrary.forEach((book, index) => {

        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let h2 = document.createElement("h2");
        let pages = document.createElement("p");
        let readStatus = document.createElement("p");
        let toggleButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        h3.textContent = book.title;
        h2.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        readStatus.textContent = book.read ? "Read already" : "Didn't read yet";
        toggleButton.textContent = "Toggle read status";
        deleteButton.textContent = "Delete book";

        toggleButton.addEventListener("click", () => toggleStatus(index));
        deleteButton.addEventListener("click", () => deleteBook(index));

        div.appendChild(h3);
        div.appendChild(h2);
        div.appendChild(pages);
        div.appendChild(readStatus);
        div.appendChild(toggleButton);
        div.appendChild(deleteButton);
        div.setAttribute("class", "book");

        container.appendChild(div);
    });
};


renderLibrary();
