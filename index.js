// SELECTOR
var inputBox = document.getElementById("search-text");
var searchList = document.getElementById("search-list");
var resultGrid = document.getElementById("result-grid");

// Eventlistener
inputBox.addEventListener("keyup", getInputValue);

// FUNCTION

// display Movies in movie List
async function getMovieList(searchedString) {
  $.get(
    `https://www.omdbapi.com/?s=${searchedString}&page=1&apikey=bfd6b563`,
    (data) => {
      displayMovieList(data.Search);
    }
  );
};

// Gets the Entered input string From input Box
function getInputValue() {
  var searchedString = inputBox.value.trim();
  if (searchedString.length > 1) {
    searchList.classList.remove('hide-search-list');
    getMovieList(searchedString);
  }else{
        searchList.classList.add('hide-search-list');
    }
}

var listDiv;
async function displayMovieList(data) {
  searchList.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    listDiv = document.createElement("div");
    listDiv.dataset.id = data[i].imdbID;
    listDiv.classList.add("search-list-item");
    moviePoster = data[i].Poster;
    if(moviePoster == 'N/A'){
        moviePoster = "./images/notFound.png"
      }
      listDiv.innerHTML = `
      
        <div class="search-item-thumnail">
        <img src='${moviePoster}' alt="Image">
        </div>
        <div class="search-item-info">
        <h3>${data[i].Title}</h3>
        <p>${data[i].Year}</p>
        </div>
        `
        searchList.appendChild(listDiv);
  }
  loadMovieDetails();
}

// https://www.omdbapi.com/?i=tt3896198&apikey=bfd6b563
// Load Movie Details From API 
function loadMovieDetails(){
  const movieDetails = document.querySelectorAll(".search-list-item");
  movieDetails.forEach(movie =>{
    movie.addEventListener("click", async () => {
      searchList.classList.add('hide-search-list');
      inputBox.value = "";
      console.log(movie.dataset.id);
      $.get(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bfd6b563`, (data) =>{
        displayMovieDetails(data);
        console.log("day",data);
      })
    })
  })
}

function displayMovieDetails(movieDetails){
  console.log(movieDetails);
  resultGrid.innerHTML = `
  <div class="movie-poster">
      <img src="${movieDetails.Poster}" alt="">
  </div>
  <div class="movie-info">
      <h3 class="movie-titel">${movieDetails.Title}</h3>
      <ul class="movie-music-info">
          <li class="year">${movieDetails.Year} </li>
          <li class="rated">${movieDetails.Rated} </li>
          <li class="released">${movieDetails.Released}</li>
      </ul>
      <p class="genr"><b>Genr:  </b> ${movieDetails.Genre}</p>
      <p class="writer"><b>writer :
      </b>${movieDetails.Writer}</p>
      <p class="actors"><b>actors: </b>${movieDetails.Actors}</p>
      <p class="plot"><b>plot: </b>${movieDetails.Plot}</p>
      <p class="language"><b>languag:</b>${movieDetails.Language}</p>
      <p class="awards"><b><i class="fa-solid fa-award"></i></b>${movieDetails.Awards}</p>
  </div>
  `
}

