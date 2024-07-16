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

// Color changing tooltips
function calculateNewColor(cname, pos) {
  let newcolor = 0;
  for(let k = 0; k < 3; k++){
      newcolor += (Math.pow(256, 2 - k) * (
          cname.nodes[Math.floor(pos / cname.length) % cname.nodes.length][k] +
          Math.floor(
              ((cname.nodes[(Math.floor(pos / cname.length) + 1) % cname.nodes.length][k] -
              cname.nodes[Math.floor(pos / cname.length) % cname.nodes.length][k]) / cname.length)
              * (pos % cname.length)
          )
      ));
  }
  return newcolor;
}

function createColoredName(cname, offset, namearray) {
  let coloredname = [];
  for(let j = 0; j < namearray.length; j++){
      let pos = (j + offset) % (cname.nodes.length * cname.length);
      let newcolor = calculateNewColor(cname, pos);
      coloredname.push(Text.of(namearray[j]).color(newcolor));
  }
  return coloredname;
}

ItemEvents.tooltip(event => {
  let colorfulnames = [
      {
          id: "moonsweaponry:netherite_greatsword",
          name: "Super Rainbow Gay Sword Yay",
          nodes: [[255, 255, 0], [0, 255, 255], [255, 0, 255]],
          length: 5,
          time: 1
      }
  ];

  for(let i = 0; i < colorfulnames.length; i++){
      let cname = colorfulnames[i];
      event.addAdvanced(cname.id, (item, advanced, text) => {
          let offset = Math.floor(Client.player.age / cname.time) % (cname.nodes.length * cname.length);
          let namearray = cname.name.split("");
          let coloredname = createColoredName(cname, offset, namearray);
          text.set(0, coloredname);
      });
  }
});