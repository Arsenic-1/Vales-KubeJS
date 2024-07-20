const materials = ['wooden', 'stone', 'iron', 'diamond', 'golden', 'netherite'];
const weapons = ['greatsword', 'halberd', 'hammer', 'katana', 'rapier', 'scythe', 'warglaive', 'mace', 'spear'];
const minecraftWeapons = ['sword', 'axe'];
const attackSpeeds = {
    greatsword: 0.3999999762,
    halberd: 0.6499999762,
    hammer: 0.5499999523,
    katana: 0.8999999762,
    rapier: 1,
    scythe: 0.6000000238,
    warglaive: 1.049999952,
    mace: 0.6000000238,
    spear: 0.8500000238,
    sword: 0.7999999523,
    axe: 1
};

ItemEvents.modification(event => {
    weapons.forEach(weapon => {
        materials.forEach(material => {
            const itemId = `moonsweaponry:${material}_${weapon}`;
            event.modify(itemId, item => {
                item.attackSpeed = attackSpeeds[weapon];
            });
        });
    });

    minecraftWeapons.forEach(weapon => {
        materials.forEach(material => {
            const itemId = `minecraft:${material}_${weapon}`;
            event.modify(itemId, item => {
                item.attackSpeed = attackSpeeds[weapon];
            });
        });
    });
});