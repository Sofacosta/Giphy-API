import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(function() {
  $('#searchButton').on('click', function() {
    const searchQuery = $('#keyword').val();
    $('#keyword').val("");
    $('.showGifs').html("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchQuery}&limit=5&offset=0&rating=g&lang=en`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      body.data.forEach(function(gif) {
        $('.showGifs').append(`<img src="${gif.images.original.url}" alt="${gif.title}"><br><br>`)
      });
    }, function(error) {
      $('.showerrors').text('There was an error processing your request: ${error}');
      
    }
    
  }
  });
});

