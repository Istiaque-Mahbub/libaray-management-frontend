# 📚 Minimal Library Management System – Frontend

A clean, functional client-side web application to manage books and borrow records in a minimal library system. Built using **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**. This system interacts with a RESTful API and handles CRUD operations for books and borrow functionality, all without user authentication.

---

## 🚀 Live Demo

🔗 **Frontend Live URL:** [https://library-management-frontend-six.vercel.app/borrow-summary](https://library-management-frontend-six.vercel.app/borrow-summary)  
🔗 **Backend API URL:** [https://library-management-mu-six.vercel.app/](https://library-management-mu-six.vercel.app/)

---

## 🧩 Features

### ✅ Public Pages (No Login Required)

- Accessible to all users without authentication
- Clear navigation for all pages

### 📚 Book Management

- View all books in a  table
- Columns: `Title`, `Author`, `Genre`, `ISBN`, `Copies`, `Availability`, and `Actions`
- Actions:
  - ✏️ Edit Book
  - 🗑️ Delete Book (with confirmation)
  - ➕ Add Book
  - 📦 Borrow Book (with quantity & due date form)

### 🔄 Borrow Book Logic

- Borrow form validates quantity based on available copies
- Updates book availability if copies reach 

### 📊 Borrow Summary

- Aggregated view of all borrowed books
- Fields: `Title`, `ISBN`, `Total Quantity Borrowed`

---

## 📁 Pages & Routes

| Route | Description |
|-------|-------------|
| `/books` | Book list with actions (view/edit/delete/borrow) |
| `/create-book` | Form to add a new book |
| `/books/:id` | View full details of a book |
| `/edit-book/:id` | Edit book information |
| `/borrow/:bookId` | Borrow form for a book |
| `/borrow-summary` | View borrow aggregation summary |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| API Integration |  fetchBaseQuery via RTK Query |
| Routing | React Router v7 |
| Icons | Lucide / HeroIcons / Custom SVG |
| Forms | React Hook Form (shadcn ui) |

---



