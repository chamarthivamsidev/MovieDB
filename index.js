let temp = document.querySelector("#temp");
let url;
let container = document.querySelector("#container");
document.querySelector("form").addEventListener("submit", function (e) {
  container.textContent = null;
  e.preventDefault();

  let name = form.name.value;

  url = `https://www.omdbapi.com/?s=${name}&apikey=a20d168d`;

  getDetails();
});

async function getDetails() {
  let res = await fetch(url);

  let movie = await res.json();

  if (movie.Response === "False") {
    error();
  } else {
    let arr = movie.Search;

    arr.forEach(async function (item) {
      let id = item.imdbID;

      let url2 = `https://www.omdbapi.com/?i=${id}&apikey=a20d168d`;

      let res2 = await fetch(url2);

      let movie2 = await res2.json();

      showMovie(movie2);
    });
  }
}

function showMovie(movie) {
  temp.style.display = "none";
  let div = document.createElement("div");
  div.setAttribute("id", "mainDiv");

  let left_div = document.createElement("div");
  left_div.setAttribute("id", "image_div");

  let img = document.createElement("img");
  img.src = movie.Poster;

  left_div.append(img);

  let right_div = document.createElement("div");
  right_div.setAttribute("id", "content_div");

  let title = document.createElement("p");
  title.innerHTML = `${movie.Title}(${movie.Language})`;
  title.setAttribute("id", "title");

  let runtime = document.createElement("p");
  runtime.innerHTML = `${movie.Runtime}&nbsp&nbsp${movie.Released}`;
  runtime.setAttribute("id", "runtime");

  let desc = document.createElement("p");
  desc.innerHTML = `${movie.Plot}`;
  desc.setAttribute("id", "description");

  let director = document.createElement("p");
  director.innerHTML = `Director : ${movie.Director}`;
  director.setAttribute("class", "common");

  let actors = document.createElement("p");
  actors.innerHTML = `Actors : ${movie.Actors}`;
  actors.setAttribute("class", "common");

  let genre = document.createElement("p");
  genre.innerHTML = `Genres : ${movie.Genre}`;
  genre.setAttribute("class", "common");

  let imdb = document.createElement("p");
  imdb.innerHTML = `IMDB Rating : ${movie.imdbRating}`;
  imdb.setAttribute("class", "common");

  if (movie.imdbRating > 8.5) {
    let img1 = document.createElement("img");
    img1.src = "re.png";
    img1.setAttribute("id", "re");

    left_div.append(img, img1);
  }

  let award = document.createElement("p");
  award.innerHTML = `Awards : ${movie.Awards}`;
  award.setAttribute("class", "common");

  let box_office = document.createElement("p");
  box_office.innerHTML = `Box Office : ${movie.BoxOffice}`;
  box_office.setAttribute("class", "common");

  right_div.append(
    title,
    runtime,
    desc,
    director,
    actors,
    genre,
    imdb,
    award,
    box_office
  );

  if (movie.imdbRating > 8.5) {
    let img1 = document.createElement("img");
    img1.src = "./images/re.png";
    img1.setAttribute("id", "re");

    left_div.append(img, img1);
  }
  div.append(left_div, right_div);

  container.append(div);
}

function error() {
  temp.style.display = "none";
  container.textContent = null;

  let img = document.createElement("img");
  img.src = "https://c.tenor.com/IHdlTRsmcS4AAAAM/404.gif";
  img.style.width = "400px";
  img.style.height = "300px";
  img.style.marginLeft = "400px";

  container.append(img);
}
