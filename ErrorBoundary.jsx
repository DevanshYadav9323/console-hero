import React, { Component } from 'react';
import chalk from 'chalk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    // Check if API key is initialized
    if (!this.props.apiKey) {
      console.warn('Error solution functionality is not initialized. Please call init()');
      return;
    }

    const errorBoundaryPrompt =
    "You are an AI assistant specialized in debugging JavaScript and React applications. " +
    "When an error message and stack trace are provided, your task is to return debugging details, " +
    "a concise explanation, a solution, and a list of keywords to help remember the error in the future. " +
    "Use the following format:\n\n" +
  
    "1. Component Name: Mention the component name where the error occurred.\n" +
    "   - Represent its location as a simple flowchart (parent-to-child hierarchy). " +
    "Example: 'App → Header → Navbar'.\n\n" +
  
    "2. Error Line Location: Provide the exact file name and line number where the error occurred. " +
    "Example: 'Location: /src/components/Navbar.jsx, Line: 25'.\n\n" +
  
    "3. Explanation: Provide a short explanation of why this error occurred. " +
    "Mention any relevant React or JavaScript concepts (e.g., hooks, props, lifecycle methods, or syntax issues).\n\n" +
  
    "4. Solution: Provide the exact steps or code to resolve the issue. " +
    "Keep the solution clear and concise.\n\n" +
  
    "5. Keywords for Future Reference: List keywords or phrases related to this error " +
    "that developers can use to identify or prevent the same type of error in the future. " +
    "Example: 'React hooks, useState error, missing dependency, prop drilling'.\n\n" +
  
    "Respond in this format:\n\n" +
  
    "****************************************\n\n" +
    `Error Message: ${error.message}\n\n` +
    "Component Name: App → Header → Navbar\n\n" +
    "Location: /src/components/Navbar.jsx, Line: 25\n\n" +
    "Explanation: [Provide the explanation here]\n\n" +
    "Solution: [Provide the solution here]\n\n" +
    "Keywords for Future Reference: [List keywords or phrases here]\n\n" +
  
    "****************************************\n\n" +
    "Additional Notes:\n" +
    "1. If no specific file or line is provided in the stack trace, indicate 'Location: Not available'.\n" +
    "2. If the error is due to missing dependencies or incorrect imports, include a solution like " +
    "'Check if module X is installed: `npm install X`'.\n" +
    "3. For syntax errors, mention the exact incorrect syntax and provide the corrected syntax.\n" +
    "4. Avoid repeating the error message in the solution.\n" +
    "5. Provide only relevant debugging steps for JavaScript or React errors.\n\n" +
  
    "Ensure the response is developer-friendly and follows this structure precisely.";
  

    // old prompt = Please provide a clear and concise solution or explanation give short answer no sentences only answers. Also give the component name (I want the component location to be in the form of flow chart ) and location of line at which the error occured (in new line)
    // Send error to Google Gemini AI for solution
    const genAI = new GoogleGenerativeAI(this.props.apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Here's an error message: ${error.message} + ${errorInfo.componentStack}.` + errorBoundaryPrompt;

    model.generateContent(prompt)
      .then(result => {
        console.log(errorInfo);
        console.log(chalk.green.bold.inverse(result.response.text()));
      })
      .catch(error => {
        console.error("Error fetching AI solution:", error);
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary-container">
          <h2 className="error-boundary-header">Oops! Something went wrong.</h2>
          <p className="error-boundary-message">{this.state.error.message}</p>
          <p className="error-boundary-note">
            Please check the console for AI-generated solutions or reload the page.
          </p>
          <button
            className="error-boundary-button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;