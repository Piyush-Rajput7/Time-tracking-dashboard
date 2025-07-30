const cardsContainer = document.querySelector('.cards');
const buttons = document.querySelectorAll('.btn-time-zone');

let currentTimeframe = 'weekly'; // default timeframe

const timeframeLabels = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month',
};

const iconsMap = {
  Work: './images/icon-work.svg',
  Play: './images/icon-play.svg',
  Study: './images/icon-study.svg',
  Exercise: './images/icon-exercise.svg',
  Social: './images/icon-social.svg',
  'Self Care': './images/icon-self-care.svg',
};

function load() {
    fetch('./data.json')  // Change path as needed
      .then(res => res.json())
      .then(data => {
        // Initial render
        renderCards(data, currentTimeframe);
  
        // Set active button on load
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons.forEach(btn => {
          if (btn.textContent.toLowerCase() === currentTimeframe) {
            btn.classList.add('active');
          }
        });
  
        // Setup event listeners
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            const selected = button.textContent.toLowerCase();
            if (selected !== currentTimeframe) {
              currentTimeframe = selected;
              renderCards(data, currentTimeframe);
              setActiveButton(button);
            }
          });
        });
      })
      .catch(err => console.error('Error loading JSON:', err));
  }

function renderCards(data, timeframe) {
  cardsContainer.innerHTML = '';

  data.forEach(({ title, timeframes }) => {
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;
    const icon = iconsMap[title] || '';

    const card = document.createElement('div');
    card.classList.add('card', title.toLowerCase().replace(' ', '-'));

    card.innerHTML = `
      <div class="card-top">
        <img src="${icon}" alt="${title} icon" />
      </div>
      <div class="card-content">
        <div class="card-header">
          <span>${title}</span>
          <img src="./images/icon-ellipsis.svg" alt="menu icon" />
        </div>
        <div class="card-body">
          <h2>${current}hrs</h2>
          <p>Last ${timeframeLabels[timeframe]} - ${previous}hrs</p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

function setActiveButton(button) {
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}



// Call load() to start everything
load();
