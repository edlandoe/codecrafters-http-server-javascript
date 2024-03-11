# Simple Node.js HTTP Server

A basic HTTP server written in Node.js using the `net` and `fs` modules.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Installation](#installation)

## Introduction

This project is a simple HTTP server implemented in Node.js that handles basic GET and POST requests. It serves as a starting point for building more complex web applications.

## Features

- Handles basic `HTTP` `GET` and `POST` requests.
- Supports serving static files.

## Usage

To use this server, follow the installation steps below. Once the server is running, you can send HTTP requests to test its functionality.

## Endpoints

- **GET /:** Responds with a basic "200 OK" message.

- **GET /echo\<content>:** Responds with the provided content.

- **GET /user-agent:** Responds with the User-Agent header from the request.

- **GET /files\<filename>:** Responds with the content of the specified file.

- **POST /files\<filename>:** Writes the content of the POST request body to the specified file.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. Install Dependencies

   ```bash
   npm install
   
3. Run The Server

   ```bash
   node server.js /path/to/directory
Replace `/path/to/directory` with the path where you want to store uploaded files.
