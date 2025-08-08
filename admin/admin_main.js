import { router } from './admin_router';

console.log('Admin main script loaded');

document.getElementById('admin_navbar').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const link = event.target.getAttribute('href');
        console.log('Navigating to:', link);
        location.hash = link;
    }
});

window.addEventListener('load', router);
window.addEventListener('hashchange', router);