import {TarkovDatabase} from "../src/TarkovDatabase";

require('dotenv').config();

async function main() {

    // Our ONLY GOAL with this script is to refresh the 'core' data that we hopefully don't need to access that often
    await TarkovDatabase.initialize();
    console.log('Initialized');

    await TarkovDatabase.refreshCoreData();

}

main().then(() => {
    console.log('Done!');
}).catch((e) => {
    console.error(e);
})
