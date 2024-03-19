import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('tarkov_trader')
export class TarkovTrader {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
    normalizedName: string

    @Column()
    description: string

    @Column('timestamp without time zone')
    resetTime: Date

    @Column()
    currency: string

    @Column()
    discount: number

    @Column()
    imageLink: string

    @Column()
    image4xLink: string

    levels: TarkovTraderLevel[] = []
    barters: TarkovTraderBarter[] = []
    cashOffers: TarkovTraderCashOffer[] = []

    constructor(data: any) {
        if (data) {
            this.id = data.id
            this.name = data?.normalizedName ?? data?.name
            this.description = data.description
            this.resetTime = data.resetTime
            this.currency = data.currency?.id
            this.discount = data.discount
            this.imageLink = data.imageLink
            this.image4xLink = data.image4xLink
            for (let level of data.levels) {
                this.levels.push(new TarkovTraderLevel(this.id, level))
            }
            for (let barter of data.barters) {
                this.barters.push(new TarkovTraderBarter(this.id, barter))
            }
            for (let i = 0; i < data.cashOffers.length; i++) {
                this.cashOffers.push(new TarkovTraderCashOffer(this.id, i, data.cashOffers[i]))
            }
        }
    }

}

@Entity('tarkov_trader_barter')
export class TarkovTraderBarter {
    @PrimaryColumn()
    tid: string

    @PrimaryColumn({type: 'integer', name: 'barter_idx'})
    bid: number

    @Column({type: 'integer'})
    level: number

    @Column({ name: 'task_id', nullable: true})
    taskId: string

    requirements: TarkovTraderBarterRequirement[] = []
    rewards: TarkovTraderBarterRequirement[] = []

    constructor(tid: string, barter: any) {
        if (barter) {
            this.tid = tid;
            this.level = barter.level;
            this.taskId = barter.taskUnlock?.id ?? barter.taskUnlock;
            for(let i = 0; i < barter.requiredItems.length; i++) {
                this.requirements.push(new TarkovTraderBarterRequirement(tid, i, false, barter.requiredItems[i]))
            }
            for(let i = 0; i < barter.rewardItems.length; i++) {
                this.rewards.push(new TarkovTraderBarterRequirement(tid, i, true, barter.rewardItems[i]))
            }
        }
    }

}

@Entity('tarkov_trader_barter_requirement')
export class TarkovTraderBarterRequirement {

    @PrimaryColumn()
    tid: string

    @PrimaryColumn()
    bid: number

    @PrimaryColumn()
    item: string;

    @PrimaryColumn()
    isReward: boolean;

    @PrimaryGeneratedColumn('increment')
    idx: number

    @Column({type: 'integer'})
    quantity: number;

    constructor(tid: string, idx: number, isReward: boolean, data: any) {
        if (data) {
            this.tid = tid;
            this.bid = idx;
            this.item = data.item.id;
            this.isReward = isReward;
            this.quantity = data.quantity;
        }
    }


}

@Entity('tarkov_trader_cash_offer')
export class TarkovTraderCashOffer {
    @PrimaryColumn()
    tid: string

    @PrimaryColumn()
    cid: number

    @PrimaryColumn()
    item: string

    @Column({ name: 'currency_item'})
    currencyItem: string

    @Column({name: 'task_unlock', nullable: true})
    taskUnlock: string;

    @Column({type: 'integer', name: 'price'})
    price: number

    constructor(tid: string, cid: number, data: any) {
        if (data) {
            this.tid = tid;
            this.cid = cid;
            this.item = data.item.id;
            this.currencyItem = data.currencyItem.id;
            this.taskUnlock = data.taskUnlock?.id ?? data.taskUnlock;
            this.price = data.price;
        }
    }

}

@Entity('tarkov_trader_level')
export class TarkovTraderLevel {
    @PrimaryColumn()
    tid: string;

    @PrimaryColumn({type: 'integer'})
    level: number;

    @Column({type: 'integer', name: 'required_player_level'})
    requiredPlayerLevel: number;

    @Column({type: 'float', name: 'required_reputation'})
    requiredReputation: number;

    @Column({type: 'integer', name: 'required_commerce'})
    requiredCommerce: number;

    constructor(tid: string, data: any) {
        if (data) {
            this.tid = tid;
            this.level = data.level
            this.requiredPlayerLevel = data.requiredPlayerLevel
            this.requiredReputation = data.requiredReputation
            this.requiredCommerce = data.requiredCommerce
        }
    }

}


@Entity()
export class TarkovAchievement {
    @PrimaryColumn()
    id: string

