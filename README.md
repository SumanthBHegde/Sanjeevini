# Sanjeevini
<div align="center">
  <br />
    <a href="https://sanjeevini-zeta.vercel.app/" target="_blank">
      <img src="https://raw.githubusercontent.com/SumanthBHegde/Sanjeevini/main/public/sanjivini_hero.webp" alt="Sanjeevini Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=react&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Sanity-black?style=for-the-badge&logoColor=white&logo=sanity&color=F03E2F" alt="sanity" />
  </div>

<h3 align="center">Medicinal Plants Directory Platform</h3>

   <div align="center">
     Sanjeevini: A comprehensive platform for cataloging, exploring, and learning about medicinal plants
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🚀 [Development](#development)

## <a name="introduction">🤖 Introduction</a>

Sanjeevini is a Next.js 15 platform dedicated to medicinal plants and their properties. It provides a comprehensive directory where users can browse, search, and learn about various medicinal plants, their cultivation techniques, and medicinal uses. The platform also allows authorized users to submit new plant entries and request editor privileges.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 15
- Sanity
- TailwindCSS
- ShadCN UI
- TypeScript
- NextAuth for authentication

## <a name="features">🔋 Features</a>

👉 **Plant Directory**: Browse and search for medicinal plants with detailed information including scientific names, properties, and uses.

👉 **Authentication System**: User registration and login with role-based access control.

👉 **Plant Submission**: Authorized users can submit new plant entries with comprehensive details.

👉 **Admin Approval System**: Submitted plants require admin approval before being published.

👉 **Markdown Support**: Detailed plant descriptions with rich markdown formatting.

👉 **Cultivation Guides**: Information on how to grow and maintain medicinal plants.

👉 **Medicinal Uses**: Detailed information about traditional and modern medicinal applications.

👉 **Editor Request System**: Users can apply to become editors with special privileges.

👉 **Responsive Design**: Mobile-friendly interface that works across all devices.

👉 **Featured Plants**: Highlights important or newly added medicinal plants on the homepage.

👉 **Plant Categories**: Browse plants by different categories and classifications.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

1. Clone the repository:

```bash
git clone <repository-url>
cd sanjeevini
```

2. Install the project dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root of your project and add the necessary configuration:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

# Authentication
AUTH_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Email (for notifications)
EMAIL_SERVER=
EMAIL_FROM=
```

4. Running the project:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="development">🚀 Development</a>

### Sanity Studio

The project includes Sanity Studio for content management. To access the Studio:

1. Run the development server:

```bash
npm run dev
```

2. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) in your browser.

3. Log in with your Sanity credentials to manage content.

### Content Schema

The project uses custom Sanity schemas for plants, authors, and other content types. The schema files are located in the `sanity/schemaTypes` directory.

### Authentication

The project uses NextAuth for authentication with different user roles:

- **Users**: Can browse plants and request editor privileges
- **Editors**: Can submit new plant entries
- **Admins**: Can approve plant submissions and manage editors
