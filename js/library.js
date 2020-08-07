let library = [];
JSON.parse(localStorage.getItem("library"));
const $name = document.querySelector("#name");
const $author = document.querySelector("#author");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
});
const $table = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(library, currentTarget.innerText));
      updateLocalStorage();
    }
    if (e.target.classList.contains("status-button")) {
      changeStatus(findBook(library, currentTarget.innerText));
    }

    render();
  });

function Book(name, author, status) {
  this.name = name;
  this.author = author;
  this.status = status;
}

function addBookToLibrary() {
  if ($name.value.length === 0 || $author.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  const newBook = new Book($name.value, $author.value, $status.value);

  library.push(newBook);
  updateLocalStorage();
}
function changeStatus(book) {
  if (library[book].status === "read") {
    library[book].status = "not read";
  } else library[book].status = "read";
}
function deleteBook(currentBook) {
  library.splice(currentBook, currentBook + 1);
}
function findBook(libraryArray, name) {
  for (book of libraryArray)
    if (book.name === name) {
      return libraryArray.indexOf(book);
    }
}
function clearForm() {
  $name.value = "";
  $author.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function render() {
  $tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="status-button">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
      `;
    $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

render();
