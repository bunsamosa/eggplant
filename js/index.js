const serverUrl = "https://pjsctz5bkqjc.usemoralis.com:2053/server";
const appId = "TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm";
Moralis.start({ serverUrl, appId });

// Moralis Logout
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

// Open AR page
function openAR() {
    window.location.href = "ar.html";
}

// Open maps page
function openMap() {
    window.location.href = "eggsplore.html";
}
