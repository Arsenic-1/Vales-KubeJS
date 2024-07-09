import { ServerEvents } from 'kubejs/events/server';
ServerEvents.tags("block", (event) => {
    event.removeAll("minecraft:enderman_holdable");
});
