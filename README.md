<p>&nbsp;</p>
<h1 align="center">Offline Image Tagging app</h1>
<p>&nbsp;</p>

## 📖 Description

Offline tagging app built with Next.js, Typescript, Node.js, Konva.js and Bootstrap. The app reads and writes to files on your local machine.

The tags are saved in a array on a .json file with the same name as the image the tags are from.

The label is joined from the 2 parts: a label common to multiple files and a uniqueValue.

Exemple:
```js
[{
    "xMin":225,
    "yMin":124,
    "xMax":405,
    "yMax":304,
    "label":"uniqueValue¿label",
}]
```

## 💡 Features

- **User Authentication**: Register, login,  and manage sessions.
- **User Information handler**: Update user informations.
- **Advertisement Management**: Create, update, delete, and view advertisements.
- **Database Integration**: Built using Prisma ORM for database management.

## 🔨 Tools

- **Node.js**: JavaScript runtime for server-side logic.
- **NextJs**: Framework for building the App.
- **KonvaJs**: Library for the canvas interactivity.
- **Bootstrap**: Frontend Toolkit for styling.

## ⚙️ Setup

### Installation

- **Clone the repository:**

   ```bash
   git clone https://github.com/Jaoovit/marketplace-api.git
   
   cd marketplace-api
1. Update the name of the .env_template to .env

2. Define .env variable:

    - Folder path you want to work on NEXT_PUBLIC_DEFAULT_DIR=

## 🏃‍➡️ Start

- **Run commands:**

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.