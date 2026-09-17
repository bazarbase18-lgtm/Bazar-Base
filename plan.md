# bazarbase.com — Project Plan

## 1. Overview

A multi-category e-commerce **catalog** website (no cart/checkout) for the brand
**Rashmi Cosmetic and Srishti Ayurved India**, operating under the domain **bazarbase.com**.
Customers browse products and enquire/order via **WhatsApp**. A single admin manages
products and categories through a protected admin panel.

Reference UI: ourlittlejoys.com/shop/all (grid layout, filter chips, category sidebar)

## 2. Tech Stack

| Layer            | Choice                                   |
|-------------------|-------------------------------------------|
| Frontend          | React + Vite + Tailwind CSS               |
| Data store         | Firebase Firestore                        |
| Image storage      | ImageKit.io (free tier)                   |
| Admin auth         | Simple credential check against `.env`    |
| Hosting            | Firebase Hosting / Vercel / Netlify (TBD) |

No custom backend server (Node/Express) is being built. Firestore + ImageKit act as
managed (serverless) services, called directly from the React app via their SDKs/APIs.

## 3. Brand

**Colors**
- `#0d49ab` — Primary (blue)
- `#5c7983` — Secondary (slate)
- `#8fc92c` — Accent (green)
- `#f26606` — Accent (orange)

## 4. Site Map / Pages

| Route              | Purpose                                                        | Access   |
|---------------------|------------------------------------------------------------------|----------|
| `/`                 | Home — hero, featured categories, featured products             | Public   |
| `/shop`             | Full product grid with category/age/type filter chips           | Public   |
| `/shop/:category`   | Pre-filtered shop view for a specific category                  | Public   |
| `/product/:id`      | Product details — images, description, price, "Order on WhatsApp" button | Public   |
| `/about`            | About the brand                                                  | Public   |
| `/contact`          | Contact info + basic enquiry form                                | Public   |
| `/lab-test-booking`   | Healthians lab test booking form (see section 8)                 | Public   |
| `/admin/login`      | Admin login (id/password)                                        | Public   |
| `/admin`            | Admin dashboard — manage categories & products                   | Protected|

No cart, wishlist, checkout, or "buy now" pages — confirmed out of scope.

## 5. Data Model (Firestore)

**`categories`** collection
```
{
  id: string (auto),
  name: string,
  slug: string,
  imageUrl: string (ImageKit URL),
  order: number
}
```

**`products`** collection
```
{
  id: string (auto),
  name: string,
  categoryId: string (ref -> categories),
  price: number,
  mrp: number,            // for showing strikethrough discount, optional
  description: string,
  images: string[]         // ImageKit URLs
  variant/tags: string[]    // e.g. "Chocolate", "2-6 Yr" — optional, for filter chips
  inStock: boolean,
  createdAt: timestamp
}
```

**`labBookings`** collection (optional log, in addition to WhatsApp forward)
```
{
  id: string (auto),
  name: string,
  age: number,
  doctorName: string,
  address: string,
  mobile: string,
  email: string,
  prescriptionUrl: string (ImageKit URL, optional),
  createdAt: timestamp
}
```

## 6. Feature Breakdown

### Home
- Hero banner (brand colors)
- Featured categories (pulled from `categories`, top N by `order`)
- Featured/new products strip

### Shop
- Sidebar / chip-based category filter (matches ourlittlejoys.com pattern)
- Product grid, each card: image, name, price (+MRP strikethrough if set), "ADD"/"View" → goes to product details
- Client-side search (optional, simple name match)

### Product Details
- Image gallery
- Name, price, description, tags
- **"Order on WhatsApp"** button → opens `wa.me/<number>?text=<prefilled message with product name>`

### About / Contact
- Static content pages, contact page has WhatsApp + address + basic enquiry form (no backend needed — mailto or WhatsApp link)

### Admin Panel
- `/admin/login`: id + password form, checked against `VITE_ADMIN_ID` / `VITE_ADMIN_PASSWORD` from `.env`; on success, set a session flag (e.g. sessionStorage token) to guard `/admin` route
- `/admin`:
  - **Categories tab**: add/edit/delete category (name, slug, image upload via ImageKit)
  - **Products tab**: add/edit/delete product (name, category dropdown, price, MRP, description, tags, multi-image upload via ImageKit), list with edit/delete actions
- All writes go directly to Firestore from the client using the Firebase SDK

## 7. Image Handling (ImageKit.io)

- Admin uploads image in the panel → uploaded directly to ImageKit via their upload API
- Returned ImageKit URL is what gets saved into the Firestore `products`/`categories` document
- On the frontend, ImageKit URL query params used for on-the-fly resizing/optimization (e.g. `?tr=w-400,h-400`) to keep bandwidth usage low within the free tier

## 8. Lab Test Booking (Healthians)

- Form fields: Name, Age, Doctor Name, Address, Mobile, Email
- Optional: upload doctor's prescription photo (via ImageKit)
- On submit:
  - Save entry to Firestore `labBookings` (optional, for record-keeping)
  - Open WhatsApp (`wa.me/8299138080`) with a pre-filled message containing all the submitted details, so it lands directly in the client's WhatsApp as text

## 9. Environment Variables (`.env`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_APP_ID=

VITE_IMAGEKIT_PUBLIC_KEY=
VITE_IMAGEKIT_URL_ENDPOINT=
VITE_IMAGEKIT_AUTH_ENDPOINT=   // small signed-auth step for client uploads

VITE_ADMIN_ID=
VITE_ADMIN_PASSWORD=

VITE_WHATSAPP_NUMBER=8299138080
```

## 10. Folder Structure (proposed)

```
src/
  components/
    ProductCard.jsx
    CategoryChip.jsx
    Navbar.jsx
    Footer.jsx
  pages/
    Home.jsx
    Shop.jsx
    ProductDetails.jsx
    About.jsx
    Contact.jsx
    LabTestBooking.jsx
    admin/
      AdminLogin.jsx
      AdminDashboard.jsx
      AdminCategories.jsx
      AdminProducts.jsx
  lib/
    firebase.js       // firebase init
    imagekit.js        // imagekit upload helper
    whatsapp.js         // wa.me link builder
  App.jsx
  main.jsx
```

## 11. Build Phases

1. **Setup** — Vite + Tailwind scaffold, Firebase project + Firestore, ImageKit account, brand colors in Tailwind config
2. **Static pages** — Home, About, Contact (no data yet)
3. **Firestore wiring** — categories & products read from Firestore, Shop + Product Details pages live
4. **Admin panel** — login gate, category CRUD, product CRUD (incl. ImageKit upload)
5. **WhatsApp flows** — product order redirect, lab test booking form + redirect
6. **Polish & deploy** — responsive check, image optimization params, hosting deploy

## 12. Confirmed Out of Scope

- Cart, wishlist, "buy now", checkout/payment flow
- Multi-admin / role-based auth
- Custom backend server (Node/Express, etc.)

---
*Open questions before implementation starts (Phase 1):*
- Hosting preference — Firebase Hosting, Vercel, or Netlify?
- WhatsApp number to use for product order redirects — same as lab booking (8299138080) or different?