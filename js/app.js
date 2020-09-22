/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navbarList = document.querySelector('#navbar__list');
const allSections = document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// check which section is active
function getActiveSection() {
    maxSection = allSections[0];
    minValue = 1000000;
    for (section of allSections) {
        let bounding = section.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minValue) {
            minValue = bounding.top;
            maxSection = section;
        };
    };
    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavMenu() {
    for (let item of allSections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navbarList.appendChild(section);
    };
};

// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveSection();
        section.classList.add('your-active-class');
        // set other sections as inactive
        for (let item of allSections) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        }
        // set corresponding header style
        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('active__link');
        // remove from other headers
        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {
            //console.log(item);
            if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
};

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
    navbarList.addEventListener('click', function (event) {
        const clickToScroll = document.querySelector('#' + event.target.dataset.nav)
        clickToScroll.scrollIntoView();
    });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNavMenu();

// Scroll to section on link click
scrollToSection();

// Set sections to be active
setActive();
