# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Links

- Solution URL: [frontendmentor ip address tracker challenge](https://www.frontendmentor.io/solutions/ip-address-tracker-challenge-using-nextjs-typescript-and-tailwindcss-LympNXqcgc)
- Live Site URL: [ip address tracker](https://ip-address-tracker-devberg.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailWindCSS](https://tailwindcss.com/) - For styles
- [React-leaflet](https://react-leaflet.js.org/) - For interactive maps
- [Ip Geolocation API](https://geo.ipify.org/) - For IP tracking data

### What I learned

This project taught me how to use TypeScript with Next.js, ensuring better code quality and fewer runtime errors by defining strict types. Additionally, I combined Tailwind CSS with Styled Components for faster and more maintainable styling. I also learned how to integrate the IP Geolocation API to retrieve and display IP information dynamically on an interactive map built with Leaflet.js.

Here’s a code snippet I’m proud of, demonstrating the integration of TypeScript with API calls:

```typescript
interface IPDetails {
  ip: string;
  city: string;
  country_name: string;
  latitude: number;
  longitude: number;
  isp: string;
}

const fetchIPDetails = async (ip: string): Promise<IPDetails> => {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=${ip}`
  );
  const data = await response.json();
  updateMap(data.latitude, data.longitude);
  setIpInfo({
    ip: data.ip,
    location: `${data.city}, ${data.country_name}`,
    isp: data.isp,
  });
  return data;
}
``` 

### Continued development

In future projects, I plan to:

- Deepen my understanding of advanced TypeScript concepts and improve its integration with APIs.
- Utilize Tailwind CSS’s new features for even more dynamic UI designs.
- Add advanced map features like custom markers, routes, and weather overlays.
- Explore server-side rendering with Next.js for faster data loading and better SEO.

### Useful resources

- Tailwind CSS Documentation - Helped me streamline my styling process.
- TypeScript Handbook - Essential for learning how to type API responses and React components effectively.
- Leaflet.js Documentation - Helped me understand how to integrate interactive maps.
- IP Geolocation API Documentation - A detailed guide on retrieving IP-related data efficiently.

## Author

- Website - [DevBerg](http://devberg.com.br/)
- Frontend Mentor - [@newberg85](https://www.frontendmentor.io/profile/newberg85)
- Instagran - [@new.berg85]((https://www.instagram.com/new.berg85/))

## Acknowledgments

A big thanks to the Frontend Mentor community for their inspiring solutions and feedback. This challenge was an excellent way to refine my skills in TypeScript, Tailwind CSS, and API integration.

