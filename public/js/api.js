import { Auth } from "./auth/authClass.js";

const textArea = document.getElementById("summarize-text");
const summarizeButton = document.getElementById("summarize-button");

const resultP = document.getElementById("summarized-result");

const response = await fetch("https://sjbportfolio.com/auth/getUserToken", {
    method: "GET",
    credentials: "include",
});

const apiToken = await response.json();

async function sendSummarizeApiRequest() {
    const response = await fetch("https://sjbportfolio.com/api/v1/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: apiToken.data, text: textArea.value}),
    });

    return await response.json();
}

summarizeButton.addEventListener("click", async () => {
    const jsonResult = await sendSummarizeApiRequest();
    console.log(jsonResult);
    
    resultP.textContent = jsonResult.summary;
});

const auth = new Auth("https://sjbportfolio.com");
const logoutA = document.getElementById("logout_a");
logoutA.addEventListener("click", async () => {
    const response = await auth.logoutUser();
    if (response === true) {
        window.location.href = "/login";
    }
});