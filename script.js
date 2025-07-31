
const data = {
  Archer: {
    Hunter: ["Stalker", "Grand Archer", "Demon Hunter"],
    "Gun Wielder": ["Magic Gunslinger", "Gunner", "Human Weapon"]
  },
  Swordsman: {
    Knight: ["Knight Commander", "Paladin", "Knight of Light"],
    Warrior: ["Martial Artist", "Berserker", "War God"]
  },
  Mage: {
    Sage: ["Alchemist", "High Priest", "Angel of Devotion"],
    Wizard: ["Elementalist", "Sorcerer", "Magic Destroyer"]
  }
};

const classImages = {
  Archer: "https://i.imgur.com/Usk0waB.png",
  Swordsman: "https://i.imgur.com/T6vT1CA.png",
  Mage: "https://i.imgur.com/xyEz0J6.png"
};

const pathImages = {
  Hunter: "https://i.imgur.com/qBjyigF.png",
  "Gun Wielder": "https://i.imgur.com/MPcV6n5.png",
  Knight: "https://i.imgur.com/BKZAjlN.png",
  Warrior: "https://i.imgur.com/YMHcEB3.png",
  Sage: "https://i.imgur.com/3EXOk7N.png",
  Wizard: "https://i.imgur.com/owmP2ou.png"
};

const petsData = [
  {name:"Pet1", img:"https://i.imgur.com/qBjyigF.png"},
  {name:"Pet2", img:"https://i.imgur.com/MPcV6n5.png"},
  {name:"Pet3", img:"https://i.imgur.com/BKZAjlN.png"},
  {name:"Pet4", img:"https://i.imgur.com/YMHcEB3.png"},
  {name:"Pet5", img:"https://i.imgur.com/3EXOk7N.png"},
  {name:"Pet6", img:"https://i.imgur.com/owmP2ou.png"},
];

const skillsData = [
  {name:"Skill1", img:"https://i.imgur.com/4mgxq9G.png"},
  {name:"Skill2", img:"https://i.imgur.com/7fRUWjJ.png"},
  {name:"Skill3", img:"https://i.imgur.com/FC7zZ3R.png"},
  {name:"Skill4", img:"https://i.imgur.com/0jjC9Yj.png"},
  {name:"Skill5", img:"https://i.imgur.com/2vLy0bk.png"},
  {name:"Skill6", img:"https://i.imgur.com/jXIpAtY.png"},
];

const items = ["Weapon", "Helmet", "Mask", "Shoulder", "Chest", "Armguards", "Gloves", "Belt", "Pants", "Boots"];
const specialStats = ["Crit Rate", "Combo", "Counter", "Stun", "Dodge", "Recover", "Skill Crit Hit"];

let selectedClass = null;
let selectedPath = null;
let selectedPets = [];
let selectedSkills = [];

function createChoice(name, imgSrc, onClick, selected = false, multiselect = false) {
  const div = document.createElement("div");
  div.className = "choice";
  if (selected) div.classList.add("selected");
  if(multiselect) div.classList.add("multiselect");
  div.title = name;

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = name;

  const span = document.createElement("span");
  span.textContent = name;

  div.appendChild(img);
  div.appendChild(span);

  div.addEventListener("click", () => onClick(div, name));
  return div;
}

const classChoicesDiv = document.getElementById("classChoices");
Object.keys(data).forEach(c => {
  const card = createChoice(c, classImages[c], () => {
    selectedClass = c;
    selectedPath = null;
    document.getElementById("pathSection").style.display = "block";
    renderPaths();
    renderEvoInfo("");
    document.getElementById("petsSection").style.display = "none";
    document.getElementById("skillsSection").style.display = "none";
    document.getElementById("itemsSection").style.display = "none";
    selectedPets = [];
    selectedSkills = [];
    updateSelectedLists();
  });
  classChoicesDiv.appendChild(card);
});

