# Navbar Component

This folder contains the `navbar.tsx` React component for InterviewAI Pro.

## Features
- Responsive navigation bar for Next.js
- Profile section with user initial, dropdown menu, and user settings
- Allows editing display name (profile icon updates accordingly)
- Colorful logout button
- Mobile menu support

## Usage
Import and use the `Navbar` component in your Next.js app:

```tsx
import { Navbar } from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
```

## Note
- This file does not contain any sensitive information or credentials.
- For authentication and Firebase integration, you must provide your own setup.
