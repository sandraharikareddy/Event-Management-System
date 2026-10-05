const ADMIN_EMAIL = "harikareddy.sandra221@gmail.com";
const ADMIN_PASSWORD = "admin123";


/* =====================================================
   DEFAULT EVENTS
   ===================================================== */

const SEED_EVENTS = [

    {
        id: "seed-event-1",
        title: "Tech Innovation Summit 2026",
        date: "2026-10-15",
        time: "10:00",
        venue: "KL University, Vijayawada",
        price: 499,
        capacity: 300,
        description:
            "Explore the latest innovations in technology, AI and emerging technologies.",
        reminder: true,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Conference"
    },

    {
        id: "seed-event-2",
        title: "AI & Machine Learning Workshop",
        date: "2026-10-20",
        time: "11:00",
        venue: "Vijayawada",
        price: 299,
        capacity: 120,
        description:
            "Learn the fundamentals of Artificial Intelligence and Machine Learning.",
        reminder: true,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Workshop"
    },

    {
        id: "seed-event-3",
        title: "Cultural Fest 2026",
        date: "2026-11-05",
        time: "17:00",
        venue: "KL University, Vijayawada",
        price: 199,
        capacity: 500,
        description:
            "Enjoy music, dance, cultural performances, food and exciting activities.",
        reminder: true,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Cultural"
    },

    {
        id: "seed-event-4",
        title: "Inter-College Hackathon 2026",
        date: "2026-11-15",
        time: "09:00",
        venue: "Vijayawada Innovation Hub",
        price: 399,
        capacity: 200,
        description:
            "Build innovative solutions and compete with talented students.",
        reminder: true,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Hackathon"
    },

    {
        id: "seed-event-5",
        title: "Startup & Entrepreneurship Meet",
        date: "2026-11-25",
        time: "14:00",
        venue: "Business Convention Hall, Vijayawada",
        price: 349,
        capacity: 180,
        description:
            "Meet founders, explore startup ideas and learn from industry experts.",
        reminder: false,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Business"
    },

    {
        id: "seed-event-6",
        title: "Winter Music Carnival 2026",
        date: "2026-12-10",
        time: "18:30",
        venue: "City Grounds, Vijayawada",
        price: 599,
        capacity: 600,
        description:
            "A colourful evening of live music, performances, food and entertainment.",
        reminder: true,
        owner: "sample-organizer@events.local",
        ownerName: "Event Management Team",
        category: "Music"
    }

];


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem("users")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


