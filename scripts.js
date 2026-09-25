// =====================================================
// EVENT MANAGEMENT SYSTEM
// =====================================================

const ADMIN_EMAIL = "harikareddy.sandra221@gmail.com";
const ADMIN_PASSWORD = "admin123";


// =====================================================
// LOCAL STORAGE
// =====================================================

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getEvents() {
    return JSON.parse(localStorage.getItem("events")) || [];
}

function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}

function getRegistrations() {
    return JSON.parse(
        localStorage.getItem("registrations")
    ) || [];
}

function saveRegistrations(registrations) {
    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );
}

function getCurrentUser() {
    return JSON.parse(
        localStorage.getItem("currentUser")
    );
}


// =====================================================
// ID
// =====================================================

function generateId(prefix) {

    return prefix +
        Date.now() +
        Math.floor(Math.random() * 1000);

}


// =====================================================
// INITIAL DATA
// =====================================================

function initializeData() {

   function setupUserLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        const msg = document.getElementById("loginMsg");

        const users = getUsers();

        const user = users.find(function (u) {

            return (
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password
            );

        });

        if (!user) {

            msg.textContent = "Invalid email or password.";
            msg.style.color = "red";
            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        );

        window.location.href = "user-dashboard.html";

    });

}

    if (!localStorage.getItem("events")) {

        saveEvents([

            {
                id: "event1",
                title: "Tech Conference 2026",
                date: "2026-10-15",
                time: "10:00",
                venue: "Hyderabad Convention Centre",
                price: 500,
                capacity: 200,
                description:
                    "A conference about technology, AI and innovation.",
                reminder: true,
                owner: "student@gmail.com",
                ownerName: "Demo Student"
            },

            {
                id: "event2",
                title: "Music Festival",
                date: "2026-11-10",
                time: "18:00",
                venue: "City Grounds",
                price: 800,
                capacity: 500,
                description:
                    "Live music festival with multiple performances.",
                reminder: true,
                owner: "student@gmail.com",
                ownerName: "Demo Student"
            }

        ]);

    }

    if (!localStorage.getItem("registrations")) {

        saveRegistrations([]);

    }

}


// =====================================================
// USER LOGIN
// =====================================================

function setupUserLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        const msg = document.getElementById("loginMsg");

        const users = getUsers();

        const user = users.find(function (u) {

            return (
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password
            );

        });

        if (!user) {

            msg.textContent = "Invalid email or password.";
            msg.style.color = "red";
            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        );

        window.location.href = "user-dashboard.html";

    });

}

// =====================================================
// SIGN UP
// =====================================================

function setupSignup() {

    const form =
        document.getElementById("signupForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document.getElementById("signupName")
                .value
                .trim();

            const email =
                document.getElementById("signupEmail")
                .value
                .trim();

            const password =
                document.getElementById("signupPassword")
                .value
                .trim();

            const role =
                document.getElementById("signupRole")
                .value;

            const msg =
                document.getElementById("signupMsg");


            if (!name ||
                !email ||
                !password ||
                !role) {

                msg.textContent =
                    "Please fill all fields.";

                msg.style.color = "red";

                return;

            }


            const users = getUsers();

            const existing =
                users.find(function (u) {

                    return (
                        u.email.toLowerCase() ===
                        email.toLowerCase()
                    );

                });


            if (existing) {

                msg.textContent =
                    "Email already registered.";

                msg.style.color = "red";

                return;

            }


            const newUser = {

                id: generateId("user"),

                name: name,

                email: email,

                password: password,

                role: role

            };


            users.push(newUser);

            saveUsers(users);


            // Automatically login

            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                })
            );


            window.location.href =
                "user-dashboard.html";

        }
    );

}


// =====================================================
// USER LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href =
        "user-login.html";

}


// =====================================================
// CREATE EVENT
// =====================================================

