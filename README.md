# console-hero

![npm version](https://img.shields.io/npm/v/console-hero)
![license](https://img.shields.io/npm/l/console-hero)
![downloads](https://img.shields.io/npm/dm/console-hero)

**console-hero** is an npm package designed to enhance developer productivity during the development phase. Unleash the power of AI in your browser console: fix runtime errors instantly, access cheat sheets effortlessly, and chat with Gemini AI — all directly in the console. Become the ultimate Console Hero!

---

## Table of Contents

- [Features](#features)
- [Demo (coming soon)](#demo)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [One Click React Vite Setup](#one-click-react-vite-setup)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Examples (coming soon)](#examples)
- [Dependencies](#dependencies)
- [FAQ](#faq)
- [Future Plans](#future-plans)
- [License](#license)

---

## Features

- **Quick and Simple Setup**: Get started in less than 20 seconds with minimal configuration.
- **Console Reminders**: Periodic console warnings to ensure the package is removed before deploying to production.
- **Toast Notifications**: Customizable toast reminders to prevent accidental production deployments with this package enabled.
- **AI-Powered Debugging**: Automatically detect and resolve errors using Google Gemini 1.5 Flash AI, with detailed solutions and related keyword suggestions.
- **Cheat Sheet Generator**: Generate detailed programming cheat sheets in a tabular format directly via an AI-powered prompt.
- **Custom Console Commands**: Use `/ai` for error help and `/cheat` for quick cheat sheet generation directly in your browser console.
- **AI-Assisted Error Boundary**: Wrap your React components with an error boundary that leverages AI to detect, explain, and resolve issues automatically.
- **Stateless AI Conversations**: Each chat with the AI starts fresh, with no message history stored or remembered. This ensures complete privacy and no data retention in your browser.
- **Gemini 1.5 Flash Free Tier Support**:
  - Up to **15 RPM (requests per minute)**
  - **1 million TPM (tokens per minute)**
  - **1,500 RPD (requests per day)**

---

## Installation

To use this package, you must have the following prerequisites:
1. A valid **Gemini API key**. You can obtain your API key from [here](https://aistudio.google.com/app/apikey).
2. **Node.js** version 14 or higher.

### Install via npm or yarn
Run the following command to install the package:
```bash
npm install console-hero
```
```bash
yarn add console-hero
```

---

## Quick Start

Follow these steps to get started with the package quickly:

### 1. Import the Package
Import the package into your project:

```javascript
import consoleHero from 'console-hero';
```
### 2. Initialize the Package
```javascript
consoleHero.init("<Your-Gemini-Api-Key>"); // Compulsory
```

That's it, you're good to go... you can now generate cheatsheets and access ai directly from your browser console.

### 3. Console Reminder 
```javascript
consoleHero.consoleRemind(300); // Will alert every 5 minutes
```

### 4. Toast Reminder 
```javascript
consoleHero.toastRemind(300); // Will alert every 5 minutes
```

### 5. AI Error Boundary 
```javascript
// In your src/main.jsx file 
// Rest of the code is same
import App from './App.jsx'

const WrappedApp = consoleHero.aiErrorSolution(App);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrappedApp />  // Replace <App> with wrapped component
  </StrictMode>,
```

---

## One Click React Vite Setup 

```javascript
// In your src/main.jsx file
import consoleHero from 'console-hero';


consoleHero.init("<Your-Gemini-Api-Key>");
consoleHero.toastRemind(300);

const WrappedApp = consoleHero.aiErrorSolution(App);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrappedApp />
  </StrictMode>,
)
```

---

## API Documentation

The following table provides detailed information about the core functions of the `console-hero` package, including their parameters, return types, and usage notes.

| **Function**              | **Description**                                                           | **Parameters**                                                                                                                                 | **Return Type** | **Notes**                                                                                               |
|---------------------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------------------------------------------------------------------------------------------|
| **`init(apiKey)`**        | Initializes the package with the Gemini API key.                          | `apiKey` (string): Your Gemini AI API key.                                                                                                   | `void`          | Must be called before using any other functions or commands.                                            |
| **`consoleRemind(delay)`** | Displays periodic console reminder messages to prevent production deployment.                | `delay` (number): Delay in seconds between reminders.                                 | `void`          | Ideal for avoiding accidental deployments to production by periodically reminding the user.                                                  |
| **`toastRemind(delay)`** | Displays periodic toast reminder notifications to prevent production deployment. | `delay` (number): Delay in seconds between reminders.  | `void`          | Leverages the `react-toastify` library for periodic toast notifications.                                        |
| **`aiErrorSolution(component)`** | Fetches an AI-powered solution for a runtime error in a React component.                  | `component` (React.Component): The React component where you want AI based Error Boundary (eg: App.jsx)                                                  | `string`        | Automatically detects runtime errors in the provided React component and returns a detailed explanation , location of the error, solution and keywords powered by Gemini AI.                                           |

---

## Usage

The `console-hero` package is designed to integrate seamlessly with your browser console. Below are the primary commands you can use:

### **1. Chat with AI**
Start a conversation with the AI directly in the console. Each interaction is stateless, meaning the AI doesn’t retain any context from previous messages.

**Input:**
```javascript
console.log("/ai <Your Prompt>");
```

### **2. Generate Cheat Sheets**
Create detailed cheat sheets for programming topics using the /cheat command. **No need to write detailed prompt**

**Input:**
```javascript
console.log("/cheat <Keywords>");
```

### **3. Clear Console**
Run the following command to clear the console:

**Input:**
```javascript
console.clear();
```

---

## Dependencies

This package relies on the following dependencies:  

- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (v0.21.0): Provides integration with Google Gemini AI for advanced error handling, cheat sheet generation, and AI-powered solutions.

- [chalk](https://www.npmjs.com/package/chalk) (v5.3.0): Enables console text styling, such as coloring and emphasis, for enhanced readability and interaction.  
- [react](https://www.npmjs.com/package/react) (v18.3.1): For creating and managing the user interface, specifically for React-based projects.  
- [react-toastify](https://www.npmjs.com/package/react-toastify) (v10.0.6): For rendering toast notifications in the browser.  

---

## FAQ

### **Q1: What is `console-hero`?**
`console-hero` is an npm package that enhances your browser console by integrating AI-powered features. It helps you debug errors, generate cheat sheets, and chat with AI directly in the console, improving your development productivity.

### **Q2: What are the requirements for using `console-hero`?**
To use `console-hero`, you need:
- A valid Gemini AI API key for the AI-powered features.
- A development environment that supports JavaScript and React.

### **Q3: Can I use `console-hero` in production?**
No, `console-hero` is designed strictly for development environments. It includes periodic reminders in the console to ensure you don't accidentally deploy it to production.

### **Q4: Does the AI store or retain my conversations?**
No, all conversations with the AI are stateless. Each command starts fresh, and no data is stored or remembered by the AI.

### **Q5: What happens if I don’t remove the package before deploying?**
If `console-hero` is left in your production build, it could expose your console commands to end-users and increase unnecessary API usage. The console warnings are there to prevent this.

### **Q6: Are there any rate limits for the AI features?**
Yes, the AI-powered features follow the rate limits of the Gemini AI API (Free Tier):
- **15 requests per minute (RPM)**
- **1 million tokens per minute (TPM)**
- **1,500 requests per day (RPD)**

### **Q7: Does `console-hero` work in all browsers?**
`console-hero` is optimized for modern browsers like Google Chrome, Firefox, and Edge. Compatibility with older or less common browsers is not guaranteed.

### **Q8: How do I report an issue or request a feature?**
You can report bugs or suggest features on the [GitHub issues page](https://github.com/DevanshYadav9323/console-hero/issues).

---

## Future Plans

We are continuously working to improve the `console-hero` package and make it even more valuable for developers. Here are some of the potential features we're exploring for future updates:

- Enhanced browser console functionality to streamline problem-solving and improve development workflows.
- New AI-powered commands to assist with code optimization and provide coding suggestions directly in the console.

Stay tuned for updates as we bring these exciting possibilities to life!

---

## About the Developer
`console-hero` was created by [Devansh Yadav](https://devanshyadav.com)

## License

This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and distribute this package, provided that proper attribution is given to the original author.  

