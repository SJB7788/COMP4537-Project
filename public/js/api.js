const textArea = document.getElementById("summarize-text");
const summarizeButton = document.getElementById("summarize-button");

const resultP = document.getElementById("summarized-result");

const apiToken = await fetch("http://localhost:5500/auth/getUserToken", {
    method: "GET",
    credentials: "include",
});

async function sendSummarizeApiRequest() {
    console.log(textArea.textContent);
    
    const response = await fetch("https://44.223.10.16.nip.io/api/v1/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: apiToken, text: textArea.textContent}),
    });

    return await response.json();
}

summarizeButton.addEventListener("click", async () => {
    const jsonResult = await sendSummarizeApiRequest();
    console.log(jsonResult);
    
    resultP.textContent = jsonResult.summary;
});
