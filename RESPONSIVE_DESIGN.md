# Responsive Design Documentation

## Overview

Aplikasi MERCY ERP telah dioptimasi untuk 3 breakpoint utama menggunakan Tailwind CSS:

- **Mobile**: < 768px (Smartphone)
- **Tablet**: 768px - 1024px (Tablet)
- **Desktop**: ≥ 1024px (Komputer/Laptop)

## Breakpoints Tailwind CSS

```
sm:  640px  - Minimal usage
md:  768px  - Tablet (Primary breakpoint)
lg:  1024px - Desktop
xl:  1280px - Large Desktop
2xl: 1536px - Extra Large Desktop
```

## Komponen Utama

### 1. App Layout (`src/App.tsx`)

#### Mobile (< 768px)
- **Sidebar**: Hidden by default, slide-in overlay saat menu dibuka
- **Header Bar**: Fixed top bar dengan logo & hamburger menu
- **Main Content**: Full width dengan padding top untuk header

#### Tablet & Desktop (≥ 768px)
- **Sidebar**: Visible dengan opsi collapse/expand
- **No Header Bar**: Sidebar selalu visible
- **Main Content**: Flex dengan sidebar

**Fitur Responsive:**
```tsx
// Mobile menu detection
const [isMobile, setIsMobile] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Auto-detect screen size
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', checkMobile);
}, []);
```

### 2. Dashboard (`src/components/Dashboard.tsx`)

#### Stats Grid
- **Mobile**: 2 columns (`grid-cols-2`)
- **Tablet**: 3 columns (`md:grid-cols-3`)
- **Desktop**: 6 columns (`lg:grid-cols-6`)

#### Module Cards
- **Mobile**: 1 column (`grid-cols-1`)
- **Tablet**: 2 columns (`sm:grid-cols-2`)
- **Desktop**: 3-4 columns (`lg:grid-cols-3 xl:grid-cols-4`)
- **Large Desktop**: 5 columns (`2xl:grid-cols-5`)

#### Responsive Padding
```tsx
<div className="p-4 md:p-6 space-y-4 md:space-y-6">
```

### 3. Module Components

Semua modul (`*Module.tsx`) mengikuti pola yang sama:

#### Header
```tsx
<h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-1 font-medium">
<p className="text-sm md:text-base text-gray-600">
```

#### Stats Cards
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
  <div className="bg-white p-3 md:p-4 rounded-lg">
    <div className="flex items-center gap-2 md:gap-3">
      <div className="w-8 h-8 md:w-10 md:h-10 ...">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs md:text-sm truncate">Label</p>
        <p className="text-sm md:text-base font-medium">Value</p>
      </div>
    </div>
  </div>
</div>
```

#### Tabs Navigation (StockOpnameModule)
- **Mobile**: Shortened labels, smaller icons
- **Desktop**: Full labels

```tsx
<button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm">
  <Icon className="w-3 h-3 md:w-4 md:h-4" />
  <span className="hidden sm:inline">Full Text</span>
  <span className="sm:hidden">Short</span>
</button>
```

## CSS Utilities (`src/styles/globals.css`)

### Custom Responsive Classes

#### `.scrollbar-hide`
Menyembunyikan scrollbar tetapi tetap bisa di-scroll:
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

#### `.table-responsive`
Membuat tabel responsive dengan horizontal scroll:
```css
.table-responsive {
  @apply overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0;
}

/* Mobile: first column sticky */
@media (max-width: 767px) {
  .table-responsive th:first-child,
  .table-responsive td:first-child {
    @apply sticky left-0 bg-white z-10;
  }
}
```

#### `.text-responsive-*`
Responsive text sizes:
- `.text-responsive-sm`: `text-xs md:text-sm`
- `.text-responsive-base`: `text-sm md:text-base`
- `.text-responsive-lg`: `text-base md:text-lg`
- `.text-responsive-xl`: `text-lg md:text-xl lg:text-2xl`

#### `.stack-mobile`
Stack elemen secara vertical di mobile:
```css
.stack-mobile {
  @apply flex flex-col md:flex-row;
}
```

## Pattern Guide

### Grid Layouts

#### 2-Column Mobile, 4-Column Desktop
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
```

#### 1-Column Mobile, 2-Column Tablet, 3-4 Column Desktop
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Typography

```tsx
// Headings
<h1 className="text-lg md:text-xl lg:text-2xl font-medium">
<h2 className="text-base md:text-lg lg:text-xl font-medium">
<h3 className="text-sm md:text-base lg:text-lg font-medium">

// Body text
<p className="text-sm md:text-base">

// Small text
<span className="text-xs md:text-sm">
```

### Spacing

