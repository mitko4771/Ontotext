window.onload = () => {
  function loadBeers() {
    let beerSection = document.querySelector(".output");

    let request = new XMLHttpRequest();
    request.open("GET", "data.json", false);
    request.send();
    let jsonData = JSON.parse(request.responseText);

    Object.keys(jsonData.data).forEach(beer => {
      let beerHolder = document.createElement("div");
      let img = document.createElement("img");
      let h1 = document.createElement("h1");
      let paragraph = document.createElement("p");
      let alcohol = document.createElement("p");

      beerHolder.classList.add("beerHolder");

      img.src = "../img/" + jsonData.data[beer].id + ".jpg";

      h1.textContent = jsonData.data[beer].name;
      paragraph.textContent = jsonData.data[beer].description;
      alcohol.textContent = jsonData.data[beer].alcohol;

      h1.contentEditable = true;
      paragraph.contentEditable = true;
      alcohol.contentEditable = true;

      beerHolder.appendChild(img);
      beerHolder.appendChild(h1);
      beerHolder.appendChild(paragraph);
      beerHolder.appendChild(alcohol);
      beerSection.appendChild(beerHolder);
    });
  }

  window.onscroll = () => {
    let header = document.querySelector("form");
    let sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  function sortBeersAlphabetic() {
    let items = document.getElementsByClassName("beerHolder");
    let selectAlpha = document.querySelector("#alphabetical");
    items = Array.prototype.slice.call(items);

    selectAlpha.firstElementChild.addEventListener("click", () => {
      items.sort(function(a, b) {
        return a.children[1].textContent.localeCompare(
          b.children[1].textContent
        );
      });

      items.forEach(element => {
        let parent = element.parentNode;
        let detatchedItem = parent.removeChild(element);
        parent.appendChild(detatchedItem);
      });
    });

    selectAlpha.lastElementChild.addEventListener("click", () => {
      items.sort(function(a, b) {
        return b.children[1].textContent.localeCompare(
          a.children[1].textContent
        );
      });

      items.forEach(element => {
        let parent = element.parentNode;
        let detatchedItem = parent.removeChild(element);
        parent.appendChild(detatchedItem);
      });
    });
  }

  function sortBeersNumeric() {
    let items = document.getElementsByClassName("beerHolder");
    let selectNumeric = document.querySelector("#numerical");
    items = Array.prototype.slice.call(items);

    selectNumeric.firstElementChild.addEventListener("click", () => {
      items.sort(function(a, b) {
        return (
          parseFloat(a.children[3].textContent) -
          parseFloat(b.children[3].textContent)
        );
      });

      items.forEach(element => {
        let parent = element.parentNode;
        let detatchedItem = parent.removeChild(element);
        parent.appendChild(detatchedItem);
      });
    });

    selectNumeric.lastElementChild.addEventListener("click", () => {
      items.sort(function(a, b) {
        return (
          parseFloat(b.children[3].textContent) -
          parseFloat(a.children[3].textContent)
        );
      });

      items.forEach(element => {
        let parent = element.parentNode;
        let detatchedItem = parent.removeChild(element);
        parent.appendChild(detatchedItem);
      });
    });
  }

  loadBeers();
  sortBeersAlphabetic();
  sortBeersNumeric();
}; // end of load func
