// ==UserScript==
// @name         Highlight Rows with Recent Dates and Specific Games
// @namespace    http://tampermonkey.net/
// @version      1.6600000000000001
// @description  Highlight rows based on recent dates or specific game names on steam.tools/cards, even after sorting or data changes
// @match        https://steam.tools/cards/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetDate = new Date('2023-05-15');
    const gameNames = [
        "Need for Speed™ Heat",
        "The Last Stand: Aftermath",
        "Counter-Strike 2",
        "Remnant: From the Ashes",
        "Battlefield™ V",
        "This War of Mine",
        "Stronghold HD",
        "Yu-Gi-Oh!  Master Duel",
        "Worms Revolution",
        "Dome Keeper",
        "This Is the Police",
        "Do Not Feed the Monkeys",
        "Hand Simulator",
        "Kuro survival",
        "Battlefield 1 ™",
        "LoveChoice 拣爱",
        "Biped",
        "Descenders",
        "Tales of Destruction",
        "Move or Die",
        "Joana's Life",
        "UBERMOSH Vol.5",
        "Wall World",
        "SurrounDead",
        "SpiderHeck",
        "Destroyer: The U-Boat Hunter",
        "Ball 2D: Soccer Online",
        "Stacklands",
        "Lacuna",
        "Dorfromantik",
        "The friends of Ringo Ishikawa",
        "Bus Simulator 18",
        "Slain: Back from Hell",
        "SpeedRunners",
        "Nidhogg",
        "Inscryption",
        "Monster Crown",
        "The Descendant",
        "Neon Abyss",
        "Cities: Skylines",
        "Bus Simulator 18",
        "The friends of Ringo Ishikawa",
        "Mainframe Defenders",
        "Risk of Rain 2",
        "NARAKA: BLADEPOINT",
        "Hero",
        "Titanfall® 2",
        "GTFO",
        "Children of Morta",
        "Dicey Dungeons",
        "Trailmakers",
        "For The King",
        "Startup Company",
        "Moonlighter",
        "Rush for gold: California",
        "Legend of Mysteria",
        "UBERMOSH Vol.3",
        "The Surge",
        "FARIA: Ghosts of the Stream",
        "Path to Mnemosyne",
        "UBERMOSH:WRAITH",
        "White Day: A Labyrinth Named School",
        "Astral Ascent",
        "Bridge Constructor Portal",
        "Secret Of Magia",
        "Not For Broadcast",
        "Jagged Alliance - Back in Action",
        "Refunct",
        "Wizard of Legend",
        "Space Pilgrim Episode IV: Sol",
        "DmC Devil May Cry",
        "Rift's Cave",
        "Yet Another Zombie Defense HD",
        "Hold your houses",
        "Labyronia RPG",
        "Nary",
        "Kingdom Two Crowns",
        "Mount & Blade: With Fire and Sword",
        "They Are Billions",
        "Astral Ascent",
        "The Talos Principle",
        "Labyronia RPG 2",
        "Golden Light",
        "Labyrinthine",
        "KRUM - Edge Of Darkness",
        "Warhammer 40,000: Shootas, Blood & Teef",
        "RPG Maker VX Ace",
        "Rebound",
        "Torchlight: Infinite",
        "Storage Hustle",
        "Fishermurs",
        "Stronghold 2",
        "PRICE",
        "The Shadowland",
        "Dead6hot",
        "Iratus: Lord of the Dead",
        "Apollo4x",
        'Transistor',
        'Jotun: Valhalla Edition',
        "Realms of Arkania 2 - Star Trail Classic",
        "Autonauts vs Piratebots",
        "Honey, I Joined a Cult",
        "Knights of Honor II: Sovereign",
        "ISLANDERS",
        "UBERMOSH:BLACK",
        "Warhammer 40,000: Chaos Gate - Daemonhunters",
        "The Seeker",
        "Trek to Yomi",
        "They Always Run",
        "Gunfire Reborn",
        "冒险村传说（Tales of Legends)",
        "Regimental Chess",
        "PixARK",
        "Stories Untold",
        "Spore",
        "Lost",
        "Hurtworld",
        "Pilgrims",
        "The Coin Game",
        "SimplePlanes",
        "Outward",
        "GreedFall",
        "Edge Of Eternity",
        "Reigns: Her Majesty",
        "Tangledeep",
        "FAR: Lone Sails",
        "Door Kickers: Action Squad",
        "Shoppe Keep 2",
        "Timespinner",
        "The Sacred Stone: A Story Adventure",
        "Sickness",
        "We Need To Go Deeper",
        "Sudden Strike 4",
        "Northgard",
        "Lakeview Cabin Collection",
        "Westboro",
        "Hover Hazard",
        "Tom Clancy's Ghost Recon® Wildlands",
        "Distant Space",
        "The Last Hope",
        "Wallpaper Engine",
        "Sleeping Valley",
        "Farming Simulator 17",
        "Orwell",
        "Motorsport Manager",
        "Red Lake",
        "Planet Coaster",
        "Alien Hostage",
        "ONE PIECE BURNING BLOOD",
        "The Final Station",
        "Shift",
        "Reigns",
        "Barony",
        "Momodora: Reverie Under the Moonlight",
        "The Flame in the Flood",
        "Story of a Cube",
        "Blitz Breaker",
        "Stellaris",
        "Impossible Quest",
        "Star Merc",
        "RPG Maker MV",
        "Stellar 2D",
        "Shift Happens",
        "Warhammer: End Times - Vermintide",
        "RUNNING WITH RIFLES",
        "Sir! I'd Like To Report A Bug!",
        "Last Heroes",
        "Pony Island",
        "Space Pilgrim Episode II: Epsilon Indi",
        "Kivi, Toilet and Shotgun",
        "The Lost Battalion: All Out Warfare",
        "Sunless Sea",
        "Lost Castle",
        "The Chosen RPG",
        "No Turning Back: The Pixel Art Action-Adventure Roguelike",
        "The Tiny Bang Story",
        "Greyfox",
        "Bastion",
        "Among Ass",
        "Prison Simulator",
        "Raywin",
        "Hero Siege",
        "Mount & Blade II: Bannerlord",
        "The Excavation of Hob's Barrow",
        "Hardspace: Shipbreaker",
        "Machine Learning: Episode I",
        "Demented",
        "112 Operator",
        "Candy Blast",
        "Niche - a genetics survival game",
        "Dungeons 3",
        "Cat Quest II",
        "The Jackbox Party Pack 6",
        "Hyperdrive Massacre",
        "Hacknet",
        "Trine 3: The Artifacts of Power",
        "Terraformers",
        "Teria",
        "The Gunk",
        "Journey",
        "Suicide Guy: Sleepin' Deeply",
        "Space Hulk: Deathwing Enhanced Edition",
        "Frostpunk",
        "Kingdom Come: Deliverance",
        "What Remains of Edith Finch",
        "Tomb Joe",
        "Beat Cop",
        "Unalive",
        "The God's Chain",
        "Sins Of The Demon RPG",
        "Tom Clancy's The Division",
        "Rise of the Tomb Raider",
        "Crashlands",
        "ShipLord",
        "Just Cause 3",
        "Lords Of The Fallen",
        "Tabletop Simulator",
        "Nebuchadnezzar",
        "Galagan's Island: Reprymian Rising",
        "Terror of Hemasaurus",
        "Raft",
        "Rogue Legacy 2",
        "Ravenous Devils",
        "Redactem",
        "World War Z",
        "Dark Devotion",
        "Serial Cleaner",
        "Encased",
        "The Textorcist: The Story of Ray Bibbia",
        "Insurgency: Sandstorm",
        "Evil Bank Manager",
        "Shortest Trip to Earth",
        "Candleman: The Complete Journey",
        "Rabiez: Epidemic",
        "冒险村传说（Tales of Legends）",
        "Total War: WARHAMMER II",
        "小三角大英雄",
        "Sundered: Eldritch Edition",
        "House Party",
        "Ramify",
        "Fluffy Creatures VS The World",
        "Save Their Souls",
        "WayOut 2: Hex",
        "Little Jack's Adventures",
        "Queen of Seas",
        "Rocketbirds: Hardboiled Chicken",
        "Riot of the numbers",
        "Campfire: One of Us Is the Killer",
        "Stone Age Wars",
        "Nuclear Contingency",
        "SkyTime",
        "Town of Night",
        "Purgatory",
        "Space Hulk: Deathwing - Enhanced Edition",
        "The Incredible Adventures of Van Helsing",
        "Power of Love",
        "Layers of Fear (2016)",
        "State of Decay: Year-One",
        "The Swapper",
        "One Way Heroics",
        "The Undying Plague",
        "Braveland",
        "Storm of Spears",
        "Deathtrap",
        "Satellite Reign",
        "Sixtieth Kilometer",
        "Down To One",
        "Road Redemption",
        "Save Their Souls",
        "Last Heroes 3",
        "Pongo",
        "Super Mustache",
        "Dungeon of the ENDLESS™",
        "Total War: WARHAMMER",
        "MapleStory",
        "Salt and Sanctuary",
        "Space Pilgrim Episode III: Delta Pavonis",
        "Zombillie",
        "FINAL TAKE",
        "Dark Shadows - Army of Evil",
        "Castle Crashers",
        "Thorne - Death Merchants",
        "The Incredible Adventures of Van Helsing III",
        "Zombie Wars: Invasion",
        "Space Colony",
        "Grim Dawn",
        "Sheltered",
        "Turbo Pug DX",

    ];

    const style = document.createElement('style');
    style.textContent = `
        .highlight-date { background-color: #ffeb3b !important; }
        .highlight-game { background-color: #87cefa !important; }
        .highlight-both { background: linear-gradient(90deg, #ffeb3b 50%, #87cefa 50%) !important; }
    `;
    document.head.appendChild(style);

    function parseDate(dateStr) {
        dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
        return new Date(dateStr);
    }

    function highlightRows() {
        document.querySelectorAll('table tbody tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const firstCell = cells[0].textContent.trim();
                const lastCell = cells[cells.length - 1];
                const cellDate = parseDate(lastCell.textContent.trim());

                const isRecentDate = cellDate > targetDate;
                const isSpecificGame = gameNames.includes(firstCell);

                row.classList.remove('highlight-date', 'highlight-game', 'highlight-both');
                if (isRecentDate && isSpecificGame) {
                    row.classList.add('highlight-both');
                } else if (isRecentDate) {
                    row.classList.add('highlight-date');
                } else if (isSpecificGame) {
                    row.classList.add('highlight-game');
                }
            }
        });
    }

    const observer = new MutationObserver(highlightRows);
    observer.observe(document.body, { childList: true, subtree: true });
})();