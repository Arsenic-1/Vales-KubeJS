ItemEvents.tooltip(event => {
    event.addAdvanced('#c:tools', (item, advanced, text) => {
  //    if (event.shift) {
          const maxDurability = item.getMaxDamage();
          const currentDurability = item.getMaxDamage() - item.getDamageValue();
          const durabilityText = currentDurability === maxDurability 
            ? `${maxDurability}` 
            : `${currentDurability}/${maxDurability}`;
            if (!text.toString().includes("durability")) {
                text.add(Text.white(`${currentDurability} / ${maxDurability}`));
  //    }
    }})
  })

  ItemEvents.tooltip(event => {
  event.addAdvanced('minecraft:beacon', (item, advanced, text) => {
    // shift, alt and ctrl are all keys you can check!
    if (!event.shift) {
      text.add(1, [Text.of('Hold ').gold(), Text.of('Shift ').yellow(), Text.of('to see more info.').gold()])
    } else {
      text.add(1, Text.green('Gives positive effects to players in a range').bold(true))
      text.add(2, Text.red('Requires a base built out of precious metals or gems to function!'))
      text.add(3, [Text.white('Iron, '), Text.aqua('Diamonds, '), Text.gold('Gold '), Text.white('or even '), Text.green('Emeralds '), Text.white('are valid base blocks!')])
    }
  })
})

ItemEvents.tooltip(event => {
  event.addAdvanced('minecraft:beacon', (item, advanced, text) => {
    // shift, alt and ctrl are all keys you can check!
    if (!event.alt) {
      text.add(1, [Text.of('Hold ').gold(), Text.of('alt ').yellow(), Text.of('to see more info.').gold()])
    } else {
      text.add(1, Text.green('Gives positive effects to players in a range').bold(true))
      text.add(2, Text.red('Requires a base built out of precious metals or gems to function!'))
      text.add(3, [Text.white('Iron, '), Text.aqua('Diamonds, '), Text.gold('Gold '), Text.white('or even '), Text.green('Emeralds '), Text.white('are valid base blocks!')])
    }
  })
})

ItemEvents.tooltip(event => {
  event.addAdvanced('minecraft:beacon', (item, advanced, text) => {
    // shift, alt and ctrl are all keys you can check!
    if (!event.ctrl) {
      text.add(1, [Text.of('Hold ').gold(), Text.of('ctrl ').yellow(), Text.of('to see more info.').gold()])
    } else {
      text.add(1, Text.green('Gives positive effects to players in a range').bold(true))
      text.add(2, Text.red('Requires a base built out of precious metals or gems to function!'))
      text.add(3, [Text.white('Iron, '), Text.aqua('Diamonds, '), Text.gold('Gold '), Text.white('or even '), Text.green('Emeralds '), Text.white('are valid base blocks!')])
    }
  })
})