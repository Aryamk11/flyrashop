# 🚀 PROJECT IDENTITY: FLYRASHOP
**Type:** E-commerce (B2C / Urban Fashion)
**Region:** Iran (Strict Network Environment)
**Language:** Persian (Farsi) | Direction: RTL (Right-to-Left)
**Aesthetic:** Underground Cyberpunk / Luxury (Black & Neon Pink #ff007f)
**Brand Font:** `EB Garamond` (Google Fonts), `Geist` (Body)

---

## 🛠 TECH STACK
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 (Config in `app/globals.css`)
* **Database:** Supabase (PostgreSQL)
* **Auth:** Supabase Auth (Phone/OTP)
* **Icons:** `lucide-react`

---

## 🚦 PROJECT STATUS (As of 2026-02-17)

### ✅ IMPLEMENTED
1.  **Core UI/UX:**
    *   Cyberpunk/Neon Aesthetic with Tailwind v4.
    *   RTL Layout Validation.
    *   Responsive Grid Layouts.
2.  **Product Management (Admin):**
    *   Dashboard (`/admin/dashboard`).
    *   Product List with Delete (`/admin/products`).
    *   Add/Edit Product Forms (`/admin/products/[id]`).
3.  **Shopping Experience:**
    *   **Product Browser:** Home page grid.
    *   **Product Details:** Dynamic slug pages.
    *   **Add to Cart:**
        *   Standard button with Quantity Badge.
        *   "Add Again" functionality.
    *   **Cart Drawer:** Quick view of items.
    *   **Cart Edit Page (`/cart/edit`):**
        *   Visual diffs: Green (Added), Yellow (Reduced), Red/Strike (Deleted).
        *   Price change summary.

### 🚧 IN PROGRESS / TODO (Roadmap)
1.  **Checkout Flow (PRIORITY):**
    *   [ ] Shipping Address Form.
    *   [ ] Payment Gateway Integration (or Mock).
    *   [ ] Order Creation in Supabase.
2.  **User Profile:**
    *   [ ] Order History.
    *   [ ] Saved Addresses.
3.  **Search & Discovery:**
    *   [ ] Functional Search Bar.
    *   [ ] Advanced Filters (Category, Price).
4.  **Polish:**
    *   [ ] SEO Metadata (Titles/Descriptions).
    *   [ ] Image Optimization.
    *   [ ] Mobile Touch Optimization.

---

## 📂 CRITICAL FILE STRUCTURE
*   `app/`
    *   `admin/` - Admin protected routes.
    *   `cart/`
        *   `edit/` - Advanced cart editing page.
    *   `product/[slug]/` - Product details.
*   `components/`
    *   `Cart/`
        *   `AddToCartButton.tsx` - Smart button logic.
        *   `CartContext.tsx` - Global cart state.
        *   `CartDrawer.tsx` - Side overlay.
*   `lib/supabase.ts` - Database client.

---

## ⚠️ AI RULES
1.  **Style:** Maintain the "Underground Cyberpunk" aesthetic. No generic designs.
2.  **RTL:** Always ensure `dir="rtl"` compatibility.
3.  **Supabase:** Use `supabase-js` v2 patterns.