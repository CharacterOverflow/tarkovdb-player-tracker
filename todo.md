###### Things to be done....

1. Sync core game data on a 'long' basis - every day or so
2. Sync price data for items on a 'short' basis of every 10 minutes or so
3. Establish 'tracking' list of players in a table, and their rate
4. Establish 'history' table for player data (BIG)

{
items {
id
name
normalizedName
shortName
description
basePrice
updated
width
height
iconLink
gridImageLink
baseImageLink
inspectImageLink
image512pxLink
image8xLink
wikiLink
types
avg24hPrice
conflictingItems {
id
}
conflictingSlotIds
accuracyModifier
recoilModifier
ergonomicsModifier
hasGrid
blocksHeadphones
link
lastLowPrice
changeLast48h
changeLast48hPercent
low24hPrice
high24hPrice
lastOfferCount
sellFor {
price
priceRUB
vendor {
name
normalizedName
}
currencyItem {
id
}
}
buyFor {
price
priceRUB
vendor {
name
normalizedName
}
}
containsItems {
item {
id
name
}
quantity
count
attributes {
name
type
value
}
}
category {
id
name
}
bsgCategoryId
weight
velocity
loudness
usedInTasks {
id
name
trader {
name
}
}
receivedFromTasks {
id
name
trader {
name
}
}
bartersFor {
id
requiredItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
rewardItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
trader {
id
name
}
}
bartersUsing {
id
requiredItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
rewardItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
trader {
id
name
}
}
craftsFor {
id
requiredItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
rewardItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
station {
id
name
}
}
craftsUsing {
id
requiredItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
rewardItems {
item {
id
name
}
quantity
count
attributes {
name
}
}
station {
id
name
}
}
}
}


{
usd: item(id:  "5696686a4bdc2da3298b456a") {
id,
name
},
rub: item(id: "5449016a4bdc2d6f028b456f") {
id, name
},
euro: item(id: "569668774bdc2da2298b4568") {
id, name
}
}
