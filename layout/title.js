export function createTitle() {
    const title = document.createElement('div');
    title.classList.add('title-container');
  
    const titleImage = document.createElement('img');
    titleImage.classList.add('title-image');
  
    const titleHeading = document.createElement('h1');
    titleHeading.classList.add('title-heading');
    titleHeading.textContent = 'TV Show DOM Project';
  
    title.appendChild(titleImage);
    title.appendChild(titleHeading);
  
    document.querySelector('.header-container').appendChild(title);
  }

  
  