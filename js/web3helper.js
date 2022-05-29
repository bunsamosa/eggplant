// start moralis sdk
const serverUrl = "https://pjsctz5bkqjc.usemoralis.com:2053/server";
const appId = "TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm";
Moralis.start({ serverUrl, appId });

// check if user is logged in
let user = Moralis.User.current();
var address;
if (!user) {
    window.location.href = "index.html";
}
else {
    console.log("logged in user:", user);
    address = user.get("ethAddress");
    console.log(address);
}

// Moralis Logout
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    window.location.href = "index.html";
}

// contract data - address, chain and ABI
const contract_data = {
    "contract_address": "0xdab0d83193b8699dfaf2f1431986c69d1fcf8d4f",
    "chain": "mumbai",
    "ABI": [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "hen",
                    "type": "string"
                }
            ],
            "name": "addhen",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "eggbalance",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "int256",
                    "name": "eggs",
                    "type": "int256"
                }
            ],
            "name": "eggdrop",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "eggfarm",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}

// contract execution options
var options = {
    contractAddress: contract_data.contract_address,
    functionName: "",
    abi: contract_data.ABI,
    params: {},
};

// fetch balance
async function getBalance() {
    await Moralis.enableWeb3();
    options.functionName = "eggbalance";
    options.params = {
        addr: address
    }
    let result = await Moralis.executeFunction(options);
    const balance = result.toString();
    document.getElementById("eg_balance").innerHTML = balance + "🥚";
}
