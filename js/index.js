// check if user is logged in
const serverUrl = "https://pjsctz5bkqjc.usemoralis.com:2053/server";
const appId = "TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();
if (user) {
    console.log("logged in user:", user);
    console.log(user.get("ethAddress"));
    // document.getElementById("login").style.display = "none";
    // document.getElementById("logout").style.display = "block";
    window.location.href = "eggsplore.html";
}
