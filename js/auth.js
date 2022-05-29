/* Metamask authentication code */
async function metamaskLogin() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({
            signingMessage: "Log in to Eggplant",
            chainId: 80001
        })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
                window.location.href = "eggsplore.html";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        window.location.href = "eggsplore.html";
    }
}

/* Walletconnect authentication */
async function walletconnectLogin() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({
            provider: "walletconnect",
            signingMessage: "Log in to Eggplant",
            chainId: 80001
        })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
                window.location.href = "eggsplore.html";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        window.location.href = "eggsplore.html";
    }
}
