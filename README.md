# Totoka Pacific

Single-page site for Totoka Pacific, an import/export company in Suva, Fiji.
Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing

- **All copy** is in `content/site.ts`. Items marked `TODO` need real details:
  email, phone, WhatsApp number, street address, hours, founder name and note,
  and the transit times on the routes table.
- **Colours** are tokens at the top of `app/globals.css`. The orange accent is
  used on three things only: the vessel on the map, the active nav underline
  and the contact form button.
- **Photos**: put files in `public/photos/` and set the `photo.src` fields in
  `content/site.ts` (hero, about, founder). The warehouse photo in
  `components/Process.tsx` takes a `src` prop the same way. Until then a flat
  drawn stand-in is shown, labelled "placeholder".
- **Contact form** currently opens the visitor's email app with the enquiry
  filled in. To receive submissions directly, post the form to a form service
  or an API route (see the TODO in `components/ContactForm.tsx`).
