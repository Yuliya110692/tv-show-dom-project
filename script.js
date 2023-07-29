import { createFooter } from "./layout/footer.js";
import {createTitle} from "./layout/title.js";
import {createHeader} from "./layout/header.js";
import {createAppContainer} from "./Helpers/container.js";


let selectedShowId
let allTVShows = [];
let allEpisodes = [];

async function fetchAllTVCards() {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  return data;
}

async function fetchAllEpisodesFromApi(tvShowId) {
  if (tvShowId === 'none') {
    allEpisodes = [];
    resetSearch();
  } else {
    const response = await fetch(`https://api.tvmaze.com/shows/${tvShowId}/episodes`);
    const data = await response.json();
    return data;
  }
}

async function initialize() {
  allTVShows = await fetchAllTVCards();
  createAppContainer();
  createHeader();
  createTitle();

  initializeFunctionality();
  renderTVShowSelect();
  loadTVShowsIntoSelect(allTVShows);
  renderEpisodeSelect();

  createSearchInput();
  createSearchResetButton();
  createDisplayAndSearchEpisode(allEpisodes);


  createEpisodes();
  createFooter();

}
 function createDisplayAndSearchEpisode(episodesArray) {
  const searchResultsInfoContainer = document.createElement('div');
  searchResultsInfoContainer.classList.add('search-results-info-container');

  const searchResultsInfoSpanOne = document.createElement('span');
  searchResultsInfoSpanOne.classList.add('search-results-info-span-one');
  searchResultsInfoSpanOne.textContent = 'Displaying';

  const searchResultsInfoSpanTwo = document.createElement('span');
  searchResultsInfoSpanTwo.classList.add('search-results-info-span-two');
  searchResultsInfoSpanTwo.textContent = episodesArray.length;

  const searchResultsInfoSpanThree = document.createElement('span');
  searchResultsInfoSpanThree.classList.add('search-results-info-span-three');
  searchResultsInfoSpanThree.textContent = '/';

  const searchResultsInfoSpanFour = document.createElement('span');
  searchResultsInfoSpanFour.classList.add('search-results-info-span-four');
  searchResultsInfoSpanFour.textContent = episodesArray.length;

  const searchResultsInfoSpanFive = document.createElement('span');
  searchResultsInfoSpanFive.classList.add('search-results-info-span-five');
  searchResultsInfoSpanFive.textContent = 'episodes.';

  searchResultsInfoContainer.appendChild(searchResultsInfoSpanOne);
  searchResultsInfoContainer.appendChild(searchResultsInfoSpanTwo);
  searchResultsInfoContainer.appendChild(searchResultsInfoSpanThree);
  searchResultsInfoContainer.appendChild(searchResultsInfoSpanFour);
  searchResultsInfoContainer.appendChild(searchResultsInfoSpanFive);

  document.querySelector('.functionality-container').appendChild(searchResultsInfoContainer);
}

 function createSearchInput() {
  const searchInput = document.createElement('input');
  searchInput.classList.add('search-input');
  searchInput.placeholder = 'Search...';
  searchInput.addEventListener('input', searchWithInput);

  document.querySelector('.functionality-container').appendChild(searchInput);
}

