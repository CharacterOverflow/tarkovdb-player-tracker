import {TarkovDatabase} from "../src/TarkovDatabase";

require('dotenv').config();

async function main() {
    await TarkovDatabase.initialize();

    await tick()

    // tick every 15 seconds - long term!
    let intervalHandle = setInterval(tick, 1000 * 15);




}

async function tick() {
    let r;
    try {
        r = await TarkovDatabase.getNextRequest();
        if (r) {
            console.log('Processing request: refreshing ' + r.aid);
            let instance = await TarkovDatabase.refreshProfile(r.aid);
            if (r.isScheduled && !r.rid) {
                await TarkovDatabase.updateScheduledRequest(r.aid)
            } else {
                await TarkovDatabase.updateManualRequest(r.rid, instance.iid)
            }
        } else {
            console.log('No requests to process as of ' + new Date().toISOString());
        }
    } catch (e) {
        console.log(e);
        if (r?.rid) {
            await TarkovDatabase.updateManualRequestFailed(r.rid);
            console.log(`Marked request ${r.rid} (${r.aid}) as failed`)
        } else {
            console.log('Error processing request, will try again in 15 seconds');
        }
    }
}

main().then(() => {
    console.log('Profile scanner started...');
}).catch((e) => {
    console.error(e)
});
