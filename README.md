# LinkBasket

LinkBasket is a modern web app to save, organize, and access your links in a real-time, responsive interface. It supports **Google authentication**, **categories**, **add/edit/delete links**, and dynamic pages for each link.

---

## Features

* Google OAuth login
* Add, edit, delete links
* Categorize links (Tech, AI, Design, Learning)
* Responsive UI for desktop & mobile
* Dynamic link pages
* Real-time loaders and toasts
* Confirmation modals for delete & logout
* Mobile-friendly navbar with search

---

## Tech Stack

* **Frontend:** Next.js, Tailwind CSS, React, Framer Motion, Lucide Icons
* **Backend:** Node.js, Express, MongoDB
* **Authentication:** NextAuth.js (Google Provider)
* **Notifications:** react-hot-toast
* **Deployment:** Vercel (frontend), Render (backend)

---

## Project Structure

```
frontend/
 ├─ app/
 │   ├─ page.tsx
 │   ├─ globals.css
 │   └─ components/
 │        ├─ Navbar.tsx
 │        ├─ FilterBar.tsx
 │        ├─ LinkCard.tsx
 │        ├─ AddLinkModal.tsx
 │        ├─ ConfirmModal.tsx
 │        └─ LogoutModal.tsx
 ├─ lib/
 │    └─ axios.ts
 ├─ providers.tsx
 └─ package.json

backend/
 ├─ routes/
 │    └─ links.js
 ├─ models/
 │    └─ Link.js
 ├─ app.js
 └─ package.json
```

---

## Getting Started

### Prerequisites

* Node.js 18+
* MongoDB instance (Atlas or local)
* Google OAuth credentials

---

### Frontend Setup (Next.js)

1. Clone repo:

```bash
git clone <your-repo-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=<YOUR_RENDER_BACKEND_URL>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
NEXTAUTH_SECRET=<YOUR_RANDOM_SECRET>
```

4. Run locally:

```bash
npm run dev
```

5. Deploy to **Vercel**:

* Connect your GitHub repo
* Vercel will detect Next.js automatically
* Add the environment variables above in Vercel settings

---

### Backend Setup (Express + MongoDB)

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env`:

```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_URI>
```

4. Run locally:

```bash
npm run dev
```

5. Deploy to **Render**:

* Connect your GitHub repo
* Choose Node.js service
* Set environment variables
* Set build command: `npm install`
* Start command: `node app.js` or `npm start`

---

## API Endpoints

| Method | Endpoint     | Description                                    |
| ------ | ------------ | ---------------------------------------------- |
| GET    | `/links`     | Get all links (with search & category filters) |
| POST   | `/links`     | Add new link                                   |
| GET    | `/links/:id` | Get a single link                              |
| PUT    | `/links/:id` | Update a link                                  |
| DELETE | `/links/:id` | Delete a link                                  |

---

## Environment Variables

**Frontend**

```
NEXT_PUBLIC_API_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET
```

**Backend**

```
PORT
MONGO_URI
```

---

## Scripts

**Frontend**

```bash
npm run dev      # Start local dev server
npm run build    # Build production
npm run start    # Run production build
```

**Server**

```bash
npm run dev      # Start backend server with nodemon
npm start        # Run backend server
```

---

## License

MIT License
