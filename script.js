/* ====================================
   1. EVENT DATABASE
==================================== */

// Sample event data

const events = [

    {
        id: 1,
        name: "Tech Innovation Summit",
        category: "Technology",
        date: "2026-11-21T10:00:00",
        venue: "Bhubaneswar Convention Centre",
        location: "Bhubaneswar",
        price: "₹499",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "Explore the future of artificial intelligence, web development, robotics and emerging technologies. Meet industry professionals and technology enthusiasts."
    },

    {
        id: 2,
        name: "Music Under The Stars",
        category: "Music",
        date: "2026-12-05T18:00:00",
        venue: "Open Air Auditorium",
        location: "Bhubaneswar",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
        description: "Experience an unforgettable musical evening featuring live performances, talented artists and an energetic atmosphere."
    },

    {
        id: 3,
        name: "Creative Web Development",
        category: "Workshop",
        date: "2026-12-12T11:00:00",
        venue: "Innovation Hub",
        location: "Bhubaneswar",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        description: "Learn modern web development techniques, build interactive websites and explore practical frontend development."
    },

    {
        id: 4,
        name: "Startup & Business Expo",
        category: "Business",
        date: "2026-12-19T09:00:00",
        venue: "Business Tower",
        location: "Cuttack",
        price: "₹599",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
        description: "Connect with entrepreneurs, discover innovative startups and learn how to transform ideas into successful businesses."
    },

    {
        id: 5,
        name: "Future of Artificial Intelligence",
        category: "Technology",
        date: "2027-01-09T10:00:00",
        venue: "KIIT Conference Hall",
        location: "Bhubaneswar",
        price: "₹399",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        description: "Discover how artificial intelligence and machine learning are transforming industries and shaping our future."
    },

    {
        id: 6,
        name: "Digital Marketing Masterclass",
        category: "Workshop",
        date: "2027-01-23T11:00:00",
        venue: "Learning Centre",
        location: "Bhubaneswar",
        price: "₹249",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        description: "Learn social media marketing, content strategy, SEO and other essential digital marketing skills."
    }

];


/* ====================================
   2. SELECT HTML ELEMENTS
==================================== */

const eventsGrid = document.getElementById("eventsGrid");

const searchInput = document.getElementById("searchInput");

const categoryFilters = document.getElementById("categoryFilters");

const emptyMessage = document.getElementById("emptyMessage");

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


/* ====================================
   3. DATE FORMATTER
==================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}


/* ====================================
   4. COUNTDOWN FUNCTION
==================================== */

function getCountdown(dateString) {

    const eventDate = new Date(dateString);

    const now = new Date();

    const difference = eventDate - now;

    if (difference <= 0) {
        return "Event started";
    }

    const days = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    return `${days} days left`;

}


/* ====================================
   5. DISPLAY EVENT CARDS
==================================== */

function displayEvents(eventList) {

    eventsGrid.innerHTML = "";

    emptyMessage.hidden = eventList.length !== 0;

    eventList.forEach(event => {

        const card = document.createElement("article");

        card.className = "event-card";

        card.innerHTML = `

            <div class="event-image-wrapper">

                <img
                    src="${event.image}"
                    alt="${event.name}"
                    class="event-image"
                >

                <span class="event-category">
                    ${event.category}
                </span>

            </div>

            <div class="event-content">

                <p class="event-date">
                    📅 ${formatDate(event.date)}
                </p>

                <h3>${event.name}</h3>

                <p class="event-description">
                    ${event.description}
                </p>

                <p class="event-location">
                    📍 ${event.venue}
                </p>

                <div class="event-footer">

                    <span class="event-countdown">
                        ⏳ ${getCountdown(event.date)}
                    </span>

                    <button
                        class="details-btn"
                        data-event-id="${event.id}"
                    >
                        View Details ↗
                    </button>

                </div>

            </div>

        `;

        eventsGrid.appendChild(card);

    });

}


/* ====================================
   6. SEARCH EVENTS
==================================== */

function searchEvents() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const activeCategory = document.querySelector(
        ".filter-btn.active"
    ).dataset.category;

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchValue) ||
            event.venue.toLowerCase().includes(searchValue) ||
            event.location.toLowerCase().includes(searchValue);

        const matchesCategory =
            activeCategory === "All" ||
            event.category === activeCategory;

        return matchesSearch && matchesCategory;

    });

    displayEvents(filteredEvents);

}

searchInput.addEventListener("input", searchEvents);


/* ====================================
   7. CATEGORY FILTER
==================================== */

categoryFilters.addEventListener("click", function(event) {

    if (!event.target.classList.contains("filter-btn")) {
        return;
    }

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.classList.remove("active");

    });

    event.target.classList.add("active");

    searchEvents();

});


/* ====================================
   8. CREATE EVENT MODAL
==================================== */

const modalOverlay = document.createElement("div");

modalOverlay.className = "modal-overlay";

modalOverlay.hidden = true;

modalOverlay.innerHTML = `

    <div class="modal-panel" id="modalPanel">

        <button class="modal-close" id="modalClose" aria-label="Close modal">
            &times;
        </button>

        <div id="modalContent"></div>

    </div>

`;

