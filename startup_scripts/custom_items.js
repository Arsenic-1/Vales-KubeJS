StartupEvents.registry('item', event => {
    event.create('bronze_ingot')
    event.create('rose_gold_ingot')
    event.create('tin_ingot')
})

StartupEvents.registry('item', event => {
	event.create('incomplete_spore_blossom', 'create:sequenced_assembly')
})