function renderPaths() {
  const pathChoicesDiv = document.getElementById("pathChoices");
  pathChoicesDiv.innerHTML = "";
  selectedPets = [];
  selectedSkills = [];
  updateSelectedLists();

  Object.keys(data[selectedClass]).forEach(path => {
    const card = createChoice(path, pathImages[path], (div, name) => {
      selectedPath = name;
      renderEvoInfo(name);
      document.getElementById("petsSection").style.display = "block";
      document.getElementById("skillsSection").style.display = "block";
      document.getElementById("itemsSection").style.display = "block";
    });
    pathChoicesDiv.appendChild(card);
  });
}

function renderEvoInfo(path) {
  const evoDiv = document.getElementById("evoInfo");
  if (!path) {
    evoDiv.style.display = "none";
    return;
  }
  evoDiv.style.display = "block";
  const evolutions = data[selectedClass][path];
  evoDiv.innerHTML = `<h3>Evolutioner för ${path}:</h3><ul>${evolutions.map(e => `<li>${e}</li>`).join("")}</ul>`;
}

function updateSelectedLists() {
  document.getElementById("selectedPets").textContent = selectedPets.join(", ");
  document.getElementById("selectedSkills").textContent = selectedSkills.join(", ");
}

function petClick(div, name) {
  if (selectedPets.includes(name)) {
    selectedPets = selectedPets.filter(p => p !== name);
    div.classList.remove("selected");
  } else {
    if (selectedPets.length < 5) {
      selectedPets.push(name);
      div.classList.add("selected");
    } else {
      alert("Du kan bara välja 5 pets.");
    }
  }
  updateSelectedLists();
}

function skillClick(div, name) {
  if (selectedSkills.includes(name)) {
    selectedSkills = selectedSkills.filter(s => s !== name);
    div.classList.remove("selected");
  } else {
    if (selectedSkills.length < 5) {
      selectedSkills.push(name);
      div.classList.add("selected");
    } else {
      alert("Du kan bara välja 5 skills.");
    }
  }
  updateSelectedLists();
}

function renderPets() {
  const petChoicesDiv = document.getElementById("petChoices");
  petChoicesDiv.innerHTML = "";
  petsData.forEach(p => {
    const card = createChoice(p.name, p.img, petClick, false, true);
    petChoicesDiv.appendChild(card);
  });
}

function renderSkills() {
  const skillChoicesDiv = document.getElementById("skillChoices");
  skillChoicesDiv.innerHTML = "";
  skillsData.forEach(s => {
    const card = createChoice(s.name, s.img, skillClick, false, true);
    skillChoicesDiv.appendChild(card);
  });
}

function renderItems() {
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "";

  items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-container";

    const header = document.createElement("div");
    header.className = "item-header";
    header.textContent = item;
    itemDiv.appendChild(header);

    // Base stats inputs
    const baseStats = ["HP", "ATK", "DEF"];
    baseStats.forEach(stat => {
      const label = document.createElement("label");
      label.textContent = stat + ": ";
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      input.value = 0;
      input.style.width = "60px";
      label.appendChild(input);
      itemDiv.appendChild(label);
      itemDiv.appendChild(document.createElement("br"));
    });

    // Special stats select
    const specialContainer = document.createElement("div");
    specialContainer.className = "special-stats";

    specialStats.forEach(stat => {
      const statDiv = document.createElement("div");
      statDiv.className = "stat-select";

      const label = document.createElement("label");
      label.textContent = stat;

      const select = document.createElement("select");
      ["-", "+1", "+2", "+3"].forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });

      statDiv.appendChild(label);
      statDiv.appendChild(select);
      specialContainer.appendChild(statDiv);
    });

    itemDiv.appendChild(specialContainer);

    // Attack Speed input (optional)
    if (item === "Weapon") {
      const atkSpeedDiv = document.createElement("div");
      atkSpeedDiv.className = "atk-speed";
      const label = document.createElement("label");
      label.textContent = "Attack Speed: ";
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      input.value = 0;
      input.style.width = "60px";
      label.appendChild(input);
      atkSpeedDiv.appendChild(label);
      itemDiv.appendChild(atkSpeedDiv);
    }

    itemsContainer.appendChild(itemDiv);
  });
}

// Initial rendering
renderPets();
renderSkills();
renderItems();

