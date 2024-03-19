import {TarkovDatabase, TarkovProfileManualRequest} from "../src/TarkovDatabase";

require('dotenv').config();

async function main() {
    await TarkovDatabase.initialize();

    if (process.argv.length < 3)
        throw new Error('Please provide a substring to search for in the profile name');

    const textSubstring = process.argv[2];
    const profiles = await TarkovDatabase.searchProfile(textSubstring);
    for(let profile of profiles) {
        let rq = new TarkovProfileManualRequest(Number.parseInt(profile.aid));
        await TarkovDatabase.TarkovDB.getRepository(TarkovProfileManualRequest).save(rq);
    }
    return profiles;
}


main().then((profiles) => {
    console.log(`Queued ${profiles.length} profiles with substring ${process.argv[2]} for manual refresh`);
    process.exit(0);
}).catch((e) => {
    console.error(e)
});
