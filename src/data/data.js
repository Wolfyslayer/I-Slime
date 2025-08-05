// data.js

// Klassen (3 st)
export const classes = [
  { id: 'archer', name: 'Archer' },
  { id: 'swordsman', name: 'Swordsman' },
  { id: 'mage', name: 'Mage' }
];

// Paths (6 st)
export const paths = [
  { id: 'hunter', name: 'Hunter', classId: 'archer' },
  { id: 'gun_wielder', name: 'Gun Wielder', classId: 'archer' },
  { id: 'knight', name: 'Knight', classId: 'swordsman' },
  { id: 'warrior', name: 'Warrior', classId: 'swordsman' },
  { id: 'sage', name: 'Sage', classId: 'mage' },
  { id: 'wizard', name: 'Wizard', classId: 'mage' }
];

// Skills (36 st)
export const skills = Array.from({ length: 36 }, (_, i) => {
  const num = `${i + 1}`;
  return {
    id: num,
    name: `Skill ${num}`,
    icon: `/images/skills/icons/${num}_icon.png`,
    cardImage: `/images/skills/cards/${num}_cards.png`,
    description: `Beskrivning för Skill ${num}`
  };
});

// Pets (63 st)
export const pets = Array.from({ length: 63 }, (_, i) => {
  const num = `${i + 1}`;
  return {
    id: num,
    name: `Pet ${num}`,
    icon: `/images/pets/icons/${num}_icon.png`,
    cardImage: `/images/pets/cards/${num}_cards.png`,
    description: `Beskrivning för Pet ${num}`
  };
});

// Item categories (för CreateBuild och EditBuild komponenterna)
export const itemCategories = [
  'weapon', 'gloves', 'armguards', 'boots', 'mask',
  'chest', 'pants', 'shoulder', 'helmet', 'belt'
];

// Stat options för items
export const statOptions = [
  { value: '' },
  { value: 'crit_hit', label: 'Crit Hit' },
  { value: 'combo', label: 'Combo' },
  { value: 'counter', label: 'Counter' },
  { value: 'skill_crit_hit', label: 'Skill Crit Hit' },
  { value: 'recover', label: 'Recover' },
  { value: 'dodge', label: 'Dodge' },
  { value: 'stun', label: 'Stun' },
];
