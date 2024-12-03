import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

let apiKey; // Global variable to store the API key

const init = (key) => {
  if (!key) {
    throw new Error('Please provide an API key for error solution functionality.');
  }
  apiKey = key;
};

const consoleRemind = (seconds) => {
  setInterval(() => {
    console.warn('console-hero is for development only. Remove before deploying to production.');
  }, seconds * 1000);
};


const toastRemind = (seconds) => {
  setInterval(() => {
    toast.warn('Remove console-hero before deploying to production', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }, seconds * 1000);
};

const aiPrompt = async (prompt) => {
  if (!apiKey) {
    console.warn('API key not initialized. Please call init()');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const response = await model.generateContent(prompt);
    console.log(chalk.bold.inverse(response.response.text()));
  } catch (error) {
    console.error('Error fetching AI response:', error);
  }
};

const aiCheatSheet = async (prompt) => {
  if (!apiKey) {
    console.warn('API key not initialized. Please call init()');
    return;
  }

  const cheatSheetPrompt = 
  "You are an AI assistant trained to act as a coding cheatsheet generator. " +
  "Your task is to provide precise, tabular answers with relevant coding options and techniques for various programming concepts of keywords requested only. " +
  "Use the following format for your responses:\n" +
  "1. Context and Explanation: Start by briefly explaining the concept for the keywords requested only, focusing on its relevance and core features.\n" +
  "2. Tabular Details: Generate a detailed table that outlines features, descriptions, and available options/techniques related to the topic. Ensure the table covers:\n" +
  "\t- Feature: The main feature or property of the topic.\n" +
  "\t- Description: A short brief explanation of what the feature does.\n" +
  "\t- Options/Techniques: Specific short and simple examples, values, or methods associated with the feature.\n" +
  "3. Source URLs: End the response with a URL section where users can find additional official documentation or resources related to the topic. If applicable, include multiple sources.\n\n" +
  "---\n\n" +
  "Example Format:\n" +
  "For the request: `/cheat css grid responsive`\n\n" +
  "CSS Grid's responsiveness is achieved primarily through media queries and the `fr` unit. Grid doesn't have specific 'responsive' properties.\n\n" +
  "| Feature              | Description                                       | Options/Techniques                                   |\n" +
  "|----------------------|---------------------------------------------------|-----------------------------------------------------|\n" +
  "| Media Queries    | Control layout based on screen size.             | @media (min-width: 768px) { ... }, etc.          |\n" +
  "| `fr` Unit        | Flexible unit, divides available space proportionally. | grid-template-columns: 1fr 2fr;                   |\n" +
  "| minmax()       | Define minimum and maximum sizes for grid tracks. | grid-template-columns: minmax(100px, 1fr);       |\n" +
  "| repeat()       | Repeat grid track definitions.                   | grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); |\n" +
  "| auto-fill / auto-fit | Automatically adjust column/row counts.          | Used with `repeat()` for dynamic column layouts.   |\n" +
  "| grid-auto-rows / grid-auto-columns | Automatically sized rows/columns. | Adjusts sizes for content that exceeds initial settings.|\n\n" +
  "Source URLs:\n" +
  "- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout\n" +
  "- https://css-tricks.com/snippets/css/complete-guide-grid/\n\n" +
  "---\n\n" +
  " Training Guidelines:\n" +
  "1. Use official documentation websites (e.g., MDN, W3Schools, or language-specific docs) as primary sources for accurate information.\n" +
  "2. Make the table comprehensive and concise, ensuring it provides practical examples and solutions.\n" +
  "3. Provide multiple source URLs for credibility and further exploration.\n" +
  "4. For ambiguous keywords, infer the most relevant context and clarify the scope in the explanation.\n\n" +
  "---\n\n" +
  "Ensure that the output adheres strictly to the format above and is helpful for developers seeking quick and practical reference material for programming, web development, or software engineering topics.";



  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const response = await model.generateContent(prompt + cheatSheetPrompt);
    console.log(chalk.bold.inverse(response.response.text()));
  } catch (error) {
    console.error('Error fetching AI response:', error);
  }
};

// Custom Console Listener (Basic Implementation)
const originalConsoleLog = console.log;

console.log = function (message) {
  if (typeof message === 'string' && message.startsWith('/ai ')) {
    const prompt = message.substring(4).trim();
    aiPrompt(prompt);
  } 
  else if (typeof message === 'string' && message.startsWith('/cheat ')) {
    const prompt = message.substring(4).trim();
    aiCheatSheet(prompt);
  }
  else {
    originalConsoleLog(message);
  }
};


const aiErrorSolution = (Component) => {
  return (props) => (
    <ErrorBoundary apiKey={apiKey}>
      <ToastContainer/>
      <Component {...props} />
      <ToastContainer/>
    </ErrorBoundary>
  );
};

const consoleHero = {
  init,
  consoleRemind,
  toastRemind,
  aiErrorSolution,
};

export default consoleHero;

