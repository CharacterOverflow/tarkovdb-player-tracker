import {Column, Entity, PrimaryColumn} from "typeorm";

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

export class TarkovTask {

}

export class TarkovMap {

}

export class TarkovItemCraft {


}

export class TarkovItemBarter {

}

export class TarkovItemPurchase {

}
