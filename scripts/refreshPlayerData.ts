import {TarkovDatabase} from "../src/TarkovDatabase";

require('dotenv').config();

/*
* Lets plan the best way to actually pull all this data and record it long-term.
*
* Most of this data can change, so I want to be able to track these changes easily. Therefore, each 'Profile' data with saved info
* should also have a primary key indicating when it was logged. However, I dont want to use a timestamp as a primary key if i can avoid it
* Instead, I should create another table that manages 'refresh sessions'. Aka, whenever a refresh is done and profile data gathered, a new
* record is created here. this record will have a timestamp and create a new integer primary key. This integer primary key will be used as a
* primary key in the profile data tables, along with profile data.
*
* SO ACTUALLY, this table should include the profile we are refreshing as well. We will never grab 2 profiles at the exact same time, so they will need their own refresh iDs
* */



async function main() {

    // Our ONLY GOAL with this script is to refresh the 'core' data that we hopefully don't need to access that often
    await TarkovDatabase.initialize();
    console.log('Initialized');

    //let search = await TarkovDatabase.searchProfile('charactero');
    //console.table(search);

    let profile = await TarkovDatabase.refreshProfile(7109532)
    console.log(profile);
}

main().then(() => {
    console.log('Done!');
}).catch((e) => {
    console.error(e);
})