function getEvents() {

    try {

        return JSON.parse(
            localStorage.getItem("events")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveEvents(events) {

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

}


function getRegistrations() {

    try {

        return JSON.parse(
            localStorage.getItem("registrations")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveRegistrations(registrations) {

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("currentUser")
        );

    } catch (error) {

        return null;

    }

}


function generateId(prefix) {

    return (
        prefix +
        Date.now() +
        Math.floor(Math.random() * 1000)
    );

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatDate(date) {

    if (!date) {
        return "";
    }

    const d =
        new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatTime(time) {

    if (!time) {
        return "";
    }

    const [hour, minute] =
        time.split(":");

    const d = new Date();

    d.setHours(
        Number(hour),
        Number(minute),
        0,
        0
    );

    return d.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =====================================================
   INITIAL DATA
   ===================================================== */

function initializeData() {

    if (!localStorage.getItem("users")) {

        saveUsers([]);

    }


    if (!localStorage.getItem("events")) {

        saveEvents([]);

    }


    if (!localStorage.getItem("registrations")) {

        saveRegistrations([]);

    }


    /* Remove old demo account */

    saveUsers(

        getUsers().filter(
            function (user) {

                return (
                    String(
                        user.email || ""
                    ).toLowerCase()
                    !==
                    "student@gmail.com"
                );

            }
        )

    );


    let events = getEvents();


    /* Remove old Music Festival
       only when it is old demo data */

    const oldDemoTitles = [

        "Music Festival",
        "Tech Conference 2026"

    ];


    events = events.filter(

        function (event) {

            return !(
                oldDemoTitles.includes(
                    event.title
                )
                &&
                (
                    event.owner ===
                    "student@gmail.com"
                    ||
                    !event.owner
                )
            );

        }

    );


    /* Add six sample events */

    SEED_EVENTS.forEach(

        function (seed) {

            const alreadyExists =
                events.some(

                    function (event) {

                        return (
                            event.id ===
                            seed.id
                        );

                    }

                );


            if (!alreadyExists) {

                events.push(seed);

            }

        }

    );


    saveEvents(events);

}


/* =====================================================
   ROLE DASHBOARD REDIRECTION
   ===================================================== */

function redirectToRoleDashboard() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    window.location.href =
        "user-dashboard.html";

}


/* =====================================================
   ONE LOGIN
   ADMIN + ORGANIZER + ATTENDEE
   ===================================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value
                    .trim();


            const msg =
                document.getElementById(
                    "loginMsg"
                );


            msg.textContent = "";


            /* ADMIN LOGIN */

            if (
                email ===
                ADMIN_EMAIL.toLowerCase()
                &&
                password ===
                ADMIN_PASSWORD
            ) {

                localStorage.removeItem(
                    "currentUser"
                );

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                window.location.href =
                    "admin-dashboard.html";

                return;

            }


            /* ORGANIZER / ATTENDEE */

            const user =
                getUsers().find(

                    function (u) {

                        return (

                            String(
                                u.email || ""
                            ).toLowerCase()
                            === email

                            &&

                            u.password ===
                            password

                        );

                    }

                );


            if (!user) {

                msg.textContent =
                    "Invalid email or password.";

                msg.style.color =
                    "#dc2626";

                return;

            }


            localStorage.removeItem(
                "adminLoggedIn"
            );


            localStorage.setItem(

                "currentUser",

                JSON.stringify({

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    role: user.role

                })

            );


            redirectToRoleDashboard();

        }

    );

}


/* =====================================================
   SIGNUP
   ===================================================== */

function setupSignup() {

    const form =
        document.getElementById(
            "signupForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(

        "submit",

        function (e) {

            e.preventDefault();


            const name =
                document
                    .getElementById(
                        "signupName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "signupEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "signupPassword"
                    )
                    .value
                    .trim();


            const role =
                document
                    .getElementById(
                        "signupRole"
                    )
                    .value;


            const msg =
                document.getElementById(
                    "signupMsg"
                );


            msg.textContent = "";


            if (
                !name ||
                !email ||
                !password ||
                !role
            ) {

                msg.textContent =
                    "Please fill all fields.";

                msg.style.color =
                    "#dc2626";

                return;

            }


            if (password.length < 6) {

                msg.textContent =
                    "Password must contain at least 6 characters.";

                msg.style.color =
                    "#dc2626";

                return;

            }


            if (
                email ===
                ADMIN_EMAIL.toLowerCase()
            ) {

                msg.textContent =
                    "This email is reserved for the administrator.";

                msg.style.color =
                    "#dc2626";

                return;

            }


            const users =
                getUsers();


            const exists =
                users.some(

                    function (user) {

                        return (

                            String(
                                user.email || ""
                            ).toLowerCase()
                            === email

                        );

                    }

                );


            if (exists) {

                msg.textContent =
                    "Email already registered.";

                msg.style.color =
                    "#dc2626";

                return;

            }


            const newUser = {

                id:
                    generateId("user"),

                name:
                    name,

                email:
                    email,

                password:
                    password,

                role:
                    role

            };


            users.push(
                newUser
            );


            saveUsers(
                users
            );


            localStorage.removeItem(
                "adminLoggedIn"
            );


            localStorage.setItem(

                "currentUser",

                JSON.stringify({

                    id:
                        newUser.id,

                    name:
                        newUser.name,

                    email:
                        newUser.email,

                    role:
                        newUser.role

                })

            );


            msg.textContent =
                "Account created successfully!";

            msg.style.color =
                "#059669";


            setTimeout(

                redirectToRoleDashboard,

                500

            );

        }

    );

}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "login.html";

}


function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.href =
        "login.html";

}


/* =====================================================
   USER NAVIGATION
   ===================================================== */

function buildUserNav() {

    const nav =
        document.getElementById(
            "userNav"
        );


    if (!nav) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    let links = `

        <a href="user-dashboard.html">
            Dashboard
        </a>

        <a href="events.html">
            Events
        </a>

    `;


    if (
        user.role ===
        "organizer"
    ) {

        links += `

            <a href="my-events.html">
                My Events
            </a>

        `;

    } else {

        links += `

            <a href="my-registrations.html">
                My Registrations
            </a>

        `;

    }


    links += `

        <button
            onclick="logout()"
            class="logout-btn">

            Logout

        </button>

    `;


    nav.innerHTML =
        links;

}


/* =====================================================
   EVENT CARD
   ===================================================== */

function eventCardHTML(
    event,
    options = {}
) {

    const user =
        getCurrentUser();


    const registrations =
        getRegistrations();


    const sold =
        registrations.filter(

            function (r) {

                return (
                    r.eventId ===
                    event.id
                );

            }

        ).length;


    const remaining =
        Math.max(

            0,

            Number(
                event.capacity || 0
            )
            -
            sold

        );


    const registered =
        user &&
        registrations.some(

            function (r) {

                return (

                    r.eventId ===
                    event.id

                    &&

                    r.email ===
                    user.email

                );

            }

        );


    const isOrganizer =
        user &&
        user.role ===
        "organizer";


    const showRegister =
        options.showRegister !== false
        &&
        user
        &&
        user.role ===
        "attendee";


    const showManage =
        options.showManage === true
        &&
        isOrganizer
        &&
        event.owner ===
        user.email;


    return `

        <article class="event-card">

            <div class="event-badge">

                ${escapeHTML(
                    event.category ||
                    "Event"
                )}

            </div>


            <h2>
                ${escapeHTML(
                    event.title
                )}
            </h2>


            <p>

                <strong>
                    📅 Date:
                </strong>

                ${escapeHTML(
                    formatDate(
                        event.date
                    )
                )}

            </p>


            <p>

                <strong>
                    ⏰ Time:
                </strong>

                ${escapeHTML(
                    formatTime(
                        event.time
                    )
                )}

            </p>


            <p>

                <strong>
                    📍 Venue:
                </strong>

                ${escapeHTML(
                    event.venue
                )}

            </p>


            <p class="event-description">

                ${escapeHTML(
                    event.description
                )}

            </p>


            <div class="event-meta">

                <span>

                    <strong>
                        Ticket:
                    </strong>

                    ₹${Number(
                        event.price || 0
                    )}

                </span>


                <span>

                    <strong>
                        Available:
                    </strong>

                    ${remaining}

                </span>

            </div>


            <div class="event-actions">


                ${
                    showRegister

                    ?

                    `

                    <button

                        class="btn"

                        onclick="
                            registerForEvent(
                                '${event.id}'
                            )
                        "

                        ${
                            registered ||
                            remaining === 0
                            ?
                            "disabled"
                            :
                            ""
                        }

                    >

                        ${
                            registered
                            ?
                            "Registered"
                            :
                            remaining === 0
                            ?
                            "Sold Out"
                            :
                            "Register"
                        }

                    </button>

                    `

                    :

                    ""

                }


                ${
                    showManage

                    ?

                    `

                    <button

                        class="btn btn-outline"

                        onclick="
                            editEvent(
                                '${event.id}'
                            )
                        "

                    >

                        Edit

                    </button>


                    <button

                        class="btn btn-danger"

                        onclick="
                            deleteEvent(
                                '${event.id}'
                            )
                        "

                    >

                        Delete

                    </button>

                    `

                    :

                    ""

                }


            </div>


        </article>

    `;

}


/* =====================================================
   USER DASHBOARD
   ===================================================== */

function setupDashboard() {

    const dashboard =
        document.getElementById(
            "userDashboard"
        );


    if (!dashboard) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    buildUserNav();


    const welcome =
        document.getElementById(
            "welcomeUser"
        );


    const roleLabel =
        document.getElementById(
            "roleLabel"
        );


    const quickActions =
        document.getElementById(
            "quickActions"
        );


    const schedule =
        document.getElementById(
            "dashboardSchedule"
        );


    const events =
        getEvents().sort(

            function (a, b) {

                return (

                    a.date +
                    a.time

                ).localeCompare(

                    b.date +
                    b.time

                );

            }

        );


    const registrations =
        getRegistrations();


    welcome.textContent =
        "Welcome, " +
        user.name +
        "!";


    if (
        user.role ===
        "organizer"
    ) {

        roleLabel.textContent =
            "Organizer Dashboard";


        const myEvents =
            events.filter(

                function (event) {

                    return (
                        event.owner ===
                        user.email
                    );

                }

            );


        const myEventIds =
            new Set(

                myEvents.map(

                    function (event) {

                        return event.id;

                    }

                )

            );


        const myRegistrations =
            registrations.filter(

                function (registration) {

                    return myEventIds.has(
                        registration.eventId
                    );

                }

            );


        const revenue =
            myRegistrations.reduce(

                function (sum, registration) {

                    return (
                        sum +
                        Number(
                            registration.amount ||
                            0
                        )
                    );

                },

                0

            );


        document.getElementById(
            "statTitleOne"
        ).textContent =
            "My Events";


        document.getElementById(
            "statOne"
        ).textContent =
            myEvents.length;


        document.getElementById(
            "statTitleTwo"
        ).textContent =
            "Tickets Sold";


        document.getElementById(
            "statTwo"
        ).textContent =
            myRegistrations.length;


        document.getElementById(
            "statTitleThree"
        ).textContent =
            "Revenue";


        document.getElementById(
            "statThree"
        ).textContent =
            "₹" + revenue;


        quickActions.innerHTML = `

            <a
                href="create-event.html"
                class="btn">

                Create Event

            </a>


            <a
                href="my-events.html"
                class="btn">

                Manage My Events

            </a>


            <a
                href="events.html"
                class="btn btn-secondary">

                Explore Events

            </a>

        `;


        schedule.innerHTML =

            events
                .slice(0, 6)
                .map(

                    function (event) {

                        return eventCardHTML(

                            event,

                            {
                                showRegister:
                                    false,

                                showManage:
                                    true
                            }

                        );

                    }

                )
                .join("");

    }


    else {

        roleLabel.textContent =
            "Attendee Dashboard";


        const myRegistrations =
            registrations.filter(

                function (registration) {

                    return (
                        registration.email ===
                        user.email
                    );

                }

            );


        document.getElementById(
            "statTitleOne"
        ).textContent =
            "Registrations";


        document.getElementById(
            "statOne"
        ).textContent =
            myRegistrations.length;


        document.getElementById(
            "statTitleTwo"
        ).textContent =
            "Upcoming Events";


        document.getElementById(
            "statTwo"
        ).textContent =
            events.length;


        document.getElementById(
            "statTitleThree"
        ).textContent =
            "Tickets";


        document.getElementById(
            "statThree"
        ).textContent =
            myRegistrations.length;


        quickActions.innerHTML = `

            <a
                href="events.html"
                class="btn">

                Explore Events

            </a>


            <a
                href="my-registrations.html"
                class="btn">

                My Registrations

            </a>

        `;


        schedule.innerHTML =

            events
                .slice(0, 6)
                .map(

                    function (event) {

                        return eventCardHTML(

                            event,

                            {
                                showRegister:
                                    true
                            }

                        );

                    }

                )
                .join("");

    }

}


/* =====================================================
   EVENTS PAGE
   ===================================================== */

function setupEventsPage() {

    const container =
        document.getElementById(
            "allEvents"
        );


    if (!container) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    buildUserNav();


    const search =
        document.getElementById(
            "eventSearch"
        );


    function renderEvents(
        query = ""
    ) {

        const term =
            query
                .trim()
                .toLowerCase();


        const filtered =
            getEvents()

                .filter(

                    function (event) {

                        if (!term) {
                            return true;
                        }


                        return [

                            event.title,

                            event.venue,

                            event.description,

                            event.category

                        ].some(

                            function (value) {

                                return String(
                                    value || ""
                                )
                                .toLowerCase()
                                .includes(term);

                            }

                        );

                    }

                )

                .sort(

                    function (a, b) {

                        return (

                            a.date +
                            a.time

                        ).localeCompare(

                            b.date +
                            b.time

                        );

                    }

                );


        if (
            !filtered.length
        ) {

            container.innerHTML = `

                <div class="empty-message">

                    <h3>
                        No events available.
                    </h3>

                    <p>
                        Try a different search.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =

            filtered
                .map(

                    function (event) {

                        return eventCardHTML(

                            event,

                            {
                                showRegister:
                                    user.role ===
                                    "attendee"
                            }

                        );

                    }

                )
                .join("");

    }


    renderEvents();


    search.addEventListener(

        "input",

        function () {

            renderEvents(
                search.value
            );

        }

    );

}


/* =====================================================
   EVENT REGISTRATION
   ===================================================== */

function registerForEvent(
    eventId
) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    if (
        user.role !==
        "attendee"
    ) {

        alert(
            "Only attendees can register for events."
        );

        return;

    }


    const event =
        getEvents().find(

            function (event) {

                return (
                    event.id ===
                    eventId
                );

            }

        );


    if (!event) {
        return;
    }


    const registrations =
        getRegistrations();


    const alreadyRegistered =
        registrations.some(

            function (registration) {

                return (

                    registration.eventId ===
                    eventId

                    &&

                    registration.email ===
                    user.email

                );

            }

        );


    if (alreadyRegistered) {

        alert(
            "You are already registered for this event."
        );

        return;

    }


    const sold =
        registrations.filter(

            function (registration) {

                return (
                    registration.eventId ===
                    eventId
                );

            }

        ).length;


    if (
        sold >=
        Number(event.capacity)
    ) {

        alert(
            "Sorry, this event is sold out."
        );

        return;

    }


    const payment =
        confirm(

            "Ticket Price: ₹" +
            event.price +
            "\n\n" +
            "Proceed with simulated payment?"

        );


    if (!payment) {
        return;
    }


    const ticketId =
        "TKT-" +
        Date.now();


    registrations.push({

        id:
            generateId("reg"),

        eventId:
            event.id,

        eventTitle:
            event.title,

        email:
            user.email,

        name:
            user.name,

        amount:
            Number(event.price),

        ticketId:
            ticketId,

        date:
            new Date()
                .toLocaleDateString(
                    "en-IN"
                ),

        reminder:
            false

    });


    saveRegistrations(
        registrations
    );


    alert(

        "Registration successful!\n\n" +
        "Your Ticket ID: " +
        ticketId

    );


    window.location.href =
        "my-registrations.html";

}


/* =====================================================
   MY REGISTRATIONS
   ===================================================== */

function setupMyRegistrations() {

    const container =
        document.getElementById(
            "myRegistrations"
        );


    if (!container) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    buildUserNav();


    if (
        user.role !==
        "attendee"
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    This page is for attendees.
                </h3>

                <p>
                    Organizers can manage their
                    events from My Events.
                </p>

            </div>

        `;

        return;

    }


    const registrations =
        getRegistrations().filter(

            function (registration) {

                return (
                    registration.email ===
                    user.email
                );

            }

        );


    if (
        !registrations.length
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    No registrations yet.
                </h3>

                <p>
                    Explore events and register
                    for the ones you like.
                </p>

                <a
                    href="events.html"
                    class="btn">

                    Explore Events

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML =

        registrations.map(

            function (registration) {

                return `

                    <article
                        class="event-card registration-card">

                        <div class="event-badge">

                            Ticket Confirmed

                        </div>


                        <h2>

                            ${escapeHTML(
                                registration.eventTitle
                            )}

                        </h2>


                        <p>

                            <strong>
                                🎫 Ticket ID:
                            </strong>

                            ${escapeHTML(
                                registration.ticketId
                            )}

                        </p>


                        <p>

                            <strong>
                                💳 Amount Paid:
                            </strong>

                            ₹${Number(
                                registration.amount ||
                                0
                            )}

                        </p>


                        <p>

                            <strong>
                                📅 Registered On:
                            </strong>

                            ${escapeHTML(
                                registration.date
                            )}

                        </p>


                        <p>

                            <strong>
                                🔔 Reminder:
                            </strong>

                            ${
                                registration.reminder
                                ?
                                "Set"
                                :
                                "Not Set"
                            }

                        </p>


                        <button

                            class="btn"

                            onclick="
                                setReminder(
                                    '${registration.id}'
                                )
                            "

                        >

                            ${
                                registration.reminder
                                ?
                                "Reminder Set"
                                :
                                "Set Reminder"
                            }

                        </button>


                    </article>

                `;

            }

        ).join("");

}


/* =====================================================
   REMINDER
   ===================================================== */

function setReminder(
    registrationId
) {

    const registrations =
        getRegistrations();


    const registration =
        registrations.find(

            function (registration) {

                return (
                    registration.id ===
                    registrationId
                );

            }

        );


    if (!registration) {
        return;
    }


    registration.reminder =
        true;


    saveRegistrations(
        registrations
    );


    alert(
        "Reminder set successfully!"
    );


    setupMyRegistrations();

}


/* =====================================================
   MY EVENTS - ORGANIZER
   ===================================================== */

function setupMyEvents() {

    const container =
        document.getElementById(
            "organizerEvents"
        );


    if (!container) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    buildUserNav();


    if (
        user.role !==
        "organizer"
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    This page is for organizers.
                </h3>

                <p>
                    Attendees can explore and
                    register for events.
                </p>

            </div>

        `;


        const createButton =
            document.getElementById(
                "createEventLink"
            );


        if (createButton) {

            createButton.style.display =
                "none";

        }


        return;

    }


    const events =
        getEvents().filter(

            function (event) {

                return (
                    event.owner ===
                    user.email
                );

            }

        );


    if (
        !events.length
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    You have not created any events yet.
                </h3>

                <p>
                    Create your first event to start
                    managing registrations and revenue.
                </p>

                <a
                    href="create-event.html"
                    class="btn">

                    Create Event

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML =

        events.map(

            function (event) {

                return eventCardHTML(

                    event,

                    {
                        showRegister:
                            false,

                        showManage:
                            true
                    }

                );

            }

        ).join("");

}


/* =====================================================
   CREATE EVENT
   ===================================================== */

function setupCreateEvent() {

    const form =
        document.getElementById(
            "createEventForm"
        );


    if (!form) {
        return;
    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    buildUserNav();


    if (
        user.role !==
        "organizer"
    ) {

        document.querySelector(
            ".create-event-card"
        ).innerHTML = `

            <div class="access-denied">

                <h1>
                    Access Restricted
                </h1>

                <p>
                    Only organizers can create events.
                </p>

                <a
                    href="user-dashboard.html"
                    class="btn">

                    Back to Dashboard

                </a>

            </div>

        `;

        return;

    }


    form.addEventListener(

        "submit",

        function (e) {

            e.preventDefault();


            const event = {

                id:
                    generateId("event"),

                title:
                    document
                        .getElementById(
                            "eventTitle"
                        )
                        .value
                        .trim(),

                date:
                    document
                        .getElementById(
                            "eventDate"
                        )
                        .value,

                time:
                    document
                        .getElementById(
                            "eventTime"
                        )
                        .value,

                venue:
                    document
                        .getElementById(
                            "eventVenue"
                        )
                        .value
                        .trim(),

                price:
                    Number(
                        document
                            .getElementById(
                                "eventPrice"
                            )
                            .value
                    ),

                capacity:
                    Number(
                        document
                            .getElementById(
                                "eventCapacity"
                            )
                            .value
                    ),

                description:
                    document
                        .getElementById(
                            "eventDescription"
                        )
                        .value
                        .trim(),

                category:
                    document
                        .getElementById(
                            "eventCategory"
                        )
                        .value,

                reminder:
                    document
                        .getElementById(
                            "eventReminder"
                        )
                        .checked,

                owner:
                    user.email,

                ownerName:
                    user.name

            };


            const events =
                getEvents();


            events.push(
                event
            );


            saveEvents(
                events
            );


            const msg =
                document.getElementById(
                    "createEventMsg"
                );


            msg.textContent =
                "Event created successfully!";


            msg.style.color =
                "#059669";


            form.reset();


            setTimeout(

                function () {

                    window.location.href =
                        "my-events.html";

                },

                600

            );

        }

    );

}


/* =====================================================
   EDIT EVENT
   ===================================================== */

function editEvent(
    eventId
) {

    const user =
        getCurrentUser();


    if (
        !user ||
        user.role !==
        "organizer"
    ) {

        return;

    }


    const events =
        getEvents();


    const event =
        events.find(

            function (event) {

                return (

                    event.id ===
                    eventId

                    &&

                    event.owner ===
                    user.email

                );

            }

        );


    if (!event) {

        alert(
            "You can edit only your own events."
        );

        return;

    }


    const title =
        prompt(
            "Event title:",
            event.title
        );


    if (title === null) {
        return;
    }


    const priceText =
        prompt(
            "Ticket price:",
            event.price
        );


    if (priceText === null) {
        return;
    }


    const capacityText =
        prompt(
            "Capacity:",
            event.capacity
        );


    if (capacityText === null) {
        return;
    }


    event.title =
        title.trim() ||
        event.title;


    event.price =
        Math.max(
            0,
            Number(priceText) || 0
        );


    event.capacity =
        Math.max(
            1,
            Number(capacityText) ||
            event.capacity
        );


    saveEvents(
        events
    );


    alert(
        "Event updated successfully!"
    );


    setupMyEvents();

}


/* =====================================================
   DELETE EVENT
   ===================================================== */

function deleteEvent(
    eventId
) {

    const user =
        getCurrentUser();


    if (
        !user ||
        user.role !==
        "organizer"
    ) {

        return;

    }


    const events =
        getEvents();


    const event =
        events.find(

            function (event) {

                return (

                    event.id ===
                    eventId

                    &&

                    event.owner ===
                    user.email

                );

            }

        );


    if (!event) {
        return;
    }


    if (
        !confirm(
            `Delete "${event.title}"?`
        )
    ) {

        return;

    }


    saveEvents(

        events.filter(

            function (event) {

                return (
                    event.id !==
                    eventId
                );

            }

        )

    );


    saveRegistrations(

        getRegistrations().filter(

            function (registration) {

                return (
                    registration.eventId !==
                    eventId
                );

            }

        )

    );


    alert(
        "Event deleted successfully!"
    );


    setupMyEvents();

}


/* =====================================================
   ADMIN DASHBOARD
   ===================================================== */

function setupAdminDashboard() {

    const table =
        document.getElementById(
            "adminEventTable"
        );


    if (!table) {
        return;
    }


    if (
        localStorage.getItem(
            "adminLoggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "login.html";

        return;

    }


    const events =
        getEvents();


    const users =
        getUsers();


    const registrations =
        getRegistrations();


    const revenue =
        registrations.reduce(

            function (
                sum,
                registration
            ) {

                return (

                    sum +
                    Number(
                        registration.amount ||
                        0
                    )

                );

            },

            0

        );


    document.getElementById(
        "adminEvents"
    ).textContent =
        events.length;


    document.getElementById(
        "adminUsers"
    ).textContent =
        users.length;


    document.getElementById(
        "adminRegistrations"
    ).textContent =
        registrations.length;


    document.getElementById(
        "adminRevenue"
    ).textContent =
        "₹" + revenue;


    table.innerHTML =

        events.map(

            function (event) {


                const sold =
                    registrations.filter(

                        function (
                            registration
                        ) {

                            return (
                                registration.eventId ===
                                event.id
                            );

                        }

                    ).length;


                const eventRevenue =
                    registrations

                        .filter(

                            function (
                                registration
                            ) {

                                return (
                                    registration.eventId ===
                                    event.id
                                );

                            }

                        )

                        .reduce(

                            function (
                                sum,
                                registration
                            ) {

                                return (

                                    sum +
                                    Number(
                                        registration.amount ||
                                        0
                                    )

                                );

                            },

                            0

                        );


                return `

                    <tr>

                        <td>

                            ${escapeHTML(
                                event.title
                            )}

                        </td>


                        <td>

                            ${escapeHTML(
                                formatDate(
                                    event.date
                                )
                            )}

                        </td>


                        <td>

                            ${escapeHTML(
                                event.ownerName ||
                                "Organizer"
                            )}

                        </td>


                        <td>

                            ${sold}/${Number(
                                event.capacity ||
                                0
                            )}

                        </td>


                        <td>

                            ₹${eventRevenue}

                        </td>


                        <td>

                            <button

                                class="btn btn-danger table-btn"

                                onclick="
                                    adminDeleteEvent(
                                        '${event.id}'
                                    )
                                "

                            >

                                Delete

                            </button>

                        </td>


                    </tr>

                `;

            }

        ).join("");

}


/* =====================================================
   ADMIN DELETE EVENT
   ===================================================== */

function adminDeleteEvent(
    eventId
) {

    if (
        localStorage.getItem(
            "adminLoggedIn"
        ) !== "true"
    ) {

        return;

    }


    const events =
        getEvents();


    const event =
        events.find(

            function (event) {

                return (
                    event.id ===
                    eventId
                );

            }

        );


    if (!event) {
        return;
    }


    if (
        !confirm(
            `Delete "${event.title}"?`
        )
    ) {

        return;

    }


    saveEvents(

        events.filter(

            function (event) {

                return (
                    event.id !==
                    eventId
                );

            }

        )

    );


    saveRegistrations(

        getRegistrations().filter(

            function (registration) {

                return (
                    registration.eventId !==
                    eventId
                );

            }

        )

    );


    setupAdminDashboard();

}


/* =====================================================
   PAGE INITIALIZATION
   ===================================================== */

function initializePage() {

    initializeData();


    setupLogin();

    setupSignup();

    setupDashboard();

    setupEventsPage();

    setupCreateEvent();

    setupMyEvents();

    setupMyRegistrations();

    setupAdminDashboard();

}


document.addEventListener(

    "DOMContentLoaded",

    initializePage

);