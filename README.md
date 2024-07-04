This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install project dependencies with:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## Description

### Summary
Demo app which allows users to select set of batteries they want to purchase and calculates price, required energy, area and potential installation site layout.

### App screenshot
<img width="1466" alt="Screenshot 2024-07-03 at 9 27 25 PM" src="https://github.com/vladyslavkuliani/battery-site-layout/assets/22001260/bc086be0-51cf-4f68-af05-6c56a224aff1">

### Features

- Users are able see available producs and their specifications
- Users are able to add items to preview using either increment/decrement buttons or typing number manually in the field
- Once products are selected, `Summary` section of the page is reflecting reflecting the Total cost, Total energy and Land size of all selected item.
- With assumption that for every 4 batteries users need at least 1 Transformer - users are able to see a warning message if they have not added enough transformers to support selected batteries. Warning message allows users to quickly add missing transformers.
- Users are able to preview potential batteries layout in 2D view.
- Users are able to preview potential batteries layout in 3D view.
- Users are able to rotate 3D view to get a better understanding of the layout.
- Once user is hovering over specific battery in the layout, the menu item is highlighted reflecting which battery user is hovering on.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

