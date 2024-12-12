# Hostel Grievance Management System

A mobile application to streamline lodging and addressing student complaints within hostels, as well as managing gate pass requests efficiently.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Database Schema](#database-schema)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

The Hostel Grievance Management System simplifies communication between hostel residents and supervisors. Students can submit complaints or request gate passes directly from the app. Complaints are categorized and sorted by date to ensure timely resolutions, and QR codes are generated for secure late-night gate pass requests.

---

## Features

- **Complaint Management**:

  - Submit complaints via a user-friendly interface.
  - Categorized complaints sorted by date.
  - View complaint status updates from the supervisor.

- **Gate Pass Requests**:

  - Request late-night gate passes.
  - QR code generation for secure entry.

- **Admin Dashboard**:
  - Hostel supervisors can view and resolve complaints efficiently.

---

## Technologies Used

- **Frontend**: React Native (Expo Go for development).
- **Backend**: Django REST Framework.
- **Database**: MySQL.
- **Other Tools**:
  - QR Code generation libraries.
  - MySQL Workbench for database management.

---

## Installation

### Prerequisites

- Node.js and npm installed.
- Python (version 3.8 or above).
- MySQL database.
- Expo CLI installed globally.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/hostel-grievance-app.git
   cd hostel-grievance-app
   ```

2. **Frontend Setup**:

   ```bash
   cd frontend
   npm install
   expo start
   ```

3. **Backend Setup**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

4. **Database Configuration**:
   - Update database credentials in the `settings.py` file under the backend directory.
   - Ensure the MySQL database is set up with the appropriate timezone.

---

## Usage

- Launch the Expo app and scan the QR code to run the application on your mobile device.
- Students can log in to:
  - Submit complaints.
  - Request gate passes.
- Supervisors can log in to:
  - View and resolve complaints.

---

## Database Schema

### Tables

- **Users**:
  - Stores user details (students, supervisors).
- **Complaints**:
  - Fields: ID, category, description, status, timestamp, user ID (foreign key).
- **Gate Passes**:
  - Fields: ID, user ID (foreign key), QR code, timestamp, status.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
