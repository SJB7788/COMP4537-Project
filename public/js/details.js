const memberTitle = document.getElementById("api_title");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user");

document.addEventListener("DOMContentLoaded", async () => {
  const userResponse = await fetch(
    `http://localhost:5500/auth/getUserDetails?user=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const apiCallsResponse = await fetch(
    `http://localhost:5500/auth/getUserApiCalls?user=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const userData = await userResponse.json();
  const userDetails = JSON.parse(userData.data);
  
  memberTitle.textContent = `${userDetails.first_name}'s API Calls`;

  const apiCallsData = await apiCallsResponse.json();
  const apiCalls = apiCallsData.data;
  console.log(apiCalls);
  
  renderApiCalls(apiCalls);
});

class ViewAPICall {
    constructor(container) {
        this.container = container;
        this.totalUsage = 0;
    }

    createAPIView(id, requestType, apiContent) {
        const trContainer = document.createElement("tr");
        trContainer.innerHTML = `
            <td>${id}</td>
            <td>${requestType}</td>
            <td>${apiContent}</td>
        `;
        this.container.appendChild(trContainer);
        this.totalUsage++;
    }
}

const apiCount = document.getElementById("api_count");
const container = document.getElementById("api__table");
const viewApiCall = new ViewAPICall(container);
function renderApiCalls(apiCalls) {
  const apiCount = document.getElementById("api_count");
  const container = document.getElementById("api__table");
  const viewApiCall = new ViewAPICall(container);

  apiCount.textContent = `Total API Count: ${apiCalls.length}/20`;

  if (apiCalls.length > 0) {
    apiCalls.forEach((apiCall) => {
      viewApiCall.createAPIView(
        apiCall.api_call_id,
        apiCall.request_type,
        apiCall.request_string
      );
    });
  }
}