function setupCreateEvent() {

    const form =
        document.getElementById("createEventForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const user =
                getCurrentUser();

            if (!user) {

                window.location.href =
                    "user-login.html";

                return;

            }

            if (user.role !== "organizer") {

                const msg =
                    document.getElementById(
                        "createEventMsg"
                    );

                msg.textContent =
                    "Only organizers can create events.";

                msg.style.color = "red";

                return;

            }


            const event = {

                id: generateId("event"),

                title:
                    document.getElementById(
                        "eventTitle"
                    ).value,

                date:
                    document.getElementById(
                        "eventDate"
                    ).value,

                time:
                    document.getElementById(
                        "eventTime"
                    ).value,

                venue:
                    document.getElementById(
                        "eventVenue"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "eventPrice"
                        ).value
                    ),

                capacity:
                    Number(
                        document.getElementById(
                            "eventCapacity"
                        ).value
                    ),

                description:
                    document.getElementById(
                        "eventDescription"
                    ).value,

                reminder:
                    document.getElementById(
                        "eventReminder"
                    ).checked,

                owner:
                    user.email,

                ownerName:
                    user.name

            };


            const events = getEvents();

            events.push(event);

            saveEvents(events);


            document.getElementById(
                "createEventMsg"
            ).textContent =
                "Event created successfully!";


            document.getElementById(
                "createEventMsg"
            ).style.color = "green";


            form.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "my-events.html";

                },
                800
            );

        }
    );

}


// =====================================================
// DASHBOARD
// =====================================================

function loadDashboard() {

    const user =
        getCurrentUser();

    if (!user) {

        window.location.href =
            "user-login.html";

        return;

    }


    const welcome =
        document.getElementById(
            "welcomeUser"
        );

    if (welcome) {

        welcome.textContent =
            "Welcome, " + user.name + "!";

    }


    const events = getEvents();

    const registrations =
        getRegistrations();


    const statOne =
        document.getElementById("statOne");

    const statTwo =
        document.getElementById("statTwo");

    const statThree =
        document.getElementById("statThree");


    if (user.role === "organizer") {

        const myEvents =
            events.filter(function (event) {

                return event.owner === user.email;

            });


        const ids =
            myEvents.map(function (event) {

                return event.id;

            });


        const registrationsForMyEvents =
            registrations.filter(
                function (registration) {

                    return ids.includes(
                        registration.eventId
                    );

                }
            );


        const revenue =
            registrationsForMyEvents.reduce(
                function (total, registration) {

                    return total +
                        Number(
                            registration.amount || 0
                        );

                },
                0
            );


        if (statOne)
            statOne.textContent =
                myEvents.length;

        if (statTwo)
            statTwo.textContent =
                registrationsForMyEvents.length;

        if (statThree)
            statThree.textContent =
                "₹" + revenue;

    }

    else {

        const myRegistrations =
            registrations.filter(
                function (registration) {

                    return (
                        registration.email ===
                        user.email
                    );

                }
            );


        const amount =
            myRegistrations.reduce(
                function (total, registration) {

                    return total +
                        Number(
                            registration.amount || 0
                        );

                },
                0
            );


        if (statOne)
            statOne.textContent =
                events.length;

        if (statTwo)
            statTwo.textContent =
                myRegistrations.length;

        if (statThree)
            statThree.textContent =
                "₹" + amount;

    }


    loadDashboardSchedule();

}


// =====================================================
// DASHBOARD SCHEDULE
// =====================================================

function loadDashboardSchedule() {

    const container =
        document.getElementById(
            "dashboardSchedule"
        );

    if (!container) return;


    const events = getEvents();

    container.innerHTML = "";


    events.slice(0, 5).forEach(
        function (event) {

            container.innerHTML += `

                <div class="schedule-item">

                    <h3>${event.title}</h3>

                    <p>📅 ${event.date}</p>

                    <p>⏰ ${event.time}</p>

                    <p>📍 ${event.venue}</p>

                </div>

            `;

        }
    );

}


// =====================================================
// MY EVENTS
// =====================================================

