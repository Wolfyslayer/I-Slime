export const classes = [
  { id: 'archer', name: 'Archer' },
  { id: 'swordsman', name: 'Swordsman' },
  { id: 'mage', name: 'Mage' }
];

export const paths = [
  { id: 'hunter', name: 'Hunter', classId: 'archer' },
  { id: 'gun_wielder', name: 'Gun Wielder', classId: 'archer' },
  { id: 'knight', name: 'Knight', classId: 'swordsman' },
  { id: 'warrior', name: 'Warrior', classId: 'swordsman' },
  { id: 'sage', name: 'Sage', classId: 'mage' },
  { id: 'wizard', name: 'Wizard', classId: 'mage' }
];

// 36 Skills
export const skills = Array.from({ length: 36 }, (_, i) => {
  const id = `skill${i + 1}`;
  return {
    id,
    name: `Skill ${i + 1}`,
    icon: `/images/skills/icons/${id}.png`,
    cardImage: `/images/skills/cards/${id}.png`,
    description: `Beskrivning för Skill ${i + 1}`
  };
});

// 63 Pets
export const pets = Array.from({ length: 63 }, (_, i) => {
  const id = `pet${i + 1}`;
  return {
    id,
    name: `Pet ${i + 1}`,
    icon: `/images/pets/icons/${id}.png`,
    cardImage: `/images/pets/cards/${id}.png`,
    description: `Beskrivning för Pet ${i + 1}`
  };
});

// Items kan du anpassa vidare efter kategori
export const items = [
  { id: 'item1', name: 'Item 1' },
  { id: 'item2', name: 'Item 2' }
];
