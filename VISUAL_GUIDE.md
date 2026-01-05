# 🩸 Blood Bank System - Visual Navigation Guide

## Main Layout

```
┌─────────────────────────────────────────────────────────┐
│  [☰]  🩸 BloodBank                        Admin  [👤 A] │  ← TOPBAR
├────────────────────────────────────────────────────────┤
│                                                          │
│ 🏠 Dashboard      ┌─────────────────────────────────┐  │
│ 🔍 Search Donors  │                                 │  │
│ 📋 Register Donor │   PAGE CONTENT                  │  │
│ 📊 Reports        │   (Changes based on route)      │  │
│ ⚙️  Settings      │                                 │  │
│                   └─────────────────────────────────┘  │
│ [↪️  Logout]                                            │
├────────────────────────────────────────────────────────┤
    ↑                                                    ↑
  SIDEBAR                                            MAIN AREA
```

---

## 📊 DASHBOARD PAGE

```
┌────────────────────────────────────────────────────────┐
│ Dashboard                                              │
│ Welcome back to Blood Bank Management                  │
├────────────────────────────────────────────────────────┤

┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ 👥 TOTAL DONORS  │ ⚠️  PENDING REQ.  │ 🩸 UNITS TODAY   │ 📦 TOTAL STOCK   │
│                  │                  │                  │                  │
│       20         │        7         │     2250 ml      │      154 units   │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘

Blood Inventory
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ O+ │ O- │ A+ │ A- │ B+ │ B- │AB+ │AB-│
│ 45 │ 12 │ 28 │ 8  │ 35 │ 5  │ 18 │ 3 │
│    │    │    │    │    │⚠️  │    │🔴 │
│    │    │    │    │    │LSt │    │LSt│
└────┴────┴────┴────┴────┴────┴────┴────┘
Green=Normal | Yellow=Medium | Red/LSt=Low Stock (<5)

Recent Donations
┌─────────────┬────────────┬──────────┬────────┬──────────┐
│ Donor Name  │ Blood Type │   Date   │  Time  │ Units    │
├─────────────┼────────────┼──────────┼────────┼──────────┤
│ Rajesh K.   │     O+     │ 2025-12-26│ 14:30 │  450 ml  │
│ Priya S.    │     A+     │ 2025-12-25│ 11:15 │  450 ml  │
│ Vikram D.   │     O-     │ 2025-12-24│ 16:45 │  450 ml  │
│ Deepika N.  │     AB-    │ 2025-12-23│ 09:20 │  450 ml  │
│ Pooja I.    │     A+     │ 2025-12-22│ 15:00 │  450 ml  │
└─────────────┴────────────┴──────────┴────────┴──────────┘
```

---

## 🔍 SEARCH DONORS PAGE

```
┌────────────────────────────────────────────────────────┐
│ Search Donors                                          │
│ Find donors by blood type or location                  │
├────────────────────────────────────────────────────────┤

Filter Bar:
┌───────────────────┬──────────────────────────────┬──────────┐
│ Blood Group ▼     │ 🔍 Location/Name/Phone      │ [Reset]  │
│ All Blood Types   │                              │          │
└───────────────────┴──────────────────────────────┴──────────┘

Found 20 donor(s)

Results Table:
┌──────────────────┬────────────┬──────────────┬──────────────┬──────────────┐
│ Name (Age)       │ Blood Type │   Location   │ Last Donation│   Actions    │
├──────────────────┼────────────┼──────────────┼──────────────┼──────────────┤
│ Rajesh Kumar     │     O+     │   Mumbai     │  2025-11-15  │[Contact]☎️📧 │
│ (28 years)       │            │              │              │              │
├──────────────────┼────────────┼──────────────┼──────────────┼──────────────┤
│ Priya Singh      │     A+     │   Delhi      │  2025-12-01  │[Contact]☎️📧 │
│ (32 years)       │            │              │              │              │
├──────────────────┼────────────┼──────────────┼──────────────┼──────────────┤
│ Arjun Patel      │     B+     │  Bangalore   │  2025-10-20  │[Contact]☎️📧 │
│ (25 years)       │            │              │              │              │
└──────────────────┴────────────┴──────────────┴──────────────┴──────────────┘
```

---

## 📋 REGISTRATION FORM PAGE

