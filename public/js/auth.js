document.addEventListener("DOMContentLoaded", async () => {
  const sessionExists = await fetch("https://sjbportfolio.com/auth/checkSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const response = await sessionExists.json();
  
  if (response.success === false) {
    return window.location.href = "/login";
  }
});

