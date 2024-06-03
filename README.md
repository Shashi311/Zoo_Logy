# Barcode Scanner
This project allows users to scan a barcode using their device's camera and fetch detailed information about the corresponding animal from a backend server. The scanned barcode is sent to the server via a POST request, and the server responds with the animal's data stored in a MongoDB database. The retrieved data is then displayed in a styled card format in a new browser tab.

# Tech Stack
# Frontend:
HTML5
CSS3
JavaScript

# Backend:
Node.js
Express.js
MongoDB

# External Libraries:
ZXing: A JavaScript library for decoding barcodes from video streams or images.
Font Awesome: For icons used in the user interface.


# Features
Simple Interface: Clean and intuitive user interface for easy navigation.
Barcode Scanning: Allows users to scan barcodes using their device's camera.
Real-time Detection: Detects barcodes in real-time and displays the details instantly.
Table Display: Presents the scanned barcode details in a structured table format.
Single Scan: Ensures each barcode is listed only once in the table, even if scanned multiple times.

# Folder Structer

barcode-scanner/
│
├── index.html           # Main HTML file for the frontend
├── index.css            # CSS file for styling the frontend
├── index.js             # JavaScript file for frontend logic
├── server.js            # Express server file
├── package.json         # Node.js dependencies and scripts
└── README.md            # Project documentation



