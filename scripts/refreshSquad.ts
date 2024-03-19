import {TarkovDatabase} from "../src/TarkovDatabase";

require('dotenv').config();

async function main() {

    // Our ONLY GOAL with this script is to refresh the 'core' data that we hopefully don't need to access that often
    await TarkovDatabase.initialize();
    console.log('Initialized');

    let search = await TarkovDatabase.searchProfile('charactero');
    console.table(search);

    let profile = await TarkovDatabase.refreshProfile(Number.parseInt(search[0].aid))
    console.log(profile);
}

main().then(() => {
    console.log('Done!');
}).catch((e) => {
    console.error(e);
})
