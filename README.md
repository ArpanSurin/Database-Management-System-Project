# ONLINE SHOES MANAGEMENT SYSTEM

## Project Overview

This project was developed as part of the Database Management System (DBMS) course during our 4th semester. It serves as a practical application of the concepts and techniques we learned in the course, showcasing our ability to design and implement a functional database system.

The primary objective of this project was to apply the theoretical knowledge acquired in the DBMS course to a real-world application, demonstrating proficiency in database design, implementation, and management.

## Project Description

An online shoes management system that optimizes inventory management, enhances customer experience and drives business growth for retailers.

It Ensures seamless user experience and optimal operational efficiency for both customers and administrators.

It efficiently handles :  
+ Shoes orders.
+ Customer orders.
+ Shoe sales.
+ Suppliers orders.

## Tech Stack

**Client :** React, TailwindCSS

**Server :** Express, Node 

**Database :** MySQL

## Database Schema

### 1. Shoes table
| Field    |  Type     | Null | Key | Default | Extra |
| :--------| :---------|:-----|:----|:--------|:------|
| **Shoe_id**  |  int  | NO   | PRI | NULL    |       |
| **Brand**  |  varchar(50)  | NO   |    | NULL    |       |
| **Size**  |  varchar(10)  | NO   |     | NULL    |       |
| **Color**  |  varchar(20)  | NO   |    | NULL    |       |
| **Price**  |  decimal(10, 2) | NO   |      | NULL    |       |
| **Quantity**  |  int  | NO   |     | NULL    |       |

### 2. Customers table
| Field    |  Type     | Null | Key | Default | Extra |
| :--------| :---------|:-----|:----|:--------|:------|
| **Customer_id**  |  int  | NO   | PRI | NULL    |       |
| **Customer_name**  |  varchar(100)  | NO   |   | NULL    |       |
| **Email**  |  varchar(100)  | NO   | UNI | NULL    |       |
| **Phone_number**  |  bigint  | NO   | UNI | NULL    |       |

### 3. Sales table
| Field    |  Type     | Null | Key | Default | Extra |
| :--------| :---------|:-----|:----|:--------|:------|
| **Sale_id**  |  int  | NO   | PRI | NULL    |   auto_increment    |
| **Purchase_id**  |  int  | YES   |  MUL | NULL    |       |
| **Sale_date**  |  date  | YES  |   | NULL    |       |
| **Sale_amount**  |  decimal(10, 2)  | YES  |   | NULL    |       |

### 4. Suppliers table
| Field    |  Type     | Null | Key | Default | Extra |
| :--------| :---------|:-----|:----|:--------|:------|
| **Supplier_id**  |  int  | NO   | PRI | NULL    |      |
| **Supplier_name**  |  varchar(100)  | YES   |   | NULL    |       |
| **Email**  |  varchar(100)  | YES  |   | NULL    |       |
| **Phone_number**  |  bigint  | YES  |   | NULL    |       |

### 5. Purchases table
| Field    |  Type     | Null | Key | Default | Extra |
| :--------| :---------|:-----|:----|:--------|:------|
| **Purchase_id**  |  int  | NO   |  PRI | NULL    |       |
| **Customer_id**  |  int  | YES   |      | NULL    |       |
| **Shoe_id**  |  int  | YES   |      | NULL    |       |
| **Quantity**  |  int  | YES  |   | NULL    |       |
| **Purchase_date**  |  date  | YES  |   | NULL    |       |

## Installation

**1. Install Nodemon** 
```bash
npm install -g nodemon
```
**2. Install Express.js** 
```bash
npm install express
```
**3. Install TailwindCSS** 
```bash
npm install -D tailwindcss
```

## Deployment

To deploy this project in Visual studio code, you need to :

1. Clone the repository
```bash
git clone https://github.com/ArpanSurin/Online-Shoes-Management-System.git
```
2. Navigate to project directory
```bash
cd Online-Shoes-Management-System
```
3. Start the Server
```bash
cd Server
npm start
```
4. Start the website 
```bash
npm run dev
```

## Front Page
![Front-page Screenshot](https://drive.google.com/uc?id=1QunIcYTQJr6Ln2T48fnIoHheVNFpWeVf)