document.body.appendChild(modalOverlay);

const modalContent = document.getElementById("modalContent");


/* ====================================
   9. OPEN EVENT DETAILS
==================================== */

function openEventDetails(eventId) {

    const selectedEvent = events.find(
        event => event.id === Number(eventId)
    );

    if (!selectedEvent) return;

    modalContent.innerHTML = `

        <img
            src="${selectedEvent.image}"
            alt="${selectedEvent.name}"
            class="modal-event-image"
        >

        <p class="event-date">
            ${selectedEvent.category}
        </p>

        <h2>${selectedEvent.name}</h2>

        <p>
            ${selectedEvent.description}
        </p>

        <br>

        <p>
            📅 <strong>Date:</strong>
            ${formatDate(selectedEvent.date)}
        </p>

        <br>

        <p>
            📍 <strong>Venue:</strong>
            ${selectedEvent.venue}
        </p>

        <br>

        <p>
            🎟️ <strong>Price:</strong>
            ${selectedEvent.price}
        </p>

        <div class="modal-actions">

            <button
                class="primary-btn"
                id="registerButton"
            >
                Register Now ↗
            </button>

            <button
                class="secondary-btn"
                id="backButton"
            >
                Close
            </button>

        </div>

    `;

    modalOverlay.hidden = false;

    document.body.style.overflow = "hidden";

    document.getElementById("registerButton").addEventListener(
        "click",
        function() {
            openRegistrationForm(selectedEvent);
        }
    );

    document.getElementById("backButton").addEventListener(
        "click",
        closeModal
    );

}


/* ====================================
   10. EVENT CARD CLICK
==================================== */

eventsGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".details-btn");

    if (!button) return;

    openEventDetails(button.dataset.eventId);

});


/* ====================================
   11. REGISTRATION FORM
==================================== */

function openRegistrationForm(selectedEvent) {

    modalContent.innerHTML = `

        <p class="eyebrow">JOIN THE EXPERIENCE</p>

        <h2>Event Registration</h2>

        <p>Complete your details to register for the event.</p>

        <form class="registration-form" id="registrationForm">

            <div class="form-group">

                <label for="participantName">
                    Full Name
                </label>

                <input
                    type="text"
                    id="participantName"
                    placeholder="Enter your full name"
                    required
                    minlength="3"
                >

                <span class="form-error" id="nameError"></span>

            </div>


            <div class="form-group">

                <label for="participantEmail">
                    Email Address
                </label>

                <input
                    type="email"
                    id="participantEmail"
                    placeholder="example@gmail.com"
                    required
                >

                <span class="form-error" id="emailError"></span>

            </div>


            <div class="form-group">

                <label for="participantPhone">
                    Phone Number
                </label>

                <input
                    type="tel"
                    id="participantPhone"
                    placeholder="Enter 10-digit phone number"
                    maxlength="10"
                    required
                >

                <span class="form-error" id="phoneError"></span>

            </div>


            <div class="form-group">

                <label for="selectedEvent">
                    Selected Event
                </label>

                <select id="selectedEvent" required>

                    ${events.map(event => `

                        <option
                            value="${event.id}"
                            ${event.id === selectedEvent.id ? "selected" : ""}
                        >

                            ${event.name}

                        </option>

                    `).join("")}

                </select>

            </div>


            <button type="submit" class="primary-btn">
                Confirm Registration ↗
            </button>

        </form>

    `;


    /* ====================================
       12. FORM VALIDATION
    ==================================== */

    const registrationForm = document.getElementById(
        "registrationForm"
    );

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById(
            "participantName"
        ).value.trim();

        const email = document.getElementById(
            "participantEmail"
        ).value.trim();

        const phone = document.getElementById(
            "participantPhone"
        ).value.trim();

        const eventId = Number(
            document.getElementById("selectedEvent").value
        );


        // Clear previous errors

        document.getElementById("nameError").textContent = "";

        document.getElementById("emailError").textContent = "";

        document.getElementById("phoneError").textContent = "";


        let valid = true;


        // Name validation

        if (!/^[a-zA-Z\s'-]{3,}$/.test(name)) {

            document.getElementById("nameError").textContent =
                "Please enter a valid name (minimum 3 characters).";

            valid = false;

        }


        // Email validation

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        // Phone validation

        const phonePattern = /^[6-9]\d{9}$/;

        if (!phonePattern.test(phone)) {

            document.getElementById("phoneError").textContent =
                "Enter a valid 10-digit Indian mobile number.";

            valid = false;

        }


        if (!valid) return;


        // Find the selected event

        const registeredEvent = events.find(
            event => event.id === eventId
        );

        if (!registeredEvent) return;


        // Create registration object

        const registration = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            event: registeredEvent.name,

            eventId: registeredEvent.id,

            registrationDate: new Date().toISOString()

        };


        // Save registration in Local Storage

        let registrations = JSON.parse(
            localStorage.getItem("eventRegistrations") || "[]"
        );

        registrations.push(registration);

        localStorage.setItem(
            "eventRegistrations",
            JSON.stringify(registrations)
        );


        // Display success message

        showSuccess(registration);

    });

}


