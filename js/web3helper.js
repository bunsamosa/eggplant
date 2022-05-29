// start moralis sdk
const serverUrl = "https://pjsctz5bkqjc.usemoralis.com:2053/server";
const appId = "TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm";
Moralis.start({ serverUrl, appId });

// check if user is logged in
let user = Moralis.User.current();
var address, ipfsHash;

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
    console.log("Read egg balance:", balance);
    document.getElementById("eg_balance").innerHTML = balance + "🥚";

    // read farm data
    eggFarm();
}

// fetch egg farm data from IPFS
async function eggFarm() {
    options.functionName = "eggfarm";
    let result = await Moralis.executeFunction(options);
    const eggfarm = result.toString();
    console.log("Read eggfarm hash: ", eggfarm);
}

const placesData = [
    {
        "lat": "12.9721",
        "long": "77.5933",
        "type": "Event",
        "name": "Warpspeed Hackathon"
    }
]

// upload data to IPFS and update contract
async function uploadData() {
    const file = new Moralis.File("eggplant_places.json", {
        base64: btoa(JSON.stringify(placesData)),
    });
    await file.saveIPFS();
    let file_hash = file.hash();
    console.log("Uploaded to IPFS:", file_hash);

    options.functionName = "addhen";
    options.params = {
        hen: file_hash
    };
    let result = await Moralis.executeFunction(options);
    console.log("Updated contract:", result.hash);
    ipfsHash = file_hash;
}
