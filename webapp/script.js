// The function to get the data from the created API (index.js).
async function getBooks() {
    
    // Fetch the data.
    const res = await fetch("http://localhost:3000/bookdata");
    // This turns the book into a JSON object and check for a non-200 (aka, error) case.
    const books = res.status === 200 && (await res.json());
    // Gets every "expandable-title" class.
    const expandTitles = document.querySelectorAll(".expandable-title-1");
    // Loops over the expandable titles and add html for each one.
    expandTitles.forEach((expandTitle, index) => {
        // This checks if there's a book with the index.
        if (books[index]) {
            // Add to the html.
            expandTitle.innerHTML = `<h3>${books[index].title}</h3>
            <ion-icon class="expandable-icon" name="chevron-back-circle-sharp"></ion-icon>`;
        }
    });

    // This whole section does the same as the above but adds to a different class. I could merge it with the above or have it be it's own class but I think this way is the cleanest.
    const expandContents = document.querySelectorAll(".expandable-content-1");
    expandContents.forEach((expandContent, index) => {
        if (books[index]) {
            expandContent.innerHTML = `<img class="book center" src="images/${books[index].image}" alt="Image of ${books[index].title}">
            <h3>Author: ${books[index].author}</h3>
            <h3>Genre: ${books[index].genre}</h3>
            <h3>Price: ${books[index].price}</h3>
            <a href="cart.html"><button class="center">Buy Me!</button></a>`;
        }
    });

    // Similar but different forEaches for cart.html
    const expandTitles2 = document.querySelectorAll(".expandable-title-2");
    expandTitles2.forEach((expandTitle2, index) => {
        if (books[index]) {
            expandTitle2.innerHTML = `<h3>${books[index].title}</h3>`;
        }
    });
    
    const expandContents2 = document.querySelectorAll(".expandable-content-2");
    expandContents2.forEach((expandContent2, index) => {
        if (books[index]) {
            expandContent2.innerHTML = `<img class="book center" src="images/${books[index].image}" alt="Image of ${books[index.title]}">
            <button class="center avail-btn">Check Availabillity!</button>
            <button class="center buy-btn">Buy Book!</button>`;
        }
    })
}
// Call the function.
getBooks();

// This function is for adding event listeners to buttons
async function setButtons() {
    // Same as the previous function.
    const res = await fetch("http://localhost:3000/bookdata");
    const books = res.status === 200 && (await res.json());

    const availButtons = document.querySelectorAll(".avail-btn");
    availButtons.forEach((availButton, index) => {
        availButton.addEventListener("click", function() {
            // A string is used here instead of the actual true key word since it's parsed as a string. It's easier to do this way rather than parsing the data as a boolean and produces the same result either way.
            if (books[index].available == "TRUE") {
                window.alert(`${books[index].title} is available!`);
            }
            else {
                window.alert(`${books[index].title} is not available!`);
            }
        });
    });

    // Similar to the one for availButtons does different things when the button is clicked.
    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach((buyButton, index) => {
        buyButton.addEventListener("click", function() {
            if (books[index].available == "TRUE") {
                window.alert(`${books[index].title} has been bought! Thank you kindly!`);
                books[index].available = "FALSE";
            }
            else {
                window.alert(`${books[index].title} is not available!`);
            }
        })
    });
}
setButtons();

// Function to apply and unapply the expandable-open class on click of the icon.
document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = !!ev.target.closest(".expandable-icon");
    const expandable = ev.target.closest(".expandable");

    if (!isExpandableTitle) {
        return;
    }
    expandable.classList.toggle("expandable-open");
});