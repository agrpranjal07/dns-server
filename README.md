# Basic DNS Server Boilerplate Code

## Overview

This project provides a basic implementation of a DNS server using Node.js. The server handles DNS queries over UDP on port 3000 and responds with predefined DNS records.

## Prerequisites

- Node.js (v18.x or later)
- `dig` command-line tool (for testing)

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>```
2. **Install Dependecies**
   ```bash
   npm install```
3. **Running the Server**
   ```bash
   npm install```
4. **Testing the Server**
   
   1. For "example.com"
      ```bash
       dig @localhost -p 3000 example.com```
   3. For "ans.example.com"
      ```bash
       dig @localhost -p 3000 ans.example.com```

