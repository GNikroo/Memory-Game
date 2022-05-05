/*jshint esversion: 6 */
// The user can clear localStorage by clicking the button.
window.addEventListener('click', function(event) {
if (event.target.nodeName === 'BUTTON' && event.target.id === 'cookie-button') {
        localStorage.clear();
    }
});