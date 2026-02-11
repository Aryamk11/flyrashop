# 🚀 PROJECT IDENTITY: FLYRASHOP
**Type:** E-commerce (Inquiry-Based / Catalogue)
**Region:** Iran (Strict Network Environment)
**Language:** Persian (Farsi) | Direction: RTL (Right-to-Left)
**Aesthetic:** Underground Luxury (Black & Neon Pink #ff007f)
**Brand Font:** `EB Garamond` (Google Fonts)

---

## 🛠 TECH STACK (STRICT)
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript (Strict Mode: OFF for velocity)
* **Styling:** Tailwind CSS v4
    * *Config:* defined in `app/globals.css` using `@theme`.
    * *Fonts:* `EB Garamond` (Headers/Brand), `Geist` (Body).
* **Database:** Supabase (PostgreSQL)
    * *Connection:* `@supabase/supabase-js` (Direct).
    * *Auth:* **CUSTOM implementation**. We do NOT use Supabase Auth.
        * *Flow:* SMS OTP -> `otps` table -> JWT (HTTP-Only Cookie).
* **Icons:** `lucide-react`

---

## 🏛 ARCHITECTURE & RULES
1.  **Authentication:**
    * Admins only. No user accounts.
    * Phone number whitelist in `.env` (`ADMIN_PHONE_NUMBER`).
    * Session managed via `admin_session` cookie.
2.  **Payment Flow:**
    * **NO Payment Gateway.**
    * **NO Shopping Cart.**
    * Action: "Inquiry to Buy" -> Redirects to WhatsApp/Dialer.
3.  **Localization (RTL):**
    * Root layout: `<html lang="fa" dir="rtl">`.
    * Tailwind: Use Logical Properties (`ps-4`, `ms-2`) instead of physical (`pl-4`, `ml-2`) where possible.
    * Header Layout (RTL Inverted): 
        * **RIGHT Side:** Nav Links + Search.
        * **LEFT Side:** Brand Logo + Admin Controls.

---

## 📂 CURRENT FILE STRUCTURE STATE
* `app/page.tsx`: Landing page. Fetches products directly.
* `app/actions/`: Server Actions for logic.
    * `auth.ts`: `sendOtpAction`, `verifyOtpAction` (JWT generation).
    * `product.ts`: `addProduct` (Supabase Storage + DB Insert).
* `components/`:
    * `Header.tsx`: Responsive, RTL, EB Garamond Font.
    * `Footer.tsx`: Standard footer.
    * `ProductCard.tsx`: Display card with "Inquiry" button.
* `lib/`:
    * `supabase.ts`: Singleton clients (Admin & Anon).
    * `sms.ts`: Mock SMS logger (To be replaced with KavehNegar).

---

## 💾 DATABASE SCHEMA
**Table: `products`**
* `id` (int8, primary)
* `title` (text)
* `price` (numeric)
* `image_url` (text)
* `created_at` (timestamptz)

**Table: `otps`**
* `phone` (text, primary)
* `code` (text)
* `expires_at` (timestamptz)

---

## ⚠️ CRITICAL CONTEXT FOR AI
1.  **Tailwind v4:** Do not use `tailwind.config.js`. Everything is in `globals.css`.
2.  **TypeScript:** If complex type errors block the build, prioritize `any` or `@ts-ignore` to maintain velocity (CodeNexus Protocol).
3.  **Images:** Remote patterns are configured for ALL domains (`**`) in `next.config.mjs`.
4.  **Environment:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PHONE_NUMBER`, `JWT_SECRET`.