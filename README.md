# bazarbase.com

Multi-category e-commerce catalog site for **Rashmi Cosmetic and Srishti Ayurved India**.

Customers browse products and pay directly via **Razorpay** (Buy Now → Checkout).

Lab Test Booking still works via WhatsApp. Admin manages categories, products, and orders through a protected panel.

**Stack:** React + Vite + Tailwind CSS · Firebase Firestore (data) · Cloudinary (images) · Razorpay (payments) · Vercel Serverless Functions (`create-order`, `verify-payment`)

---

## Full Project Structure

```text
bazarbase/
├── api/
│   ├── _firebaseAdmin.js
│   ├── create-order.js
│   ├── verify-payment.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── BuyNowModal.jsx
│   │   ├── CategoryChip.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── StickyWhatsApp.jsx
│   ├── lib/
│   │   ├── auth.js
│   │   ├── cloudinary.js
│   │   ├── firebase.js
│   │   ├── razorpay.js
│   │   └── whatsapp.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── AdminProducts.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── LabTestBooking.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── ReturnsRefunds.jsx
│   │   ├── Shop.jsx
│   │   └── Terms.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── firestore.rules
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

`api/` sits at the project root, as a **sibling of `src/`** — it is a separate Node.js project for Vercel Serverless Functions and is never bundled by Vite.

The old `functions/` folder for Firebase Cloud Functions / ImageKit auth is no longer used — images moved to Cloudinary's unsigned upload, which needs no server-side function at all.

---

## 1. Prerequisites

- Node.js 18+
- A Firebase project (Firestore enabled)
- A Cloudinary account (Free plan) with an unsigned upload preset
- A Razorpay account (test mode to start)
- Vercel account (for the two serverless functions + hosting)

---

## 2. Install frontend dependencies

```bash
cd bazarbase
npm install
```

If you ever see a `"Cannot find module 'tailwindcss'"` (or similar) error when running `npm run dev`, it means dependencies didn't install cleanly.

Fix with:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

And double-check `postcss.config.js` and `tailwind.config.js` live at the project root (`bazarbase/`), not in a parent folder or inside `src/`.

---

## 3. Environment variables

Copy `.env.example` → `.env` and fill in:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

VITE_RAZORPAY_KEY_ID=

VITE_ADMIN_ID=
VITE_ADMIN_PASSWORD=

VITE_WHATSAPP_NUMBER=918299138080
```

Get the Firebase values from:

**Firebase Console → Project Settings → General → Your apps**

Get the Cloudinary values from:

**Cloudinary Dashboard → Settings → Upload → Upload presets**

Get the Razorpay Key ID from:

**Razorpay Dashboard → Account & Settings → API Keys**

### Server-side only

Never put these in the frontend `.env` file.

Set them in:

**Vercel Dashboard → Project Settings → Environment Variables**

```env
RAZORPAY_KEY_SECRET=
FIREBASE_SERVICE_ACCOUNT_KEY=
```

`FIREBASE_SERVICE_ACCOUNT_KEY` should contain the full Firebase service account JSON as one string.

---

## 4. Set up Firestore

Go to:

**Firebase Console → Firestore Database → Create database**

