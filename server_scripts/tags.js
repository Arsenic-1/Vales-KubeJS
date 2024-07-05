const tags = {
  "forge:grasses": [
    "minecraft:grass_block",
    "immersive_weathering:rooted_grass_block",
    "immersive_weathering:grassy_earthen_clay",
    "immersive_weathering:grassy_sandy_dirt",
    "immersive_weathering:grassy_silt",
    "immersive_weathering:grassy_permafrost"
  ],
  "forge:tag2": ["minecraft:cobblestone", "minecraft:oak_log"]
}

ServerEvents.tags("item", function(event) {
  for (let tag in tags) {
    tags[tag].forEach(item => event.add(tag, item))
  }
})