    @Column({type: "timestamp without time zone", name: 'last_updated'})
    lastUpdated: Date

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    hidden: boolean

    @Column({nullable: false, type: 'float', name: 'players_completed_percent'})
    playersCompletedPercent: number

    @Column({nullable: false, type: 'float', name: 'adjusted_players_completed_percent'})
    adjustedPlayersCompletedPercent: number

    @Column({nullable: false})
    side: string

    @Column({nullable: false})
    rarity: string

    normalizedSide?: string

    normalizedRarity?: string

    constructor(data: Partial<TarkovAchievement>) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.hidden = data.hidden;
            this.playersCompletedPercent = data.playersCompletedPercent;
            this.adjustedPlayersCompletedPercent = data.adjustedPlayersCompletedPercent;
            this.side = data.normalizedSide;
            this.rarity = data.normalizedRarity;
            this.normalizedSide = data.normalizedSide;
            this.normalizedRarity = data.normalizedRarity;
            this.lastUpdated = new Date();
        }
    }

}

@Entity('tarkov_item')
export class TarkovItem {

    @PrimaryColumn()
    id: string

    @Column({nullable: true})
    category: string

    @Column()
    name: string

    @Column({name: 'normalized_name'})
    normalizedName: string

    @Column({name: 'short_name', nullable: true})
    shortName: string

    @Column({nullable: true})
    description: string

    @Column('timestamp without time zone')
    updated: Date

    @Column('timestamp without time zone')
    cached: Date

    @Column({name: 'base_price', type: 'integer'})
    basePrice: number

    @Column({type: 'integer'})
    width: number

    @Column({type: 'integer'})
    height: number

    @Column({type: 'varchar', length: 512, name: 'icon_link'})
    iconLink: string

    @Column({type: 'varchar', length: 512, name: 'grid_image_link'})
    gridImageLink: string

    @Column({type: 'varchar', length: 512, name: 'base_image_link'})
    baseImageLink: string

    @Column({type: 'varchar', length: 512, name: 'inspect_image_link'})
    inspectImageLink: string

    @Column({type: 'varchar', length: 512, name: 'image_512px_link'})
    image512pxLink: string

    @Column({type: 'varchar', length: 512, name: 'image_8x_link'})
    image8xLink: string

    @Column({type: 'varchar', length: 512, name: 'wiki_link'})
    wikiLink: string

    @Column({type: 'simple-array', nullable: true})
    types: string[]

    @Column({type: 'integer', name: 'avg_24h_price', nullable: true})
    avg24hPrice: number

    @Column({type: 'integer', name: 'last_low_price', nullable: true})
    lastLowPrice: number

    @Column({type: 'integer', name: 'low_24h_price', nullable: true})
    low24hPrice: number

    @Column({type: 'integer', name: 'high_24h_price', nullable: true})
    high24hPrice: number

    @Column({type: 'integer', name: 'change_last_48h', nullable: true})
    changeLast48h: number

    @Column({type: 'float', name: 'change_last_48h_percent', nullable: true})
    changeLast48hPercent: number

    @Column({type: 'integer', name: 'last_offer_count', nullable: true})
    lastOfferCount: number

    @Column({type: 'float', name: 'accuracy_modifier', nullable: true})
    accuracyModifier: number

    @Column({type: 'float', name: 'recoil_modifier', nullable: true})
    recoilModifier: number

    @Column({type: 'float', name: 'ergonomics_modifier', nullable: true})
    ergonomicsModifier: number

    @Column({type: 'float', nullable: true})
    weight: number

    @Column({type: 'float', nullable: true})
    velocity: number

    @Column({type: 'integer', nullable: true})
    loudness: number

    constructor(data: any) {
        if (data) {
            this.id = data.id
            this.category = data.category?.id
            this.name = data.name
            this.normalizedName = data.normalizedName
            this.shortName = data.shortName
            this.description = data.description
            this.updated = data.updated
            this.basePrice = data.basePrice
            this.width = data.width
            this.height = data.height
            this.iconLink = data.iconLink
            this.gridImageLink = data.gridImageLink
            this.baseImageLink = data.baseImageLink
            this.inspectImageLink = data.inspectImageLink
            this.image512pxLink = data.image512pxLink
            this.image8xLink = data.image8xLink
            this.wikiLink = data.wikiLink
            this.types = data.types
            this.avg24hPrice = data.avg24hPrice
            this.lastLowPrice = data.lastLowPrice
            this.low24hPrice = data.low24hPrice
            this.high24hPrice = data.high24hPrice
            this.changeLast48h = data.changeLast48h
            this.changeLast48hPercent = data.changeLast48hPercent
            this.lastOfferCount = data.lastOfferCount
            this.accuracyModifier = data.accuracyModifier
            this.recoilModifier = data.recoilModifier
            this.ergonomicsModifier = data.ergonomicsModifier
            this.weight = data.weight
            this.velocity = data.velocity
            this.loudness = data.loudness
            this.cached = new Date()
        }
    }

}

