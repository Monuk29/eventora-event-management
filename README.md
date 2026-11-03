Eventora — Event Management Website

Eventora is a responsive event discovery and registration website built with HTML5, CSS3, and vanilla JavaScript. It helps visitors explore upcoming events in Bhubaneswar and Cuttack, search and filter event listings, view event details, and save registrations in their browser.

Team: PixelPulse
Live Demo: https://grand-douhua-2aab11.netlify.app/
GitHub Repository: https://github.com/Monuk29/eventora-event-management

Features

Responsive layout for desktop, tablet, and mobile screens.

Dark and light themes, with the selected theme saved in Local Storage.

Hero section featuring the next upcoming event.

Live countdown in the featured event ticket, showing days, hours, minutes, and seconds.

Event cards generated dynamically from JavaScript event data.

Search events by event name, venue, or location.

Filter events by category: Technology, Music, Workshop, and Business.

Event details displayed in a modal, including date, venue, price, and description.

Registration form collecting name, email, phone number, and selected event.

JavaScript validation for participant details.

Registration confirmation after a valid submission.

My Registrations dashboard showing saved registrations and event details.

Registration cancellation, registration-count badge, and toast notification.

Event cards indicate when the visitor has already registered for an event.

Mobile navigation menu, active-section navigation highlighting, and keyboard/modal close support.

Reduced-motion preference support.

Technologies Used

HTML5 — page structure and semantic elements.

CSS3 — layout, responsive styling, themes, transitions, and animations.

JavaScript (vanilla) — event rendering, search, category filtering, countdowns, modal interactions, validation, and registration management.

Browser Local Storage — saves the selected theme and registration data in the current browser.

Google Fonts — Bricolage Grotesque typography.

Git and GitHub — version control and source-code hosting.

Netlify — website deployment.

Project Structure

Eventora/
├── index.html
├── style.css
├── script.js
└── README.md

Run the Project Locally

Clone the repository:

git clone https://github.com/Monuk29/eventora-event-management.git

Open the cloned Eventora folder in Visual Studio Code.

Open index.html with the VS Code Live Server extension, or open the file directly in a modern web browser.

Browse the event cards, try the search and category filters, open an event, and test the registration flow.

No package installation or build command is required because this is a static HTML, CSS, and JavaScript project.

Registration Data and Limitations

Eventora stores registrations in the browser's Local Storage. Visitors can view and cancel registrations from the My Registrations dashboard in the same browser.

This is a frontend demonstration. It does not currently use a backend server or shared database, so registrations are not available across different browsers or devices. The listed events are sample data maintained in script.js; the project does not process payments or issue real tickets or email confirmations.

Deployment

The website is deployed on Netlify:

https://grand-douhua-2aab11.netlify.app/

The site can be updated by pushing changes to the connected GitHub repository; Netlify can then publish the updated static site from the repository's configured production branch.

Future Improvements

Backend API and database integration for shared registrations.

Admin dashboard for managing events and registrations.

Event creation and editing tools.

Real ticket booking and payment integration.

Email confirmations and registration receipts.

Team

PixelPulse

Developed as an academic Event Management Website project using HTML5, CSS3, and JavaScript.