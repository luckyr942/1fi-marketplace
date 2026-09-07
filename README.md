# 1Fi Marketplace — SDE Intern Assignment

**A seamless, dynamic shopping experience with 0% No-Cost EMI backed by Mutual Funds.**

![version](https://img.shields.io/badge/release-v1.0.0-orange.svg)
![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue.svg)
![Expo](https://img.shields.io/badge/Expo-~54.0.36-lightgrey.svg)


This repository contains the implementation of the **1Fi Marketplace** section within the existing Shop page of the 1Fi app. 

The goal of this project was to extend the 1Fi app by building a fully interactive marketplace where users can browse top brands, view dynamic product variants (colors/specs), and check out with an instant 0% No-Cost EMI by pledging their mutual fund portfolio.

---

## 🎯 What We Implemented

As per the assignment requirements, the **Top Brands** and **Nearby Stores** tabs remain as visual placeholders, while the **1Fi Marketplace** is fully designed and operational.

### 1. Custom Floating Navigation
- Built a pixel-perfect, native-feeling custom floating bottom tab bar matching 1Fi's brand aesthetics (`#6D28D9` primary purple).
- 5 main tabs: **Home**, **Shop** (active), **EMI Dues**, **Limit**, and **Profile**. (Non-shop tabs contain blank placeholders).

### 2. Shop Dashboard
- A sleek hero header highlighting the "Shop on no-cost EMI" value proposition.
- 3 Segmented Tabs: Top Brands | Nearby Stores | 1Fi Marketplace.
- A horizontal category scroll (All Deals, Bikes & Cars, Flights, etc.) and a functional search bar.

### 3. Dynamic Product Catalog & Variants
- Display products fetched from a custom API service (`marketplaceAPI.js`).
- **Context-Aware Variants:** Every product dynamically loads its own relevant options instead of hardcoded generic sizes. For example:
  - **Phones:** Select *Storage* (128GB, 256GB).
  - **Scooters:** Select *Motor Power* (3kW, 6kW).
  - **Travel:** Select *Duration* (5 Nights, 7 Nights).

### 4. EMI Selection Flow
- A dedicated **EMI Plan Selection Screen** that automatically calculates 0% No-Cost EMI based on the product's price and selected variants.
- Tenure options for 6, 12, 18, 24, and 36 months, highlighting the recommended plan.

### 5. Order Summary & Pledge Confirmation
- A comprehensive breakdown of the loan, processing fees (₹0), and the Mutual Fund Lien Lock amount.
- An E-NACH consent checkbox to authorize monthly auto-debits.
- A final **Order Success Screen** simulating instant approval and providing an order tracking ID.

### 6. Robust Error & State Handling
- Implemented `MarketplaceSkeleton` for shimmer loading effects while fetching data.
- Built a `MarketplaceEmpty` screen when search yields zero results.
- Added a `MarketplaceError` state with a retry button for network failures.

---

## 🚀 How to Run the Code

This project is built using **Expo** and **React Native**. Follow these steps to run it locally on your machine or physical device.

### Prerequisites
- Node.js (v18 or newer recommended)
- Git
- Expo Go app installed on your iOS or Android device (optional, for physical device testing)

### Step 1: Clone the Repository
```bash
git clone https://github.com/luckyr942/1fi-marketplace.git
cd 1fi-marketplace
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Metro Bundler
```bash
npx expo start
```

### Step 4: Run the App
Once the Metro Bundler starts, you will see a QR code in your terminal. You can:
- **Run on a Physical Device:** Open the camera app on your phone (iOS) or the Expo Go app (Android) and scan the QR code.
- **Run on iOS Simulator:** Press `i` in the terminal. *(Requires Xcode installed on Mac).*
- **Run on Android Emulator:** Press `a` in the terminal. *(Requires Android Studio installed).*

---

## 🏗️ Architecture & Tech Stack

- **Framework:** React Native / Expo
- **Language:** JavaScript
- **Navigation:** `@react-navigation/bottom-tabs` & `@react-navigation/native-stack`
- **Styling:** React Native `StyleSheet` with dynamic theming
- **Icons:** `@expo/vector-icons` (Ionicons, Feather, MaterialCommunityIcons)
- **State Management:** Custom React Hooks (`useMarketplace.js`) for centralized data fetching and UI state separation.

---
