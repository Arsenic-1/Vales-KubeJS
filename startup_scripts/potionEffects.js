StartupEvents.registry('mob_effect', event => {
    event.create('divine_fire')
      .modifyAttribute('minecraft:generic.armor','e0f4e796-3d3d-11ee-be56-0242ac120002', -0.3, "multiply_base")
      .modifyAttribute('minecraft:generic.movement_speed', 'd43b79b6-a986-4857-9667-6c82d605e6e8', -0.2, 'multiply_base')
      .color(Color.YELLOW_DYE)
  })