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
- Users are able to add items to preview using either increment/decrement buttons or typing number manually in the field.
- Once products are selected, `Summary` section of the page is reflecting reflecting the Total cost, Total energy and Land size of all selected item.
- With assumption that for every 4 batteries users need at least 1 Transformer - users are able to see a warning message if they have not added enough transformers to support selected batteries. Warning message allows users to quickly add missing transformers.
- Users are able to preview potential batteries layout in 2D view.
- Users are able to preview potential batteries layout in 3D view.
- Users are able to rotate 3D view to get a better understanding of the layout.
- Once user is hovering over specific battery in the layout, the menu item is highlighted reflecting which battery user is hovering on.

## Tech stack

- Project is using Next.js boilerplate: [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [MaterialUI components](https://mui.com/) are used as a "Base" components library to build UI e.g. Card, Button, Alert, Link, various icons components.
- [tailwindcss](https://tailwindcss.com/) is used to style layout and components along with custom CSS.
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) is used for 2D and 3D data visualization.

## Project structure

Current version of the app contains only single feature page and has only one route - the root, which can be accessed locally at [http://localhost:8000](http://localhost:8000).

To follow the app feature code you can start by opening `app/page.tsx` file which renders main container component `<BatterySiteEstimator />`. For simplicity, `page.tsx` simulates an API call by reading data from `app/api/deviceOptions.json` file which then gets passed down to `BatterySiteEstimator`. In the future iterations it can be replaced with data from API.

`<BatterySiteEstimator />` contains all the rest of the feature code and uses relevant components which can be found in `app/components` folder.

`app/utils.ts` contains common utils which are used for formatting data.
