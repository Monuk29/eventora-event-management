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
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
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
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
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
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
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
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
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
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
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
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
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

const resultCount = document.getElementById("resultCount");


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

    return `${days} ${days === 1 ? "day" : "days"} left`;

}


/* ====================================
   5. DISPLAY EVENT CARDS
==================================== */

function displayEvents(eventList) {

    eventsGrid.innerHTML = "";

    emptyMessage.hidden = eventList.length !== 0;

    resultCount.textContent = `Showing ${eventList.length} of ${events.length} events`;

    eventList.forEach(event => {

        const card = document.createElement("article");

        card.className = "event-card";

        const d = new Date(event.date);
        const registered = isRegistered(event.id);

        card.innerHTML = `
            <div class="event-image-wrapper">
                <img src="${event.image}" alt="${event.name}" class="event-image" loading="lazy" width="800" height="533">

                <div class="date-block">
                    <b>${d.getDate()}</b>
                    ${d.toLocaleDateString("en-IN", { month: "short" })}
                </div>

                <span class="event-category">
                    ${event.category}
                </span>
            </div>

            <div class="event-content">

                <h3>${event.name}</h3>

                <p class="event-description">
                    ${event.description}
                </p>

                <p class="event-location">
                    ${event.venue}, ${event.location}
                </p>

                <div class="event-footer">

                    <div>
                        <span class="event-price">
                            ${event.price}
                        </span>

                        <span class="event-countdown">
                            ${getCountdown(event.date)}
                        </span>
                    </div>

                    <button
                        class="details-btn${registered ? " is-registered" : ""}"
                        data-event-id="${event.id}"
                    >
                        ${registered ? "Registered ✓" : "View event ↗"}
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

    const activeFilter = document.querySelector(".filter-btn.active");

    const activeCategory = activeFilter
        ? activeFilter.dataset.category
        : "All";

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.setAttribute(
            "aria-pressed",
            String(button.dataset.category === activeCategory)
        );

    });

    const spotlight = document.getElementById("featuredEvent");

    if (spotlight) {

        spotlight.hidden =
            searchValue !== "" ||
            activeCategory !== "All" ||
            !spotlight.childElementCount;

    }

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

        <button
            class="modal-close"
            id="modalClose"
            aria-label="Close modal"
        >
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

        <p>${selectedEvent.description}</p>

        <dl class="facts">

            <div>
                <dt>Date</dt>
                <dd>${formatDate(selectedEvent.date)}</dd>
            </div>

            <div>
                <dt>Venue</dt>
                <dd>${selectedEvent.venue}</dd>
            </div>

            <div>
                <dt>Price</dt>
                <dd>${selectedEvent.price}</dd>
            </div>

        </dl>

        <div class="modal-actions">

            <button
                class="primary-btn"
                id="registerButton"
            >
                Register
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

        <h2>Event Registration</h2>

        <p>
            Complete your details to register for the event.
        </p>

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
                Confirm registration
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

        const registrations = getRegistrations();


        // Prevent duplicate registration

        const alreadyRegistered = registrations.some(item =>
            item.eventId === registeredEvent.id &&
            String(item.email).toLowerCase() === email.toLowerCase()
        );

        if (alreadyRegistered) {

            document.getElementById("emailError").textContent =
                "This email is already registered for this event.";

            return;

        }


        registrations.push(registration);

        try {

            localStorage.setItem(
                "eventRegistrations",
                JSON.stringify(registrations)
            );

        } catch (error) {

            document.getElementById("emailError").textContent =
                "Your browser could not save the registration. Please check Local Storage settings.";

            return;

        }


        // Display success message

        showSuccess(registration);

        syncRegistrations();

    });

}


/* ====================================
   13. REGISTRATION SUCCESS
==================================== */

function showSuccess(registration) {

    modalContent.innerHTML = `

        <div class="success-message">

            <div class="success-icon">
                ✓
            </div>

            <h2>You're registered</h2>

            <p>
                Thank you, ${escapeHTML(registration.name)}!
            </p>

            <br>

            <p>
                You have successfully registered for
                <strong>${escapeHTML(registration.event)}</strong>.
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

    const darkMode = document.body.classList.contains("dark-theme");

    themeToggle.textContent = darkMode ? "Light" : "Dark";

    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(darkMode)
    );

    const themeMeta = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeMeta) {

        themeMeta.content = darkMode ? "#22231f" : "#f3efe5";

    }

}


if (localStorage.getItem("eventoraTheme") === "dark") {

    document.body.classList.add("dark-theme");

}

