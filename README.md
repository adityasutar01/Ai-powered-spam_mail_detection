AI-Powered Spam Mail Detection

A web-based application that classifies email messages as spam or legitimate (ham) using machine learning. The system provides a fast, interactive interface and is deployed on Render for public access.

Project Overview

This project uses machine learning techniques to analyze the content of emails and determine whether they are spam. It includes a user-friendly web interface that delivers near-instant predictions. The application is built using modern web technologies and deployed on Render for scalability and ease of access.

Key Features

Fast text-based email classification with instant predictions.

Machine learning–based model using algorithms such as Naive Bayes or Logistic Regression.

Interactive web interface for entering email text and receiving results.

Production deployment on Render for scalable and reliable public access.

Tech Stack
Layer	Technologies
Frontend	React, Vite
Build Tool	Vite
Backend (optional)	Node.js API
Machine Learning	Scikit-learn / NLP Model
Deployment	Render
Installation & Local Setup
git clone https://github.com/adityasutar01/Ai-powered-spam_mail_detection.git
cd Ai-powered-spam_mail_detection
npm install
npm run build
npm run preview        # Runs at http://localhost:4173

Deployment on Render
Static Site Hosting (No Backend)

Build command:

npm run build


Publish directory:

dist

Web Service Mode (With Optional Node Backend)

Add to package.json:

"start": "vite preview --port 8080"


Render start command:

npm run start

How It Works

User enters an email message into the interface.

The message is processed (client-side or via backend).

Features such as TF-IDF vectors or embeddings are extracted.

The trained model predicts whether the email is spam or ham.

The result is displayed in the interface.

Model and Data

Algorithms: Naive Bayes, Logistic Regression, or similar classifiers.

Dataset: Publicly available labeled email datasets.

Preprocessing: Tokenization, stop-word removal, vectorization, TF-IDF or embeddings.

Results and Performance

Models of this type typically achieve up to 98% accuracy on standard evaluation datasets, depending on preprocessing quality and dataset size.

Usage and Contribution

You may clone, modify, and extend this project.

To retrain the model:

Prepare a labeled email dataset.

Retrain your classifier.

Replace the existing model with the updated version.

Contributions such as improvements, bug fixes, or enhancements are welcome through pull requests.

License

This project is open-source under the MIT License.

Live Demo

https://ai-powered-spam-mail-detection-c97l.onrender.com/

Acknowledgments & References

Research articles and resources on spam detection and machine learning.

Background literature on Naive Bayes spam filtering.
