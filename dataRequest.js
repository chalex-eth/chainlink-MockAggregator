import fetch from 'node-fetch';
import ethers, { BigNumber } from "ethers";
import fs from "fs";
import { toBn } from "evm-bn";

const myArgs = process.argv.slice(2);
const asset = myArgs[0];
const res = await fetch("https://api.coingecko.com/api/v3/coins/" + asset + "/market_chart?vs_currency=usd&days=365&interval=daily");
const data = await res.json();

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}

let prices = [];
for (var i = 0; i < data["prices"].length; i++) {
    let p = toBn(String(toFixed(data["prices"][i][1])));
    prices.push(p);
}

let timestamp = [];
for (var i = 0; i < data["prices"].length; i++) {
    let p = String(toFixed(data["prices"][i][0]));
    timestamp.push(p);
}

const dataPathPrice = process.cwd() + "/" + asset + "_prices.txt";
const encodedDataPrice = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [prices]);
fs.writeFile(dataPathPrice, encodedDataPrice, err => {
    if (err) {
        console.error(err)
        return
    }
});

const dataPathTimestamp = process.cwd() + "/" + asset + "_timestamp.txt";
const encodedDataTimestamp = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [timestamp]);
fs.writeFile(dataPathTimestamp, encodedDataTimestamp, err => {
    if (err) {
        console.error(err)
        return
    }
});