```
┌────────────────────────────────────────────────────────┐
│ Donor Registration                                     │
│ Register as a blood donor to help save lives           │
├────────────────────────────────────────────────────────┤

[✓ Success] or [✗ Error] Alert (if submitted)

═══════════════════════════════════════════════════════════

PERSONAL INFORMATION
┌──────────────────────┬──────────────────────┐
│ Full Name*           │ Age*                 │
│ [________________]   │ [___]                │
├──────────────────────┼──────────────────────┤
│ Gender*              │ Contact Number*      │
│ [Male ▼]             │ [__________]         │
├──────────────────────┼──────────────────────┤
│ Email Address*                             │
│ [_________________________]                 │
└──────────────────────┴──────────────────────┘

═══════════════════════════════════════════════════════════

MEDICAL INFORMATION
┌──────────────────────┬──────────────────────┐
│ Blood Group*         │ Last Donation Date   │
│ [Select ▼]           │ [YYYY-MM-DD]         │
└──────────────────────┴──────────────────────┘

═══════════════════════════════════════════════════════════

HEALTH CHECKLIST
┌─────────────────────────────────────────────┐
│ ☐ Recent Tattoos                            │
│ ☐ Existing Medications                      │
│ ☐ Chronic Illness                           │
└─────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════

[REGISTER AS DONOR] or [Registering... ⟳]
```

---

## 🚀 User Flow

```
┌──────────────┐
│  Open App    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│   Main Layout        │
│   (Sidebar + Topbar) │
└──────┬───────────────┘
       │
       ├─→ [Dashboard] → View Stats & Inventory
       │
       ├─→ [Search Donors] → Find & Filter → Contact
       │
       ├─→ [Register Donor] → Fill Form → Validation → Submit
       │
       ├─→ [Reports] → (Coming Soon)
       │
       └─→ [Settings] → (Coming Soon)
```

---

## 🎯 Key Interactive Elements

### Dashboard
- Stats automatically show current data
- Blood type cards show color-coded status
- Hover over cards for emphasis
- Table is scrollable on mobile

### Search Page
- Blood Group dropdown (8 types)
- Search input (real-time filtering)
- Reset button clears all filters
- Contact buttons trigger actions
- Phone/Email icons for quick contact

### Registration Form
- All fields show validation feedback
- Submit button shows loading spinner
- Success/Error messages appear
- Form clears on successful submission

### Sidebar
- Highlights current active page
- Collapses on mobile (hamburger menu)
- Smooth transitions
- Logout button at bottom

---

## 📲 Mobile View

```
┌────────────────────┐
│ [☰] 🩸 BloodBank   │ ← TOPBAR
├────────────────────┤
│                    │
│  [Dashboard]       │
│  [Search Donors]   │ ← SIDEBAR OPENS
│  [Register Donor]  │   ON CLICK
│  [Reports]         │
│  [Settings]        │
│  [Logout]          │
│                    │
└────────────────────┘

┌────────────────────┐
│ [☰] 🩸 BloodBank   │
├────────────────────┤
│                    │
│  PAGE CONTENT      │ ← SIDEBAR HIDDEN
│  Responsive        │
│  Full Width        │
│                    │
│                    │
└────────────────────┘
```

---

## 🎨 Color Guide

| Element | Color | Usage |
|---------|-------|-------|
| Sidebar | Red #8B0000 | Primary navigation |
| Buttons | Red #DC2626 | Call-to-action |
| Links | Red #DC2626 | Interactive elements |
| Borders | Gray #E5E7EB | Dividers |
| Background | White | Content areas |
| Text | Gray #374151 | Body text |
| **Low Stock** | Red #FEE2E2 | Warning badge |
| **Normal** | Green #DCFCE7 | Good status |
| **Medium** | Yellow #FEF3C7 | Caution status |

---

## 🔄 Data Flow

```
Dashboard:
Mock Data → Display → Ready for API

Search:
Mock Data → Filter (Client-side) → Display → Action Buttons

Registration:
Form Input → Validation (Zod) → Loading State → Success/Error
```

---

## 💡 Quick Tips

1. **Toggle Sidebar**: Click the hamburger menu (☰)
2. **Search Real-time**: Type in search box - updates instantly
3. **Filter Blood Type**: Select from dropdown - updates table
4. **Test Validation**: Try submitting with invalid data
5. **Mobile View**: Resize browser to see responsive design
6. **Contact Donor**: Click "Contact" button or phone/email icons

---

This is a **fully functional prototype** ready for backend integration!