//----------------------------------
function searchWithInput(event) {
  const searchTerm = event.target.value;
  if (searchTerm === '') {
    resetSearch();
  } else {
    const filteredEpisodes = allEpisodes.filter(episode => episode.name.toLowerCase().includes(searchTerm.toLowerCase()) || episode.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    clearEpisodes();
    generateEpisode(filteredEpisodes);
    refreshSearchResultsInfo(filteredEpisodes.length, allEpisodes.length);
  }
}

 function createSearchResetButton() {
  const searchResetButton = document.createElement('button');
  searchResetButton.classList.add('search-reset-button');
  searchResetButton.textContent = 'Reset';
  searchResetButton.addEventListener('click', resetSearch);

  document.querySelector('.functionality-container').appendChild(searchResetButton);
}

 function resetSearch() {
  refreshSearchResultsInfo(allEpisodes.length, allEpisodes.length);
  clearEpisodes();
  generateEpisode(allEpisodes);
  document.querySelector('.search-input').value = '';
}
//------------------------------
 function refreshSearchResultsInfo(filteredEpisodesLength, totalEpisodesLength) {
  document.querySelector('.search-results-info-span-two').textContent = filteredEpisodesLength;
  document.querySelector('.search-results-info-span-four').textContent = totalEpisodesLength;
}

function initializeFunctionality() {
  const functionality = document.createElement('div');
  functionality.classList.add('functionality-container');
  document.querySelector('.header-container').appendChild(functionality);
}

function renderTVShowSelect() {
  const tvShowSelect = document.createElement('select');
  tvShowSelect.classList.add('tv-show-select');
  tvShowSelect.addEventListener('change', chooseSpecificTVShow);

  const defaultTVShowOption = document.createElement('option');
  defaultTVShowOption.textContent = 'Select a specific show...';
  defaultTVShowOption.value = 'none';
  tvShowSelect.appendChild(defaultTVShowOption);

  document.querySelector('.functionality-container').appendChild(tvShowSelect);
}

async function chooseSpecificTVShow(event) {
  selectedShowId = event.target.value;
  allEpisodes = await fetchAllEpisodesFromApi(selectedShowId);
  createEpisode(allEpisodes);
  resetSearch();
}

function loadTVShowsIntoSelect(showsArray) {
  const tvShowSelect = document.querySelector('.tv-show-select');
  resetTVShowSelect()
  if (showsArray) {
    showsArray.forEach(show => {
      const option = document.createElement('option');
      option.classList.add('tv-show-option');
      option.textContent = show.name;
      option.value = show.id;
      tvShowSelect.appendChild(option);
    });
  }
}

function resetTVShowSelect() {
  const tvShowSelect = document.querySelector('.tv-show-select');
  while (tvShowSelect.childNodes.length > 1) {
    tvShowSelect.removeChild(tvShowSelect.lastChild);
  }
}

function renderEpisodeSelect() {
  const episodeSelect = document.createElement('select');
  episodeSelect.classList.add('episode-select');
  episodeSelect.addEventListener('change', chooseSpecificEpisode);

  const defaultEpisodeOption = document.createElement('option');
  defaultEpisodeOption.textContent = 'Select a specific episode...';
  defaultEpisodeOption.value = 'none';
  episodeSelect.appendChild(defaultEpisodeOption);

  document.querySelector('.functionality-container').appendChild(episodeSelect);
}

function chooseSpecificEpisode(event) {
  const specificEpisodeId = event.target.value;
  if (specificEpisodeId === 'none') {
    resetSearch();
  } else {
    const filteredEpisodes = allEpisodes.filter(episode => episode.id === Number(specificEpisodeId));
    clearEpisodes();
    generateEpisode(filteredEpisodes);
    refreshSearchResultsInfo(filteredEpisodes.length, allEpisodes.length);
  }
}

function createEpisode(episodesArray) {
  const episodeSelect = document.querySelector('.episode-select');
  clearEpisode();
  if (episodesArray) {
    episodesArray.forEach(episode => {
      const option = document.createElement('option');
      option.classList.add('episode-option');
      option.textContent = `${episode.name} - S${episode.season < 10 ? `0${episode.season}` : episode.season}${episode.number < 10 ? `0${episode.number}` : episode.number}`;
      option.value = episode.id;
      episodeSelect.appendChild(option);
    });
  }
}
//----------------------------
function clearEpisode() {
  const episodeSelect = document.querySelector('.episode-select');
  while (episodeSelect.childNodes.length > 1) {
    episodeSelect.removeChild(episodeSelect.lastChild);
  }
}

function createEpisodes() {
  const episodesContainer = document.createElement('main');
  episodesContainer.classList.add('episodes-container');

  document.querySelector('.app-container').appendChild(episodesContainer);
}

function generateEpisode(episodesArray) {
  episodesArray.forEach(episode => {
    const episodeContainer = document.createElement('div');
    episodeContainer.classList.add('episode-container');

    const episodeTitle = document.createElement('div');
    episodeTitle.classList.add('episode-title');
    episodeTitle.textContent = `${episode.name} - S${episode.season < 10 ? `0${episode.season}` : episode.season}${episode.number < 10 ? `0${episode.number}` : episode.number}`;

    const episodeBody = document.createElement('div');
    episodeBody.classList.add('episode-body');

    const episodeImage = document.createElement('img');
    episodeImage.classList.add('episode-image');
    episodeImage.src = episode.image.medium;

    const episodeSummary = document.createElement('div');
    episodeSummary.classList.add('episode-summary');
    episode.summary = episode.summary.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '').replaceAll('</br>', '');
    episodeSummary.textContent = episode.summary;

    episodeBody.appendChild(episodeImage);
    episodeBody.appendChild(episodeSummary);

    episodeContainer.appendChild(episodeTitle);
    episodeContainer.appendChild(episodeBody);

    document.querySelector('.episodes-container').appendChild(episodeContainer);
  });
}

function clearEpisodes() {
  const episodesContainer = document.querySelector('.episodes-container');
  while (episodesContainer.firstChild) {
    episodesContainer.removeChild(episodesContainer.lastChild);
  }
}

window.onload = initialize;

//testing commit 
//create a branch