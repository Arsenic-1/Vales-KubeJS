import { ServerEvents } from 'minecraft-server';

ServerEvents.tags('block', (event: any) => {
  event.removeAll('minecraft:enderman_holdable');
})