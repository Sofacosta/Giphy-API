import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(function() {
  $('#searchButton').on('click', function() {
    const searchQuery = $('#keyword').val();
    $('#keyword').val("");
    $('.showGifs').html("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchQuery}&limit=5&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET",url,true);
    request.send();

    function getElements(response) {
      response.data.forEach(function(gif) {
        $('.showGifs').append(`<img src="${gif.images.original.url}" alt="${gif.title}"><br><br>`)
      })
    }
  });
});

