# Offline Image Tagging App

## 🖼️ Overview

This is an offline image annotation tool built with **Next.js**, **TypeScript**, **Node.js**, **Konva.js**, and **Bootstrap**. It allows users to draw bounding boxes on images and save the annotations locally in JSON format for later use in machine learning or data analysis workflows.

## ✨ Features

- 🖍️ Intuitive drawing of bounding boxes over images
- 💾 Annotations saved as `.json` files with matching image names
- 🔒 Fully offline – no internet connection required
- 🧠 Labels include both a unique identifier and a category using the format: `uniqueValue¿label`

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Konva.js](https://konvajs.org/)
- [Bootstrap](https://getbootstrap.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

```bash
# Clone the repository
git clone https://github.com/TarsisViana/image-tagging-tool.git
cd image-tagging-tool

# Install dependencies
npm install

# Run the development server
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser to start using the tool.

## 📂 Usage

1. Add your images to the appropriate directory (e.g., `public/images`).
2. Open the app in your browser.
3. Select the image you want to annotate.
4. Draw bounding boxes on the image canvas.
5. Enter a `uniqueValue` and a `label` for each bounding box.
6. Click save — a `.json` file will be generated containing all annotations for that image.

### 🧾 Annotation Format

Each annotation is saved in a JSON array with the following structure:

```json
[
  {
    "xMin": 225,
    "yMin": 124,
    "xMax": 405,
    "yMax": 304,
    "label": "uniqueValue¿label"
  }
]