updateThemeButton();


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    localStorage.setItem(
        "eventoraTheme",
        document.body.classList.contains("dark-theme")
            ? "dark"
            : "light"
    );

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
   17. MY REGISTRATIONS DASHBOARD
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

                <h3>No registrations yet</h3>

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


/* ====================================
   18. HTML ESCAPE FUNCTION
==================================== */

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


/* ====================================
   19. CANCEL REGISTRATION
==================================== */

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


    let registrations = getRegistrations();

    registrations = registrations.filter(
        registration => registration.id !== registrationId
    );


    try {

        localStorage.setItem(
            "eventRegistrations",
            JSON.stringify(registrations)
        );

    } catch (error) {

        toast("Could not update registrations. Please try again.");

        return;

    }


    // Refresh dashboard

    showRegistrations();

    syncRegistrations();

    toast("Registration cancelled");

});


/* ====================================
   20. REGISTRATION STORAGE
==================================== */

function getRegistrations() {

    try {

        const list = JSON.parse(
            localStorage.getItem("eventRegistrations") || "[]"
        );

        return Array.isArray(list) ? list : [];

    } catch (error) {

        console.warn(
            "Could not read saved registrations:",
            error
        );

        return [];

    }

}


// Check whether an event is already registered

function isRegistered(id) {

    return getRegistrations().some(
        registration => registration.eventId === id
    );

}


// Synchronize registration count and event cards

function syncRegistrations() {

    const count = getRegistrations().length;

    if (count) {

        registrationsLink.setAttribute("data-count", count);

    } else {

        registrationsLink.removeAttribute("data-count");

    }

    searchEvents();

}


/* ====================================
   21. TOAST NOTIFICATIONS
==================================== */

function toast(message) {

    const el = document.createElement("div");

    el.className = "toast";

    el.setAttribute("role", "status");

    el.textContent = message;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 2600);

}


/* ====================================
   22. HERO TICKET COUNTDOWN
==================================== */

// Find the next upcoming event

const ticket = document.getElementById("heroTicket");

const nextEvent = events
    .filter(event => new Date(event.date) > new Date())
    .sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )[0];


if (!nextEvent) {

    ticket.hidden = true;

} else {

    document.getElementById("tImg").style.backgroundImage =
        `url("${nextEvent.image}")`;

    document.getElementById("tName").textContent =
        nextEvent.name;

    document.getElementById("tMeta").textContent =

        new Date(nextEvent.date).toLocaleString("en-IN", {

            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit"

        }) + ", " + nextEvent.venue;


    document.getElementById("tOpen").addEventListener(
        "click",
        () => openEventDetails(nextEvent.id)
    );


    // Live countdown clock

    const clock = document.getElementById("tClock");

    const tick = () => {

        const s = Math.max(
            0,
            Math.floor(
                (new Date(nextEvent.date) - new Date()) / 1000
            )
        );

        clock.innerHTML = [

            ["days", Math.floor(s / 86400)],

            ["hours", Math.floor(s % 86400 / 3600)],

            ["min", Math.floor(s % 3600 / 60)],

            ["sec", s % 60]

        ]
            .map(([label, value]) => `

                <div>
                    <b>${String(value).padStart(2, "0")}</b>
                    <span>${label}</span>
                </div>

            `)
            .join("");

    };


    tick();

    setInterval(tick, 1000);


    // Interactive ticket animation

    if (
        matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        ticket.addEventListener("pointermove", event => {

            const r = ticket.getBoundingClientRect();

            ticket.style.setProperty(
                "--ry",
                ((event.clientX - r.left) / r.width - 0.5) * 10 + "deg"
            );

            ticket.style.setProperty(
                "--rx",
                (0.5 - (event.clientY - r.top) / r.height) * 10 + "deg"
            );

        });


        ticket.addEventListener("pointerleave", () => {

            ticket.style.setProperty("--rx", "0deg");

            ticket.style.setProperty("--ry", "0deg");

        });

    }

}


/* ====================================
   23. NAVIGATION HIGHLIGHT
==================================== */

// Highlight the navigation link for the section in view

const spy = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
            );

        });

    });

}, {
    rootMargin: "-45% 0px -50% 0px"
});


["home", "events", "about"].forEach(id => {

    const section = document.getElementById(id);

    if (section) {

        spy.observe(section);

    }

});


/* ====================================
   24. INITIALIZE REGISTRATIONS
==================================== */

syncRegistrations();


/* ====================================
   25. FEATURED EVENT
==================================== */

// Use an upcoming music event when available

