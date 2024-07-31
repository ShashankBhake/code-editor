import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "./App.css"; // Import your CSS file for styling
import axios from "axios";

export default function App() {
    const [leftEditorValue, setLeftEditorValue] = useState(
        "console.log('hello world!');"
    );
    const [rightEditorValue, setRightEditorValue] = useState("");
    const [theme, setTheme] = useState("light"); // Initial theme
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const onLeftEditorChange = (newValue, viewUpdate) => {
        // console.log("Left editor value:", newValue);
        setLeftEditorValue(newValue);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        if (theme === "dark") {
            document.body.classList.remove('dark-theme');
        }
        else {
            document.body.classList.add('dark-theme');
        }
        setTheme(newTheme);
        // document.documentElement.className = newTheme; // Apply the theme to the root element of the document
    };

    const processTextAndUpdateRightEditor = async () => {
        setIsLoading(true); // Set loading state to true
        console.log("Processing text...");

        try {
            // Replace 'your-query' with the actual query you want to send
            const query = leftEditorValue + ", fix this code, just send the code";
            console.log(leftEditorValue);

            // Make a GET request to your backend
            const res = await axios.get(
                `https://code-master.up.railway.app/getGeminiResponse?query=${query}`,
            );

            // const res = await axios.get(
            //     `${process.env.NODE_ENV === 'development' ? 'http://localhost:5005' : ''}/getOpenAIResponse?query=${query}`
            // );

            // Update the state with the response
            setRightEditorValue(res.data);
            setIsLoading(false); // Set loading state to false
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <div id="app-container" className={`code-mirror-app ${theme}`}>
            <div className="header">
                <div class="logo">
                    <h2>CodeMaster</h2>
                </div>
                {/* <button className="theme-switch-button" onClick={toggleTheme}>
                    Toggle Theme
                </button> */}

                <label class="theme-switch-button" >
                    <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                    <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
                    <input type="checkbox" class="input" onClick={toggleTheme} />
                    <span class="slider"></span>
                </label>

            </div>
            <div className="code-mirror-container">
                <CodeMirror
                    value={leftEditorValue}
                    height="750px"
                    theme={theme}
                    extensions={[javascript({ jsx: true })]}
                    onChange={onLeftEditorChange}
                    className="code-mirror"
                />
                <CodeMirror
                    value={rightEditorValue}
                    height="750px"
                    theme={theme}
                    extensions={[javascript({ jsx: true })]}
                    className="code-mirror"
                />
            </div>
            <div className="footer">
                {isLoading ? (
                    <div class="loader">
                        <div class="loader__circle"></div>
                        <div class="loader__circle"></div>
                        <div class="loader__circle"></div>
                        <div class="loader__circle"></div>
                    </div>
                ) : (
                    <div className="submit-button-container">
                        <button className="submit-button" onClick={processTextAndUpdateRightEditor}>
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            fill="currentColor"
                                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <span>Send</span>
                        </button>
                    </div>
                )
                }
            </div>
        </div>
    );
}