@Entity('tarkov_task')
export class TarkovTask {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({name: 'normalized_name'})
    normalizedName: string

    @Column({nullable: false})
    trader: string

    @Column({nullable: true})
    map: string

    @Column({type: 'integer', nullable: true})
    experience: number

    @Column({nullable: true, name: 'wiki_link'})
    wikiLink: string

    @Column({nullable: true, name: 'task_image_link'})
    taskImageLink: string

    @Column({nullable: true, name: 'min_player_level', type: 'integer'})
    minPlayerLevel: number

    @Column({type: 'simple-array', nullable: true})
    requirements: string[]

    @Column()
    restartable: boolean;

    @Column({name: 'faction_name'})
    factionName: string;

    @Column({name: 'kappa_required'})
    kappaRequired: boolean;

    @Column({name: 'lightkeeper_required'})
    lightkeeperRequired: boolean;

    objectives: TarkovTaskObjective[] = []
    rewards: TarkovTaskReward[] = []

    constructor(data: any) {
        if (data) {
            this.id = data.id
            this.name = data.name
            this.normalizedName = data.normalizedName
            this.trader = data.trader
            this.map = data.map
            this.experience = data.experience
            this.wikiLink = data.wikiLink
            this.taskImageLink = data.taskImageLink
            this.minPlayerLevel = data.minPlayerLevel
            this.requirements = data.taskRequirements.map((req: any) => req.task.id)
            this.restartable = data.restartable
            this.factionName = data.factionName
            this.kappaRequired = data.kappaRequired
            this.lightkeeperRequired = data.lightkeeperRequired
            for (let obj of data.objectives) {
                this.objectives.push(new TarkovTaskObjective(this.id, obj))
            }
            let kyList = Object.keys(data.startRewards)
            for (let field of kyList) {
                for (let startReward of data.startRewards[field]) {
                    this.rewards.push(new TarkovTaskReward(this.id, field, 'start', startReward))
                }
            }
            kyList = Object.keys(data.finishRewards)
            for (let field of kyList) {
                for (let finishReward of data.finishRewards[field]) {
                    this.rewards.push(new TarkovTaskReward(this.id, field, 'finish', finishReward))
                }
            }
            kyList = Object.keys(data.failureOutcome)
            for (let field of kyList) {
                for (let failureReward of data.failureOutcome[field]) {
                    this.rewards.push(new TarkovTaskReward(this.id, field, 'failure', failureReward))
                }
            }
        }
    }

}

@Entity('tarkov_task_objective')
export class TarkovTaskObjective {

    @PrimaryColumn()
    tid: string

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    optional: boolean;

    @Column({type: 'simple-array', nullable: false})
    maps: string[];

    constructor(tid: string, data: any) {
        if (data) {
            this.tid = tid
            this.id = data.id
            this.description = data.description
            this.optional = data.optional
            this.maps = data.maps
        }
    }

}

@Entity('tarkov_task_reward')
export class TarkovTaskReward {

    @PrimaryColumn()
    tid: string;

    @PrimaryColumn()
    field: string;

    // start, finish, failure
    @PrimaryColumn()
    category: string;

    @PrimaryColumn()
    ref: string

    @PrimaryGeneratedColumn('increment')
    idx: number

    @Column({nullable: true})
    value: string;

    constructor(tid: string, field: string, category: string, obj: any) {
        if (tid) {
            this.tid = tid
            this.field = field
            this.category = category
            switch (field) {
                case 'items':
                    this.ref = obj.item.id;
                    this.value = obj.item.quantity
                    break;
                case 'offerUnlock':
                    this.ref = obj.id;
                    this.value = obj.id;
                    break;
                case 'traderStanding':
                    this.ref = 'traderStanding'
                    this.value = obj.standing;
                    break;
                case 'craftUnlock':
                    this.ref = obj.id;
                    this.value = obj.id;
                    break;
                case 'traderUnlock':
                    this.ref = 'traderUnlock'
                    this.value = 'traderUnlock'
                    break;
            }
        }
    }

}
