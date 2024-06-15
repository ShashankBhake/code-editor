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
    const [theme, setTheme] = useState("dark"); // Initial theme

    const onLeftEditorChange = (newValue, viewUpdate) => {
        // console.log("Left editor value:", newValue);
        setLeftEditorValue(newValue);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.getElementById("app-container").className = newTheme;
    };

    const processTextAndUpdateRightEditor = async () => {
        console.log("Processing text...");

        try {
            // Replace 'your-query' with the actual query you want to send
            const query = leftEditorValue + ", fix this code, just send the code";
            console.log(leftEditorValue);

            // Make a GET request to your backend
            const res = await axios.get(
                `https://getgeminiresponse.vercel.app/getOpenAIResponse?query=${query}`
            );

            // Update the state with the response
            setRightEditorValue(res.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div id="app-container" className={`code-mirror-app ${theme}`}>
            <div className="header">
                <h2>CodeEnhancer</h2>
                <button className="theme-switch-button" onClick={toggleTheme}>
                    Toggle Theme
                </button>
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
            <div className="submit-button-container">
                <button
                    className="submit-button"
                    onClick={processTextAndUpdateRightEditor}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
