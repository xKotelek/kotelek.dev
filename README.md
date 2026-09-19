<div align="center">
  <a href="https://kotelek.dev">
    <img src="public/memoji.png" width="120" alt="xKotelek's Memoji" />
  </a>

  <h1>kotelek.dev</h1>
  <p><strong>A little corner of the internet, built by xKotelek.</strong></p>
  <p>My personal portfolio for frontend &amp; backend development.<br/>Dark colors, purple accents, and a few playful interactions.</p>

  <a href="https://kotelek.dev"><img src="https://img.shields.io/badge/VISIT-kotelek.dev-7C3AED?style=for-the-badge&amp;labelColor=0D0D0D&amp;logo=vercel&amp;logoColor=white" alt="Visit kotelek.dev" /></a>
  <a href="mailto:contact@kotelek.dev"><img src="https://img.shields.io/badge/EMAIL-contact%40kotelek.dev-7C3AED?style=for-the-badge&amp;labelColor=0D0D0D&amp;logo=gmail&amp;logoColor=white" alt="Email xKotelek" /></a>

  <br/><br/>

  <a href="#the-site">The site</a> &middot;
  <a href="#tech-stack">Tech stack</a> &middot;
  <a href="#run-locally">Run locally</a> &middot;
  <a href="#project-structure">Project structure</a>
</div>

---

## The site

- **An introduction with a twist.** An interactive skills orbit brings the homepage to life.
- **A home for my projects.** Browse quickshop, quickpay, ToDo!, and mbio through cards with tilt effects and stack icons.
- **A direct way to get in touch.** The contact form sends email through SMTP, with server-side validation, a honeypot, and in-memory rate limiting.
- **Details that move with you.** A custom cursor, pointer trails, and page reveals add personality, with responsive layouts and reduced-motion support.

<div align="center">
  <a href="https://kotelek.dev">Home</a> &middot;
  <a href="https://kotelek.dev/projects">Projects</a> &middot;
  <a href="https://kotelek.dev/contact">Contact</a> &middot;
  <a href="https://status.kotelek.dev">Service status</a>
</div>

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js_15-0D0D0D?style=flat-square&logo=nextdotjs&logoColor=8B5CF6)
![React](https://img.shields.io/badge/React_19-0D0D0D?style=flat-square&logo=react&logoColor=8B5CF6)
![JavaScript](https://img.shields.io/badge/JavaScript-0D0D0D?style=flat-square&logo=javascript&logoColor=8B5CF6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-0D0D0D?style=flat-square&logo=tailwindcss&logoColor=8B5CF6)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0D0D0D?style=flat-square&logo=nodedotjs&logoColor=8B5CF6)
![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-0D0D0D?style=flat-square&logo=vercel&logoColor=8B5CF6)

Built with the Next.js App Router, styled with Tailwind CSS and custom CSS animations, and finished with Geist fonts and Lucide icons.

## Run locally

With Node.js and npm installed:

```bash
git clone https://github.com/xKotelek/kotelek.dev.git
cd kotelek.dev
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The development server uses Turbopack and updates as you edit.

### Contact form setup

The site runs without SMTP credentials. To enable email delivery, copy [`.env.example`](.env.example) to `.env.local`, fill in your provider's values, and restart the server.

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` | Your SMTP server hostname. |
| `SMTP_PORT` | SMTP port; defaults to `587`. Port `465` uses implicit TLS. |
| `SMTP_USER` | SMTP authentication username. |
| `SMTP_PASS` | SMTP authentication password. |
| `CONTACT_TO` | Inbox for submissions; defaults to `contact@kotelek.dev`. |
| `CONTACT_FROM` | Sender address; defaults to `SMTP_USER`. |

Keep credentials in `.env.local`, which is ignored by Git. For deployment, configure the same variables in your hosting environment. Email delivery requires a Node.js runtime and access to your SMTP server.

### Production

```bash
npm run build
npm start
```

## Project structure

```text
app/
  page.js               Homepage and social links
  projects/page.js      Project showcase
  contact/page.js       Contact form
  api/contact/route.js  SMTP email endpoint
  layout.js             Shared layout, fonts, metadata, and analytics
  globals.css           Theme, animations, and reduced-motion styles
components/             Skills orbit, cursor, tilt effects, and shared UI
lib/versions.js         Framework versions displayed on the homepage
public/                 Images, project artwork, and technology icons
```

To make changes, start with the homepage links in `app/page.js`, the project list in `app/projects/page.js`, or the visual styles in `app/globals.css`.

---

<div align="center">
  <sub>Built by <a href="https://github.com/xKotelek">xKotelek</a> &middot; such a silly cat 🐈</sub>
  <br/><br/>
  <a href="https://discord.com/users/803159847641284640"><img src="https://img.shields.io/badge/Discord-0D0D0D?style=for-the-badge&amp;logo=discord&amp;logoColor=8B5CF6" alt="Discord" /></a>
  <a href="https://github.com/xKotelek"><img src="https://img.shields.io/badge/GitHub-0D0D0D?style=for-the-badge&amp;logo=github&amp;logoColor=8B5CF6" alt="GitHub" /></a>
</div>