```tsx
// Container padding
<div className="p-4 md:p-6 space-y-4 md:space-y-6">

// Card padding
<div className="p-3 md:p-4">

// Gaps
<div className="gap-2 md:gap-3 lg:gap-4">
```

### Icons

```tsx
// Small icons
<Icon className="w-3 h-3 md:w-4 md:h-4" />

// Medium icons
<Icon className="w-4 h-4 md:w-5 md:h-5" />

// Large icons
<Icon className="w-5 h-5 md:w-6 md:h-6" />
```

### Buttons

```tsx
// Primary button
<button className="px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm">

// Icon button
<button className="p-2 md:p-3">
  <Icon className="w-4 h-4 md:w-5 md:h-5" />
</button>
```

### Show/Hide Elements

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="md:hidden">

// Conditional rendering
<span className="hidden sm:inline">Desktop Text</span>
<span className="sm:hidden">Mobile Text</span>
```

## Tables

### Basic Responsive Table

```tsx
<div className="table-responsive">
  <table className="min-w-full">
    <thead>
      <tr>
        <th className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm">
          Header
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm">
          Data
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Features:**
- Horizontal scroll pada mobile
- First column sticky pada mobile
- Smaller padding & text size pada mobile

## Forms & Dialogs

### Responsive Form Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="text-xs md:text-sm">Label</label>
    <input className="w-full px-3 py-2 text-sm md:text-base" />
  </div>
</div>
```

### Modal/Dialog

```tsx
<div className="fixed inset-0 md:inset-auto md:max-w-lg">
  <div className="p-4 md:p-6">
    <h2 className="text-base md:text-lg">Title</h2>
  </div>
</div>
```

## Best Practices

### 1. Mobile-First Approach
Mulai dengan mobile styles, tambahkan breakpoints untuk tablet & desktop:
```tsx
// ✅ Good
<div className="p-4 md:p-6">

// ❌ Bad
<div className="md:p-4 p-6">
```

### 2. Consistent Breakpoints
Gunakan breakpoints yang konsisten:
- `md:` untuk tablet (768px)
- `lg:` untuk desktop (1024px)

### 3. Touch-Friendly Targets
Minimum 44x44px untuk touch targets di mobile:
```tsx
<button className="min-h-[44px] min-w-[44px]">
```

### 4. Readable Font Sizes
Minimum 12px untuk body text di mobile:
```tsx
<p className="text-xs md:text-sm"> // 12px → 14px
<p className="text-sm md:text-base"> // 14px → 16px
```

### 5. Flexible Grids
Gunakan `grid-cols-auto` atau `auto-fit` untuk flexibility:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 6. Test on Real Devices
- Test di berbagai device sizes
- Periksa touch interactions
- Verify scrolling behavior

## Testing Breakpoints

### Chrome DevTools
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test breakpoints:
   - Mobile: 375px, 414px
   - Tablet: 768px, 834px, 1024px
   - Desktop: 1280px, 1440px, 1920px

### Common Device Sizes
- **iPhone SE**: 375x667
- **iPhone 12/13**: 390x844
- **iPad**: 768x1024
- **iPad Pro**: 1024x1366
- **Desktop**: 1920x1080

## Files Modified

### Core Files
- `src/App.tsx` - Main layout with responsive sidebar
- `src/components/Dashboard.tsx` - Responsive dashboard
- `src/styles/globals.css` - Responsive utilities

### Module Files (All Updated)
- `src/components/modules/APModule.tsx`
- `src/components/modules/ARModule.tsx`
- `src/components/modules/AccountingModule.tsx`
- `src/components/modules/ApprovalModule.tsx`
- `src/components/modules/CashModule.tsx`
- `src/components/modules/DeliveryModule.tsx`
- `src/components/modules/InventoryModule.tsx`
- `src/components/modules/MasterModule.tsx`
- `src/components/modules/PurchasingModule.tsx`
- `src/components/modules/SalesModule.tsx`
- `src/components/modules/SecurityModule.tsx`
- `src/components/modules/StockOpnameModule.tsx`

## Future Improvements

1. **Responsive Tables**: Implement card-based view untuk complex tables di mobile
2. **Touch Gestures**: Add swipe gestures untuk tab navigation
3. **Progressive Enhancement**: Lazy load untuk data tables di mobile
4. **Offline Support**: Service Worker untuk offline functionality
5. **Performance**: Code splitting per module untuk faster mobile load

## Support

Untuk pertanyaan atau issue terkait responsive design:
- Check DevTools console untuk warnings
- Test di berbagai breakpoints
- Refer to Tailwind CSS documentation: https://tailwindcss.com/docs/responsive-design

---

**Last Updated**: 2026-01-04
**Version**: 1.0
**Branch**: claude/responsive-three-breakpoints-uOCUZ
