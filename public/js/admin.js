const userTable = document.getElementById("user_table");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:5500/auth/getAllUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const allUsers = data.data;
  console.log(allUsers);
  renderUsers(allUsers);
});

function renderUsers(users) {
  users.forEach((user) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const tdDetails = document.createElement("td");

    td1.textContent = user.first_name;
    td2.textContent = user.last_name;
    td3.textContent = user.email;
    td4.textContent = user.api_total_call;
    tdDetails.innerHTML = `<a href='/details?user=${user._id}'>Details</a>`;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(tdDetails);

    userTable.appendChild(tr);
  });
}