const featuredEvent = document.getElementById("featuredEvent");

const upcomingEvents = events.filter(
    event => new Date(event.date) > new Date()
);

const spotlightEvent = upcomingEvents.find(
    event => event.category === "Music"
) || upcomingEvents[0];


if (spotlightEvent && featuredEvent) {

    featuredEvent.innerHTML = `

        <div class="featured-image-wrap">

            <img
                src="${spotlightEvent.image}"
                alt="${spotlightEvent.name}"
                loading="lazy"
                class="featured-image"
            >

        </div>

        <div class="featured-copy">

            <p class="eyebrow">
                In the spotlight · ${spotlightEvent.category}
            </p>

            <h3>${spotlightEvent.name}</h3>

            <p>${spotlightEvent.description}</p>

            <p class="featured-meta">
                ${formatDate(spotlightEvent.date)}
                <br>
                ${spotlightEvent.venue}, ${spotlightEvent.location}
            </p>

            <div class="featured-action">

                <span>
                    From
                    <strong>${spotlightEvent.price}</strong>
                </span>

                <button class="primary-btn" type="button">
                    View event ↗
                </button>

            </div>

        </div>

    `;


    featuredEvent.querySelector("button").addEventListener(
        "click",
        () => openEventDetails(spotlightEvent.id)
    );

    searchEvents();

}


/* ====================================
   26. MODAL ACCESSIBILITY
==================================== */

// Keep keyboard navigation inside an open event dialog
// and restore focus on close.

const dialogPanel = document.getElementById("modalPanel");

dialogPanel.setAttribute("role", "dialog");

dialogPanel.setAttribute("aria-modal", "true");

dialogPanel.setAttribute(
    "aria-label",
    "Event information and registrations"
);

dialogPanel.tabIndex = -1;


let previousFocus;


new MutationObserver(() => {

    if (!modalOverlay.hidden) {

        previousFocus = document.activeElement;

        dialogPanel.focus();

    } else if (previousFocus instanceof HTMLElement) {

        previousFocus.focus();

    }

}).observe(modalOverlay, {

    attributes: true,

    attributeFilter: ["hidden"]

});


modalOverlay.addEventListener("keydown", event => {

    if (event.key !== "Tab") return;

    const focusable = [

        ...dialogPanel.querySelectorAll(
            'button, a[href], input, select, [tabindex="0"]'
        )

    ].filter(element => {

        return !element.disabled &&
            element.getClientRects().length;

    });


    const first = focusable[0];

    const last = focusable[focusable.length - 1];


    if (!first) {

        event.preventDefault();

        return;

    }


    if (
        event.shiftKey &&
        (
            document.activeElement === first ||
            document.activeElement === dialogPanel
        )
    ) {

        event.preventDefault();

        last.focus();

    } else if (
        !event.shiftKey &&
        document.activeElement === last
    ) {

        event.preventDefault();

        first.focus();

    }

});


/* ====================================
   27. CATEGORY SHORTCUTS
==================================== */

// Category shortcuts take visitors directly
// to the matching event catalogue.

function chooseCategory(category) {

    searchInput.value = "";

    document.querySelectorAll(".filter-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === category
        );

    });

    searchEvents();

}


document.querySelectorAll("[data-discover]").forEach(button => {

    button.addEventListener("click", () => {

        chooseCategory(button.dataset.discover);

        document.getElementById("events").scrollIntoView({

            behavior: matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth"

        });

        searchInput.focus({
            preventScroll: true
        });

    });

});


/* ====================================
   28. RESET EVENT FILTERS
==================================== */

const resetFiltersButton = document.getElementById("resetFilters");

const emptyResetButton = document.getElementById("emptyResetButton");


function resetEventFilters() {

    chooseCategory("All");

    searchInput.value = "";

    searchEvents();

    searchInput.focus({
        preventScroll: true
    });

}


if (resetFiltersButton) {

    resetFiltersButton.addEventListener(
        "click",
        resetEventFilters
    );

}


if (emptyResetButton) {

    emptyResetButton.addEventListener(
        "click",
        resetEventFilters
    );

}


/* ====================================
   29. IMAGE FALLBACK
==================================== */

// Keep a usable image if an event's original
// artwork becomes unavailable.

document.addEventListener("error", event => {

    if (
        event.target instanceof HTMLImageElement &&
        !event.target.dataset.fallback
    ) {

        event.target.dataset.fallback = "true";

        event.target.src =
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85";

    }

}, true);


/* ====================================
   END OF EVENTORA JAVASCRIPT
==================================== */