# 🚀 PROJECT IDENTITY: FLYRASHOP
**Type:** E-commerce (B2C / Urban Fashion)
**Region:** Iran (Strict Network Environment)
**Language:** Persian (Farsi) | Direction: RTL (Right-to-Left)
**Aesthetic:** Underground Cyberpunk / Luxury (Black & Neon Pink #ff007f)
**Brand Font:** `EB Garamond` (Google Fonts), `Geist` (Body)

---

## 🛠 TECH STACK
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript (Strict Mode: OFF for velocity)
* **Styling:** Tailwind CSS v4
    * *Config:* defined in `app/globals.css` using `@theme`.
* **Database:** Supabase (PostgreSQL)
    * *Auth:* **Supabase Auth** (Phone Number / OTP)
    * *Storage:* Product Images
* **Icons:** `lucide-react`

---

## 🏛 ARCHITECTURE & RULES
1.  **Authentication:**
    * **User Auth:** Phone Number + SMS OTP (Supabase).
    * **Admin Auth:** Protected routes (`/admin`) with session handling.
2.  **Shopping Experience:**
    * **Product Browser:** Grid view with filters.
    * **Product Details:** Dedicated page with deep links.
    * **Cart & Checkout:** (In Progress)
3.  **Localization (RTL):**
    * Root layout: `<html lang="fa" dir="rtl">`.
    * Tailwind: Use Logical Properties (`ps-4`, `ms-2`).
    * Header Layout (RTL Inverted): 
        * **RIGHT Side:** Nav Links + Search.
        * **LEFT Side:** Brand Logo + Admin Controls.

---

## 📂 CURRENT FILE STRUCTURE
* `app/page.tsx`: Landing page (Hero + Product Grid).
* `app/login/page.tsx`: User Login (Phone -> OTP).
* `app/profile/page.tsx`: User Profile (Orders, Info).
* `app/admin/`: Admin Dashboard & Login.
* `components/`:
    * `Auth/`: `PhoneInput`, `OTPInput`.
    * `Header.tsx`, `Footer.tsx`.
    * `ProductCard.tsx`.
* `lib/`:
    * `supabase.ts`: Supabase Client Config.

---

## 💾 DATABASE SCHEMA (Supabase)
**Table: `products`**
* `id` (int8, primary)
* `title` (text)
* `price` (numeric)
* `description` (text)
* `image_url` (text)
* `created_at` (timestamptz)

**Auth:** Managed via Supabase Auth (`auth.users`).

---

## ⚠️ CRITICAL CONTEXT FOR AI
1.  **Tailwind v4:** `globals.css` is the source of truth.
2.  **Images:** Use `next/image` where possible, fallback to `img` if complexity arises.
3.  **RTL:** Always test UI in RTL mode.