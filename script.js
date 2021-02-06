
class Book {
  constructor(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }

  info = function() {
    let status;
    if (this.read){
      status = "has been read";
    } else {
      status = "not read yet";
    }
    let info = title + " by " + author + ", "+ pages+" pages, " + status
    return info
  }
}


// function Book(title, author, pages, read) {
//   this.title = title
//   this.author = author
//   this.pages = pages
//   this.read = read
//   this.info = function() {
//     let status;
//     if (read){
//       status = "has been read";
//     } else {
//       status = "not read yet";
//     }
//     let info = title + " by " + author + ", "+ pages+" pages, " + status
//     return info
//   }
// }




let twilight = new Book('Twilight', 'steph', 123, false);
  let myLibrary = [twilight];
  let mainLibrary = document.getElementById('library')

  let book1 = new Book('twilight', 'stephanie meyer', 321, true);
  console.log(book1.info())


  displayBooks();
  storageAvailable('sessionStorage')

  


  function displayBooks() {  
    myLibrary.forEach((book, idx) => {
      //create card element
      let card = document.createElement('div');
      card.id = idx
      card.classList = 'card'

      //construct card content
      let content = `
            <h3>${book.title}</h3>
            <input type="checkbox" id="read${idx}" onclick="changeReadStatus(${idx});"> Read
            <p href="#" class="warning" onclick="removeBook(${idx})"> Remove Book </p>
      `;
      card.innerHTML = content

      //append card element to container
      mainLibrary.appendChild(card);

    })

  }

  function changeReadStatus(idx){
    let readCheck = document.getElementById("read"+idx);
    if (!(readCheck.checked)) {
      myLibrary[idx].read = false;

    } else { 
      myLibrary[idx].read = true;
    }
    console.log(myLibrary[idx].read)
  }


  function showForm() {
    document.getElementById("myForm").style.display = "inline";
  }


  function addBookToLibrary() {
    console.log('HELLO')
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let read;
    let checked;
    let idx = myLibrary.length;

    if (document.getElementById('yes').checked) {
      read = document.getElementById('yes').value;
      checked = 'checked';
    } else {
      read = false;
      checked = '';
    }

    //create book object
    let newBook = new Book(title,author, pages, read);
    console.log(newBook)
    myLibrary.push(newBook);

    //create card element
    let card = document.createElement('div');
      card.id = idx
      card.classList = 'card'

      //construct card content
      let content = `
            <h3>${newBook.title}</h3>
            <input type="checkbox" id="read${idx}" onclick="changeReadStatus(${idx});" ${checked}> Read
            <p class="warning button" onclick="removeBook(1)"> Remove Book </p>
      `;
      card.innerHTML = content

      //append card element to container
      mainLibrary.appendChild(card);

  }

  

  function removeBook(idx) {
    myLibrary.splice(idx, 1);
    document.getElementById(idx).remove();
    
  }

  

  function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  console.log('yipee')
}
else {
  // Too bad, no localStorage for us
  console.log('too bad')
}
