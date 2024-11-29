document.addEventListener("DOMContentLoaded", async () => {
    const sessionExists = await fetch("https://sjbportfolio.com/auth/checkAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    const response = await sessionExists.json();
    console.log(response);
    
    if (response.success === false) {
      return window.location.href = "/login";
    }
  });
  
  