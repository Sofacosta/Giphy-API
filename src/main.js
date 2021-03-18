import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './GiphyService.js'; 


function clearFields() {
  $('#keyword').val("");
  $('.showErrors').text("");
  $('.showGifs').text("");
}

$(function() {
  $('#searchButton').on('click', function() {
    const searchQuery = $('#keyword').val();
    clearFields();
    let promise = GiphyService.getGif(searchQuery);
    promise.then(function(response) {
      const body = JSON.parse(response);
      body.data.forEach(function(gif) {
        $('.showGifs').append(`<img src="${gif.images.original.url}" alt="${gif.title}"><br><br>`);
      }); 
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
  $('#randomButton').on('click', function() {
    clearFields();
    let promise = GiphyService.getRandom();
    promise.then(function(response){
      const body = JSON.parse(response);
      console.log(body.data.image_original_url);
      $('.showGifs').html(`<img src="${body.data.images.original.url}" alt="${body.data.title}">`);
    }, function(error){
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});