function loadMyEvents() {

    const container =
        document.getElementById(
            "organizerEvents"
        );

    if (!container) return;


    const user =
        getCurrentUser();

    if (!user) {

        window.location.href =
            "user-login.html";

        return;

    }


    const events = getEvents();

    const myEvents =
        events.filter(function (event) {

            return event.owner === user.email;

        });


    const registrations =
        getRegistrations();


    container.innerHTML = "";


    if (myEvents.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <p>
                    You have not created any events yet.
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


    myEvents.forEach(function (event) {

        const eventRegistrations =
            registrations.filter(
                function (registration) {

                    return (
                        registration.eventId ===
                        event.id
                    );

                }
            );


        const revenue =
            eventRegistrations.reduce(
                function (total, registration) {

                    return total +
                        Number(
                            registration.amount || 0
                        );

                },
                0
            );


        container.innerHTML += `

            <div class="event-card">

                <h2>${event.title}</h2>

                <p>📅 ${event.date}</p>

                <p>⏰ ${event.time}</p>

                <p>📍 ${event.venue}</p>

                <p>${event.description}</p>

                <hr>

                <p>
                    <strong>Tickets Sold:</strong>
                    ${eventRegistrations.length}
                    / ${event.capacity}
                </p>

                <p>
                    <strong>Revenue:</strong>
                    ₹${revenue}
                </p>

                <button
                    class="btn"
                    onclick="editEvent('${event.id}')">

                    Edit

                </button>

                <button
                    class="btn"
                    onclick="deleteEvent('${event.id}')">

                    Delete

                </button>

            </div>

        `;

    });

}


// =====================================================
// EDIT EVENT
// =====================================================

function editEvent(eventId) {

    const events = getEvents();

    const event =
        events.find(function (event) {

            return event.id === eventId;

        });


    if (!event) return;


    const title =
        prompt(
            "Enter event title:",
            event.title
        );

    if (title === null) return;


    const venue =
        prompt(
            "Enter venue:",
            event.venue
        );

    if (venue === null) return;


    const price =
        prompt(
            "Enter ticket price:",
            event.price
        );

    if (price === null) return;


    event.title = title;

    event.venue = venue;

    event.price = Number(price);


    saveEvents(events);


    alert(
        "Event updated successfully!"
    );


    loadMyEvents();

}


// =====================================================
// DELETE EVENT
// =====================================================

function deleteEvent(eventId) {

    if (
        !confirm(
            "Are you sure you want to delete this event?"
        )
    ) {
        return;
    }


    let events = getEvents();


    events =
        events.filter(function (event) {

            return event.id !== eventId;

        });


    saveEvents(events);


    let registrations =
        getRegistrations();


    registrations =
        registrations.filter(
            function (registration) {

                return (
                    registration.eventId !==
                    eventId
                );

            }
        );


    saveRegistrations(registrations);


    alert(
        "Event deleted successfully!"
    );


    loadMyEvents();

}


// =====================================================
// EVENTS
// =====================================================

function loadEvents() {

    const container =
        document.getElementById(
            "allEvents"
        );

    if (!container) return;


    displayEvents(getEvents());

}


function displayEvents(events) {

    const container =
        document.getElementById(
            "allEvents"
        );

    if (!container) return;


    const registrations =
        getRegistrations();


    container.innerHTML = "";


    if (events.length === 0) {

        container.innerHTML = `

            <p class="empty-message">
                No events available.
            </p>

        `;

        return;

    }


    events.forEach(function (event) {

        const sold =
            registrations.filter(
                function (registration) {

                    return (
                        registration.eventId ===
                        event.id
                    );

                }
            ).length;


        const available =
            event.capacity - sold;


        container.innerHTML += `

            <div class="event-card">

                <h2>${event.title}</h2>

                <p>
                    📅 <strong>Date:</strong>
                    ${event.date}
                </p>

                <p>
                    ⏰ <strong>Time:</strong>
                    ${event.time}
                </p>

                <p>
                    📍 <strong>Venue:</strong>
                    ${event.venue}
                </p>

                <p>
                    ${event.description}
                </p>

                <p>
                    <strong>Ticket Price:</strong>
                    ₹${event.price}
                </p>

                <p>
                    <strong>Available Tickets:</strong>
                    ${available}
                </p>

                <button
                    class="btn"
                    onclick="registerForEvent('${event.id}')"
                    ${available <= 0 ? "disabled" : ""}>

                    ${
                        available <= 0
                        ? "Sold Out"
                        : "Register"
                    }

                </button>

            </div>

        `;

    });

}


// =====================================================
// EVENT SEARCH
// =====================================================

function setupEventSearch() {

    const search =
        document.getElementById(
            "eventSearch"
        );

    if (!search) return;


    search.addEventListener(
        "input",
        function () {

            const text =
                this.value.toLowerCase();


            const filtered =
                getEvents().filter(
                    function (event) {

                        return (
                            event.title
                                .toLowerCase()
                                .includes(text)

                            ||

                            event.venue
                                .toLowerCase()
                                .includes(text)

                            ||

                            event.description
                                .toLowerCase()
                                .includes(text)
                        );

                    }
                );


            displayEvents(filtered);

        }
    );

}


// =====================================================
// REGISTER
// =====================================================

function registerForEvent(eventId) {

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "Please login first."
        );

        window.location.href =
            "user-login.html";

        return;

    }


    const event =
        getEvents().find(
            function (event) {

                return event.id === eventId;

            }
        );


    if (!event) return;


    let registrations =
        getRegistrations();


    const alreadyRegistered =
        registrations.find(
            function (registration) {

                return (
                    registration.eventId ===
                    eventId &&

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


    if (sold >= event.capacity) {

        alert(
            "Sorry, this event is sold out."
        );

        return;

    }


    const payment =
        confirm(
            "Ticket Price: ₹" +
            event.price +
            "\n\nProceed with simulated payment?"
        );


    if (!payment) return;


    const ticketId =
        "TKT-" +
        Date.now();


    registrations.push({

        id: generateId("reg"),

        eventId: event.id,

        eventTitle: event.title,

        email: user.email,

        name: user.name,

        amount: event.price,

        ticketId: ticketId,

        date:
            new Date().toLocaleDateString(),

        reminder: false

    });


    saveRegistrations(registrations);


    alert(
        "Registration successful!\n\n" +
        "Your Ticket ID: " +
        ticketId
    );


    window.location.href =
        "my-registrations.html";

}


// =====================================================
// MY REGISTRATIONS
// =====================================================

function loadMyRegistrations() {

    const container =
        document.getElementById(
            "myRegistrations"
        );

    if (!container) return;


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "user-login.html";

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


    container.innerHTML = "";


    if (registrations.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <p>
                    You have no registrations yet.
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


    registrations.forEach(
        function (registration) {

            container.innerHTML += `

                <div class="event-card">

                    <h2>
                        ${registration.eventTitle}
                    </h2>

                    <p>
                        <strong>Ticket ID:</strong>
                        ${registration.ticketId}
                    </p>

                    <p>
                        <strong>Amount Paid:</strong>
                        ₹${registration.amount}
                    </p>

                    <p>
                        <strong>Registered On:</strong>
                        ${registration.date}
                    </p>

                    <p>
                        <strong>Reminder:</strong>
                        ${
                            registration.reminder
                            ? "Set"
                            : "Not Set"
                        }
                    </p>

                    <button
                        class="btn"
                        onclick="setReminder('${registration.id}')">

                        ${
                            registration.reminder
                            ? "Reminder Set"
                            : "Set Reminder"
                        }

                    </button>

                </div>

            `;

        }
    );

}


// =====================================================
// REMINDER
// =====================================================

function setReminder(registrationId) {

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


    if (!registration) return;


    registration.reminder = true;


    saveRegistrations(registrations);


    alert(
        "Reminder set successfully!"
    );


    loadMyRegistrations();

}


// =====================================================
// ADMIN LOGIN
// =====================================================

function setupAdminLogin() {

    const form =
        document.getElementById(
            "adminLoginForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const email =
                document.getElementById(
                    "adminEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "adminPassword"
                ).value.trim();


            const msg =
                document.getElementById(
                    "adminMsg"
                );


            if (
                email === ADMIN_EMAIL &&
                password === ADMIN_PASSWORD
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                window.location.href =
                    "admin-dashboard.html";

            }

            else {

                msg.textContent =
                    "Invalid admin email or password.";

                msg.style.color = "red";

            }

        }
    );

}


// =====================================================
// ADMIN LOGOUT
// =====================================================

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.href =
        "admin-login.html";

}


// =====================================================
// ADMIN DASHBOARD
// =====================================================

function loadAdminDashboard() {

    const adminEvents =
        document.getElementById(
            "adminEvents"
        );


    if (!adminEvents) return;


    if (
        localStorage.getItem(
            "adminLoggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "admin-login.html";

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
            function (total, registration) {

                return total +
                    Number(
                        registration.amount || 0
                    );

            },
            0
        );


    adminEvents.textContent =
        events.length;


    const adminUsers =
        document.getElementById(
            "adminUsers"
        );


    const adminRegistrations =
        document.getElementById(
            "adminRegistrations"
        );


    const adminRevenue =
        document.getElementById(
            "adminRevenue"
        );


    if (adminUsers)
        adminUsers.textContent =
            users.length;


    if (adminRegistrations)
        adminRegistrations.textContent =
            registrations.length;


    if (adminRevenue)
        adminRevenue.textContent =
            "₹" + revenue;


    loadAdminEventTable();

}


// =====================================================
// ADMIN EVENT TABLE
// =====================================================

function loadAdminEventTable() {

    const table =
        document.getElementById(
            "adminEventTable"
        );


    if (!table) return;


    const events =
        getEvents();

    const registrations =
        getRegistrations();


    table.innerHTML = "";


    events.forEach(
        function (event) {

            const eventRegistrations =
                registrations.filter(
                    function (registration) {

                        return (
                            registration.eventId ===
                            event.id
                        );

                    }
                );


            const revenue =
                eventRegistrations.reduce(
                    function (
                        total,
                        registration
                    ) {

                        return total +
                            Number(
                                registration.amount ||
                                0
                            );

                    },
                    0
                );


            table.innerHTML += `

                <tr>

                    <td>
                        ${event.title}
                    </td>

                    <td>
                        ${event.date}
                    </td>

                    <td>
                        ${event.ownerName}
                    </td>

                    <td>
                        ${eventRegistrations.length}
                        /
                        ${event.capacity}
                    </td>

                    <td>
                        ₹${revenue}
                    </td>

                    <td>

                        <button
                            class="btn"
                            onclick="adminDeleteEvent('${event.id}')">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


// =====================================================
// ADMIN DELETE EVENT
// =====================================================

function adminDeleteEvent(eventId) {

    if (
        !confirm(
            "Are you sure you want to delete this event?"
        )
    ) {

        return;

    }


    let events =
        getEvents();


    events =
        events.filter(
            function (event) {

                return event.id !== eventId;

            }
        );


    saveEvents(events);


    let registrations =
        getRegistrations();


    registrations =
        registrations.filter(
            function (registration) {

                return (
                    registration.eventId !==
                    eventId
                );

            }
        );


    saveRegistrations(registrations);


    alert(
        "Event deleted successfully!"
    );


    loadAdminDashboard();

}


// =====================================================
// PAGE INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeData();

        setupUserLogin();

        setupSignup();

        setupCreateEvent();

        setupEventSearch();

        setupAdminLogin();


        if (
            document.getElementById(
                "welcomeUser"
            )
        ) {

            loadDashboard();

        }


        if (
            document.getElementById(
                "organizerEvents"
            )
        ) {

            loadMyEvents();

        }


        if (
            document.getElementById(
                "allEvents"
            )
        ) {

            loadEvents();

        }


        if (
            document.getElementById(
                "myRegistrations"
            )
        ) {

            loadMyRegistrations();

        }


        if (
            document.getElementById(
                "adminEvents"
            )
        ) {

            loadAdminDashboard();

        }

    }
);