Start in test mode for development, then lock down the database with rules before going live — see [Step 8](#8-firestore-security-rules-before-going-live).

Collections are created automatically the first time the admin panel adds a category/product, or a customer places an order:

- `categories`
- `products`
- `labBookings`
- `orders`

---

## 5. Cloudinary setup (images)

No server-side function is needed — uploads go straight from the browser using an **unsigned upload preset**.

### Setup

1. Open Cloudinary Dashboard.
2. Go to **Settings → Upload**.
3. Click **Add upload preset**.
4. Set **Signing Mode** to `Unsigned`.
5. Give the preset a name.
6. Add the values to `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

`src/lib/cloudinary.js` handles the upload call and `thumb()` URL helper used across:

- `ProductDetails.jsx`
- `ProductCard.jsx`
- Admin panel

---

## 6. Razorpay + Vercel Serverless Functions setup

Install the API dependencies:

```bash
cd api
npm install
```

### Setup steps

1. Razorpay Dashboard → API Keys → generate **Key ID + Key Secret**.
2. Start with **test mode**.
3. Firebase Console → Project Settings → Service Accounts → Generate new private key.
4. Copy the full Firebase service account JSON.
5. In **Vercel Dashboard → Project Settings → Environment Variables**, add:

```env
RAZORPAY_KEY_SECRET=
FIREBASE_SERVICE_ACCOUNT_KEY=
```

6. Deploy the project.

Vercel automatically picks up:

```text
api/create-order.js
api/verify-payment.js
```

They are callable at:

```text
/api/create-order
/api/verify-payment
```

These two functions are the **only** place the Razorpay Key Secret and Firebase Admin credentials ever touch the server.

They never reach the browser.

---

## 7. Run locally

From the project root:

```bash
cd bazarbase
npm run dev
```

Visit:

```text
/admin/login
```

Sign in with the:

```env
VITE_ADMIN_ID
VITE_ADMIN_PASSWORD
```

values from `.env`.

Add a few categories and products to see Shop/Home populate.

### Testing Razorpay locally

Serverless functions under `/api/*` only run properly on Vercel.

For local testing of the payment flow, use:

```bash
vercel dev
```

instead of plain:

```bash
npm run dev
```

---

## 8. Firestore security rules (before going live)

The public site needs to:

- Read `categories`
- Read `products`
- Create `labBookings`
- Create `orders` where status is `Pending`

The following should be blocked at the database level:

- Writes to `categories`
- Writes to `products`
- Updates to `orders`
- Deletes to `orders`

The `.env` admin check only gates the UI. It does **not** grant Firestore permissions.

Order status changes such as:

```text
Paid
Shipped
Delivered
```

should only happen through the Admin SDK / properly authenticated server-side operations.

### `firestore.rules`

```text
rules_version = '2';

service cloud.firestore {

  match /databases/{database}/documents {

    match /categories/{doc} {
      allow read: if true;
      allow write: if false;
      // Manage via Firebase Console or add server-side auth later
    }

    match /products/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /labBookings/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }

    match /orders/{orderId} {
      allow create: if request.resource.data.status == 'Pending';
      allow read, update, delete: if false;

      // Paid/Shipped/Delivered updates happen only via Admin SDK
      // in the serverless functions, which bypasses these rules entirely.
    }
  }
}
```

### Important admin-panel limitation

With:

```text
write: if false
```

on `categories` and `products`, admin writes from the browser will fail once these rules are deployed.

The current admin login is an `.env`-based check, not Firebase Authentication, so it does not grant:

```text
request.auth
```

To keep the admin panel working, choose one of these approaches:

### Option 1 — Firebase Console

Manage products and categories directly from Firebase Console.

### Option 2 — Firebase Authentication

Add Firebase Authentication with a single admin user and update the rules to allow authenticated writes, for example:

```text
allow write: if request.auth != null;
```

Before launch, the rules and admin login should be adjusted to match whichever option is chosen.

---

## 9. Build & deploy the frontend

Build the project:

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

Deploy the **whole project**, including the `api/` folder, to **Vercel**.

Vercel is used here because it can host the static frontend and run the serverless functions alongside it.

Firebase Hosting or Netlify would require a separate solution for:

```text
create-order
verify-payment
```

---

# Notes

- No cart or wishlist — confirmed out of scope.
- Checkout is single-product and matches the **Buy Now** design.
- Quantity selection is not currently available.
- Product ordering happens through **Razorpay Checkout**.
- Flow: **Buy Now → Checkout Form → Razorpay Payment**.
- Product WhatsApp ordering has been removed.
- `productWhatsappMessage` / WhatsApp ordering for products is no longer used.
- Every payment creates a tracked `orders` document.
- Order lifecycle:

```text
Pending → Paid → Shipped → Delivered
```

- Admin manually moves orders through `Shipped` / `Delivered` from **Admin → Orders**.
- Brevo transactional email was considered but skipped.
- Customers receive Razorpay's own automatic payment-receipt email instead.
- Razorpay's email is a generic payment/bank receipt and not a branded order confirmation.
- Admin does not currently receive an automatic new-order notification.
- Admin should check the **Orders** tab manually.
- Email/webhook notifications can be added later if required.
- Lab Test Booking continues to save booking data to Firestore (`labBookings`) and opens WhatsApp with the filled details.
- Admin login currently uses a simple `.env`-based ID/password check.
- The login state is stored using `sessionStorage`.
- Admin login is **not Firebase Auth**.
- This creates a security trade-off, especially once `orders`, `products`, and `categories` rules are tightened.
- Review the admin authentication and Firestore rules before production launch.