/* ====================================
   13. REGISTRATION SUCCESS
==================================== */

function showSuccess(registration) {

    modalContent.innerHTML = `

        <div class="success-message">

            <div class="success-icon">
                ✅
            </div>

            <h2>Registration Successful!</h2>

            <p>
                Thank you, ${registration.name}!
            </p>

            <br>

            <p>
                You have successfully registered for
                <strong>${registration.event}</strong>.
            </p>

            <br>

            <p>
                A confirmation has been recorded in this browser.
            </p>

            <br>

            <button
                class="primary-btn"
                id="successClose"
            >
                Continue Exploring
            </button>

        </div>

    `;

    document.getElementById("successClose").addEventListener(
        "click",
        closeModal
    );

}


/* ====================================
   14. CLOSE MODAL
==================================== */

function closeModal() {

    modalOverlay.hidden = true;

    document.body.style.overflow = "";

}

document.getElementById("modalClose").addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener("click", function(event) {

    if (event.target === modalOverlay) {

        closeModal();

    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && !modalOverlay.hidden) {

        closeModal();

    }

});


/* ====================================
   15. DARK / LIGHT MODE
==================================== */

function updateThemeButton() {

    const lightMode = document.body.classList.contains("light-theme");

    themeToggle.textContent = lightMode ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        lightMode ? "Switch to dark mode" : "Switch to light mode"
    );

}


if (localStorage.getItem("eventoraTheme") === "light") {

    document.body.classList.add("light-theme");

}

updateThemeButton();


themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("light-theme");

    const currentTheme =
        document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("eventoraTheme", currentTheme);

    updateThemeButton();

});


/* ====================================
   16. MOBILE NAVIGATION
==================================== */

menuToggle.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});

/* ====================================
   18. MY REGISTRATIONS DASHBOARD
==================================== */

// Open My Registrations

const registrationsLink = document.getElementById(
    "registrationsLink"
);

registrationsLink.addEventListener("click", function(event) {

    event.preventDefault();

    navLinks.classList.remove("open");

    menuToggle.textContent = "☰";

    menuToggle.setAttribute("aria-expanded", "false");

    showRegistrations();

});


// Display all registrations

function showRegistrations() {

    let registrations = [];

    try {

        registrations = JSON.parse(
            localStorage.getItem("eventRegistrations") || "[]"
        );

        if (!Array.isArray(registrations)) {
            registrations = [];
        }

    } catch (error) {

        registrations = [];

    }


    modalOverlay.hidden = false;

    document.body.style.overflow = "hidden";


    // Check whether registrations exist

    if (registrations.length === 0) {

        modalContent.innerHTML = `

            <div class="empty-registrations">

                <h2>My Registrations</h2>

                <h3>🎟️ No Registrations Yet</h3>

                <p>
                    You haven't registered for any events.
                    Explore our events and book your experience!
                </p>

                <br>

                <button
                    class="primary-btn"
                    id="exploreEventsBtn"
                >
                    Explore Events
                </button>

            </div>

        `;

        document.getElementById("exploreEventsBtn")
            .addEventListener("click", closeModal);

        return;

    }


    // Display registered events

    modalContent.innerHTML = `

        <h2>My Registrations</h2>

        <p>
            You have registered for ${registrations.length} event(s).
        </p>

        <div class="registrations-list">

            ${registrations.map(registration => {

                const registeredEvent = events.find(
                    event => event.id === registration.eventId
                );

                return `

                    <article class="registration-item">

                        <h3>${escapeHTML(registration.event)}</h3>

                        <p>
                            <strong>Participant:</strong>
                            ${escapeHTML(registration.name)}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${escapeHTML(registration.email)}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${escapeHTML(registration.phone)}
                        </p>

                        <p>
                            <strong>Event Date:</strong>
                            ${registeredEvent
                                ? formatDate(registeredEvent.date)
                                : "Unavailable"}
                        </p>

                        <p>
                            <strong>Venue:</strong>
                            ${registeredEvent
                                ? escapeHTML(registeredEvent.venue)
                                : "Unavailable"}
                        </p>

                        <p>
                            <strong>Registration ID:</strong>
                            ${registration.id}
                        </p>

                        <button
                            class="remove-registration"
                            data-registration-id="${registration.id}"
                        >
                            Cancel Registration
                        </button>

                    </article>

                `;

            }).join("")}

        </div>

    `;

}


// Prevent user-provided text from being treated as HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


// Remove individual registration

modalContent.addEventListener("click", function(event) {

    const button = event.target.closest(".remove-registration");

    if (!button) return;

    const registrationId = Number(
        button.dataset.registrationId
    );

    const confirmCancel = confirm(
        "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) return;


    let registrations = JSON.parse(
        localStorage.getItem("eventRegistrations") || "[]"
    );

    registrations = registrations.filter(
        registration => registration.id !== registrationId
    );


    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );


    // Refresh dashboard

    showRegistrations();

});

/* ====================================
   19. INITIALIZE WEBSITE
==================================== */

displayEvents(events);