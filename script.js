const imageBtn = document.getElementById('loadImageBtn');
const spaceImage = document.getElementById('spaceImage');
const imageCredit = document.getElementById('imageCredit');

// Array of space image URLs and credits
const spaceImages = [
    {
        url: 'https://images.unsplash.com/photo-1581320540356-0c9623f1e6b0?auto=format&fit=crop&w=800&q=80',
        credit: 'Unsplash'
    },
    {
        url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
        credit: 'Unsplash'
    },
    {
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
        credit: 'Unsplash'
    },
    {
        url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
        credit: 'Unsplash'
    },
    {
        url: 'https://images.nasa.gov/asset/PIA23791/medium',
        credit: 'NASA'
    }
];

imageBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * spaceImages.length);
    spaceImage.src = spaceImages[randomIndex].url;
    imageCredit.textContent = `Image Credit: ${spaceImages[randomIndex].credit}`;
});
