# Upgrade & Fix Notes

## Changes Applied

### Critical Bug Fixes

#### `client/package.json`
- **FIXED**: `@tailwindcss/postcss` was set to `"@hookform/resolvers/zod"` (a completely wrong value — likely a copy-paste error). Corrected to `"^4"`.

#### `client/src/app/globals.css`
- **FIXED**: File only contained `@import "tailwindcss"` with no `@theme` block or CSS custom properties. Tailwind v4 requires a proper `@theme inline { }` block to map design tokens. Added theme variables and `@layer base` reset.

#### `admin/package.json` — `react-day-picker`
- **FIXED**: `react-day-picker` was pinned to `8.10.1`, which requires `date-fns` v2 or v3. The project uses `date-fns ^4.1.0`, which is a breaking incompatibility (date-fns v4 dropped many APIs used by rdp v8). Upgraded to `react-day-picker ^9.6.7`, which officially supports date-fns v4.

#### `admin/src/components/ui/calendar.tsx`
- **FIXED**: Updated component API for react-day-picker v9. Key breaking changes:
  - `caption` → `month_caption`
  - `table` → `month_grid`
  - `head_row`/`head_cell` → `weekdays`/`weekday`
  - `row`/`cell`/`day` → `week`/`day`/`day_button`
  - `day_range_start`/`day_range_end` → `range_start`/`range_end`
  - `day_selected`/`day_today`/`day_outside`/`day_disabled`/`day_range_middle`/`day_hidden` → `selected`/`today`/`outside`/`disabled`/`range_middle`/`hidden`
  - `nav_button`/`nav_button_previous`/`nav_button_next` → `button_previous`/`button_next`
  - `IconLeft`/`IconRight` components → unified `Chevron` component with `orientation` prop

### Security & UX Improvements

#### `client/src/components/PaymentForm.tsx`
- **SECURITY**: CVV field changed from `type="text"` to `type="password"` — CVV must never be visible on screen
- **FIXED**: Card number placeholder was `"123456789123"` (12 digits) — corrected to `"1234 5678 9012 3456"` (16 digits)
- **ADDED**: `maxLength` attributes on card number (16), expiration date (5), CVV (3)
- **ADDED**: `autoComplete` attributes (`cc-name`, `cc-number`, `cc-exp`, `cc-csc`) for browser autofill and password manager support
- **ADDED**: `inputMode="numeric"` on card number and CVV for mobile keyboards

#### `client/src/components/ShippingForm.tsx`
- **FIXED**: Phone field changed from `type="text"` to `type="tel"`
- **ADDED**: `autoComplete` attributes (`name`, `email`, `tel`, `street-address`, `address-level2`)
- **ADDED**: `inputMode="numeric"` and `maxLength={10}` on phone field

### Configuration

#### `client/next.config.ts`
- **ADDED**: `remotePatterns` for `images.pexels.com` (consistent with admin config; prevents runtime errors if external product images are used)

### Lockfiles
- `client/pnpm-lock.yaml` — removed (was generated with the broken `@tailwindcss/postcss` value; run `pnpm install` to regenerate)
- `admin/pnpm-lock.yaml` — removed (was generated with react-day-picker v8; run `pnpm install` to regenerate)

## How to run after upgrading

```bash
# In admin/
cd admin && pnpm install && pnpm dev

# In client/
cd client && pnpm install && pnpm dev
```
