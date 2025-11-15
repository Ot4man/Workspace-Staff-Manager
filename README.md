# 🌐 WorkSphere -- Smart Employee & Zone Management System

WorkSphere is an intuitive interactive web application that allows
administrators to **manage employees**, **assign them to workspace
zones**, and **enforce role-based restrictions** inside a floor plan. It
is lightweight, easy to customize, and built with clean modular
JavaScript.

------------------------------------------------------------------------

## ✨ Features

### 👥 Employee Management

-   Add new employees with name, role, and photo\
-   Edit or delete employees\
-   Preview employee details in a modal

### 🏢 Zone Management

-   Drag & drop employees into office zones\
-   Apply role-based restrictions (e.g. certain roles allowed only in
    specific zones)\
-   Visual feedback when dropping is allowed/not allowed

### 🎨 UI & Experience

-   Smooth modal animations\
-   Clean and responsive design\
-   Real-time zone updates\
-   Organized code structure for maintenance and scalability

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **HTML5** -- Structure\
-   **CSS3** -- Styling\
-   **Vanilla JavaScript (ES6 Modules)** -- Logic\
-   **JSON** -- Optional role configuration

------------------------------------------------------------------------

## 📂 Project Structure

    WorkSphere/
    │
    ├── index.html                # Main application page
    ├── README.md                 # Documentation
    │
    ├── assets/
    │   ├── css/
    │   │   └── styles.css        # Global styles
    │   │
    │   └── js/
    │       ├── app.js            # App initialization & global logic
    │       ├── employees.js      # Employee CRUD operations
    │       ├── zones.js          # Floor plan zone handling
    │       └── modal.js          # Modal window logic
    │
    └── data/
        └── roles.json            # Optional role permissions per zone

------------------------------------------------------------------------

## ⚙️ Installation

1.  **Clone the repository**

``` bash
git clone https://github.com/Ot4man/Workspace-Staff-Manager.git
```

2.  **Open the project**

``` bash
cd worksphere
```

3.  **Run the app**\
    Open **index.html** in your browser. No server required.

------------------------------------------------------------------------

## 🚀 Usage Guide

### ➕ Add an employee

-   Click the **Add Employee** button\
-   Fill in the name, role, and photo (optional)\
-   Save

### 🔁 Drag & Drop

-   Drag an employee into a zone\
-   Allowed → ✔️\
-   Not allowed → ❌ error message

### 📝 Edit or Delete

-   Click the employee card\
-   Choose **Edit**, **Preview**, or **Delete**

------------------------------------------------------------------------

## 📄 Future Improvements

-   Save data to LocalStorage or backend\
-   Add multi-floor office support\
-   Import/export employee lists\
-   Add analytics dashboard\
-   Real-time collaboration features\
-   Better drag & drop animations

------------------------------------------------------------------------

## 👨‍💻 Author

**Otman Mellouki**\
A passionate developer building practical and clean web applications.

------------------------------------------------------------------------

## 📜 License

Released under the **MIT License**.
