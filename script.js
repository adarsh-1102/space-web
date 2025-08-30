const sun = document.getElementById('sun');
const exploreBtn = document.getElementById('exploreBtn');
const spaceImage = document.getElementById('spaceImage');
const imageCredit = document.getElementById('imageCredit');

// Toggle Dark Mode
sun.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Random Space Images
const spaceImages = [
    { url: 'https://images.unsplash.com/photo-1581320540356-0c9623f1e6b0?auto=format&fit=crop&w=800&q=80', credit: 'Unsplash' },
    { url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80', credit: 'Unsplash' },
    { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80', credit: 'Unsplash' },
    { url: 'https://images.nasa.gov/asset/PIA23791/medium', credit: 'NASA' }
];

exploreBtn.addEventListener('click', () => {
    const random = Math.floor(Math.random() * spaceImages.length);
    spaceImage.src = spaceImages[random].url;
    imageCredit.textContent = `Image Credit: ${spaceImages[random].credit}`;
});
