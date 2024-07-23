/**
 * Function to get the player's coin balance.
 *
 * @param {Player} player - The player object for which to retrieve the balance.
 * @returns {number} The player's coin balance. If the player has no account, returns 0.
 */
function getPlayerBalance(player) {
  const playerAccount = Numismatics.BANK.accounts.get(player.getUuid());
  return playerAccount ? playerAccount.getBalance() : 0;
}

// Update the HUD every tick
PlayerEvents.tick(event => {
  const player = event.player;
  const balance = getPlayerBalance(player);

  // Breakdown of the balance into suns, cogs, and spurs
  const suns = Math.floor(balance / 4096);
  const cogs = Math.floor((balance % 4096) / 64);
  const spurs = balance % 64;

  // Draw the coin output display
  player.paint({
    spursiDisplay: {
      type: 'item',
      item: 'numismatics:spur',
      x: 26,
      y: 5,
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    cogsiDisplay: {
      type: 'item',
      item: 'numismatics:cog',
      x: 43,
      y: 4,
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    sunsiDisplay: {
      type: 'item',
      item: 'numismatics:sun',
      x: 65,
      y: 3,
      alignX: 'left',
      alignY: 'bottom'
    }
  });
  player.paint({
    spursbDisplay: {
      type: 'text',
      x: 11,
      y: -5,
      text: `${spurs}`,
      color: '#626262',
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    cogsbDisplay: {
      type: 'text',
      x: 31,
      y: -5,
      text: `${cogs}`,
      color: '#626262',
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    sunsbDisplay: {
      type: 'text',
      x: 51,
      y: -5,
      text: `${suns}`,
      color: '#626262',
      alignX: 'left',
      alignY: 'bottom'
    }
  });
  player.paint({
    spursDisplay: {
      type: 'text',
      x: 10,
      y: -6,
      text: `${spurs}`,
      color: '#DF5C0C',
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    cogsDisplay: {
      type: 'text',
      x: 30,
      y: -6,
      text: `${cogs}`,
      color: '#CBC807',
      alignX: 'left',
      alignY: 'bottom'
    }
  });

  player.paint({
    sunsDisplay: {
      type: 'text',
      x: 50,
      y: -6,
      text: `${suns}`,
      color: '#F0A2F1',
      alignX: 'left',
      alignY: 'bottom'
    }
  });
});