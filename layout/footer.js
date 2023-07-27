export function createFooter() {
    const footerContainer = document.createElement('footer');
    footerContainer.classList.add('footer-container');
  
    const footerSpanOne = document.createElement('span');
    footerSpanOne.classList.add('footer-span-one');
    footerSpanOne.textContent = 'Data sourced from the';
  
    const footerSpanTwo = document.createElement('a');
    footerSpanTwo.classList.add('footer-span-two');
    footerSpanTwo.href = 'https://www.tvmaze.com/api';
    footerSpanTwo.target = '_blank';
    footerSpanTwo.textContent = 'TVMaze.com API';
  
    footerContainer.appendChild(footerSpanOne);
    footerContainer.appendChild(footerSpanTwo);
  
    document.querySelector('.app-container').appendChild(footerContainer);
  }