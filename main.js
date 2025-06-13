// Fetch data from JSON file and populate cards
const fetchExtensionsData = async () => {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch extensions data');
    }
    const extensionsData = await response.json();
    populateCards(extensionsData);
  } catch (error) {
    console.error('Error loading extensions data:', error);
    // You could show an error message to the user here
    document.querySelector('.grid').innerHTML = `
      <div class="error-message">
        <p>Failed to load extensions. Please try again later.</p>
      </div>
    `;
  }
};

// Arrow function to create card HTML
const createCard = extension => `
  <div class="card">
    <div class="card-details">
      <div class="icon">
        <img src="${extension.logo}" alt="${extension.name}">
      </div>
      <div class="icon-description">
        <h2>${extension.name}</h2>
        <p>${extension.description}</p>
      </div>
    </div>
    <div class="inputs">
      <button class="remove">Remove</button>
      <label class="switch">
        <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>
  </div>
`;

// Arrow function to populate cards with fetched data
const populateCards = extensionsData => {
  const container = document.querySelector('.grid');
  container.innerHTML = extensionsData.map(createCard).join('');
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', fetchExtensionsData);