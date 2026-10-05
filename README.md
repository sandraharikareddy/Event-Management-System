# 🎟️ Event Management System

A web-based Event Management System developed using HTML, CSS, and JavaScript. The system allows organizers to create and manage events, attendees to browse and register for events, and administrators to monitor the overall system.

## 📌 Project Overview

The Event Management System is designed to simplify the complete process of event management.

The system has three main types of users:

- 👨‍💼 Organizer – Creates and manages events
- 👤 Attendee – Browses and registers for events
- 🔐 Administrator – Monitors and manages the system

### Main Workflow

**Create Event → Manage Event → Register → Payment → Ticket Generation → Tracking**

---

## ✨ Features

### 👨‍💼 Organizer

- Create new events
- Add event title, date, time and venue
- Set ticket price and maximum capacity
- Add event description
- Edit event details
- Delete events
- View event registrations
- Track tickets sold
- Monitor event revenue
- Set event reminders

### 👤 Attendee

- Create an account
- Login
- Browse available events
- Search for events
- View event details
- Register for events
- Make simulated payments
- Receive a unique ticket ID
- View registered events
- Set event reminders

### 🔐 Administrator

- Admin login
- View total users
- View total events
- View total registrations
- View total revenue
- Monitor event information
- Manage events

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage

### Technology Usage

**HTML5:** Used to create the structure of the web pages.

**CSS3:** Used for styling, layout and responsive design.

**JavaScript:** Used for login, signup, event creation, event management, registration, ticket generation, payment simulation, revenue calculation and dashboard operations.

**LocalStorage:** Used to store users, events, registrations and login/session information.

---

## 📂 Project Structure

```text
Event-Management-System/
│
├── index.html
├── user-login.html
├── signup.html
├── user-dashboard.html
├── events.html
├── create-event.html
├── my-events.html
├── my-registrations.html
├── admin-login.html
├── admin-dashboard.html
├── style.css
├── scripts.js
└── README.md

## 🔄 System Workflow


                    EVENT MANAGEMENT SYSTEM
                              │
             ┌────────────────┼────────────────┐
             ↓                ↓                ↓
         ORGANIZER         ATTENDEE           ADMIN
             │                │                │
        Create Event      Browse Events      Monitor
             │                │                │
        Manage Event       Register           Users
             │                │                │
       Track Tickets      Payment            Events
             │                │                │
          Revenue         Ticket ID          Revenue
             │                │                │
             └────────────────┼────────────────┘
                              ↓
                       Event Management


## 🎫 Registration and Ticket Generation

When an attendee registers for an event:

1. The system checks the event capacity.
2. Duplicate registration is checked.
3. The ticket price is displayed.
4. Simulated payment is completed.
5. A unique ticket ID is generated.
6. Registration details are stored.
7. The registration appears in My Registrations.
---

## 💾 Data Management

The current project uses Browser LocalStorage for data storage.

The system stores:

* User information
* User roles
* Event information
* Registration details
* Ticket information
* Login/session information

No external database is required for the current version.

---

## 💳 Payment

The project includes a simulated payment system for demonstration purposes.

**No real money is transferred or processed.**

---

## 🔔 Event Reminders

Users can set reminders for events so that they can keep track of upcoming events.

---

## 📊 Dashboards

### Organizer Dashboard

The organizer can view information related to their events, including:

* Created events
* Registrations
* Tickets sold
* Revenue

### Admin Dashboard

The administrator can view:

* Total users
* Total events
* Total registrations
* Total revenue
* Event information

---

## 🚀 How to Run the Project

1. Download or clone the project.
2. Keep all HTML, CSS and JavaScript files in the same folder.
3. Open `index.html` in a web browser.
4. Create an account using the Sign Up page.
5. Login using the registered account.
6. Use the features according to the user role.

---

## 🎯 Project Objectives

* Provide a simple and user-friendly event management platform.
* Allow organizers to create and manage events.
* Allow attendees to discover and register for events.
* Generate unique ticket IDs.
* Track registrations and ticket sales.
* Monitor event revenue.
* Provide separate functionality for organizers, attendees and administrators.
* Reduce manual work involved in event management.

---

## ⭐ Advantages

* Simple and user-friendly interface
* Easy event creation and management
* Easy event search and registration
* Automatic ticket ID generation
* Capacity tracking
* Revenue tracking
* Role-based functionality
* Centralized event information
* Reduces manual event management work

---

## 🔮 Future Enhancements

The project can be further improved by adding:

* Real payment gateway integration
* MySQL or MongoDB database
* Secure backend authentication
* Email notifications
* SMS notifications
* QR-code ticket verification
* Online ticket downloading
* Cloud deployment
* Advanced event analytics
* Mobile application
* Real-time notifications

---

## 📌 Conclusion

The Event Management System provides a simple and user-friendly platform for creating, managing and participating in events.

The system connects:

**Organizer → Event → Attendee → Registration → Ticket → Tracking**

The project demonstrates the practical use of HTML, CSS, JavaScript and LocalStorage to develop a real-world web application.

It provides separate functionalities for **Organizers, Attendees and Administrators**, making the event management process more organized and efficient.

---

## 👩‍💻 Project Information

**Project Name:** Event Management System

**Type:** Web Development Project

**Technologies:** HTML | CSS | JavaScript | LocalStorage


