const textArea = document.getElementById("summarize-text");
const summarizeButton = document.getElementById("summarize-button");

const resultP = document.getElementById("summarized-result");

const response = await fetch("https://sjbportfolio.com/auth/getUserToken", {
    method: "GET",
    credentials: "include",
});

const apiToken = await response.json();

async function sendSummarizeApiRequest() {
    console.log(textArea.textContent);
    
    const response = await fetch("https://sjbportfolio.com/api/v1/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: apiToken.data, text: textArea.textContent}),
    });

    return await response.json();
}

summarizeButton.addEventListener("click", async () => {
    const jsonResult = await sendSummarizeApiRequest();
    resultP.textContent = jsonResult.summary;
});
