/**
 * K-PAXian Archaeological Lexicon & Linguistic Field Database
 * Deciphered artifacts from the Lost Planetary Archives of K-PAX
 * Compiled by the Interstellar Department of Exo-Linguistic Studies
 */

export const KPAXIAN_DICTIONARY = [
  {
    id: "ting",
    word: "ting",
    ipa: "/tɪŋ/",
    partOfSpeech: "noun",
    definition: "An object, message, tangible entity, or conceptual matter.",
    extendedDefinition: "The primordial fundamental noun of K-PAXian physics and metaphysics. Encompasses all discrete manifestations of reality, ranging from a subatomic particle to a celestial body, a textual dispatch, or an emotional thought-form.",
    conjugations: {
      singular: "ting",
      plural: "tings",
      augmentative: "MASSIV ting (major file / grand object)",
      diminutive: "lil ting (minor notification / small pebble)",
      possessive: "ting's",
      interrogative: "wad ting? (what is this thing? / what is the message?)"
    },
    etymology: "From Proto-Kpaxian *t’iŋ*, attested on monolithic standing stones in the Great Crater. Strongly suspected to be a loanword into late 21st-century Earth communications via telepathic leakage.",
    researchNotes: "Deciphered on 12 June 2023 from an obsidian cylinder seal excavated near the southern rings of K-PAX. Archaeologists originally translated it as 'cosmic essence' before realizing K-PAXians also use it for routine lunch orders.",
    examples: [
      { kpaxian: "meow gib a ting to fren!", english: "Send a message to a companion right away!" },
      { kpaxian: "wad ting is stutudoed on the ancient slate?", english: "What matter has been inscribed upon the ancient tablet?" }
    ],
    synonyms: ["matter", "entity", "dispatch"],
    tags: ["core", "nouns", "cosmos"]
  },
  {
    id: "stutudo",
    word: "stutudo",
    ipa: "/stʊˈtuːdoʊ/",
    partOfSpeech: "verb",
    definition: "To compose, type, write, or express thought through rhythmic tentacle pulsing.",
    extendedDefinition: "Refers specifically to the tactile generation of symbols, whether on bio-resonant holographic keys or physical stone engraving. Conveying intellectual or emotional output through motor tentacles.",
    conjugations: {
      present: "stutudo",
      continuous: "stutudo-ing...",
      past: "stutudoed",
      thirdPerson: "stutudos",
      imperative: "stutudo a ting! (compose a message!)",
      passive: "stutudoed ting (composed message)"
    },
    etymology: "Onomatopoeic derivation mimicking the rapid percussive tap of eight suction tips on crystalline terminals in Olde K-PAXian command centers.",
    researchNotes: "Artifact fragment K-991 recovered from deep space probe telemetry (dated 4 March 2021). The recurring suffix '-ing...' indicates ongoing cognitive friction prior to actual transmission.",
    examples: [
      { kpaxian: "alien is stutudo-ing in the private orbit.", english: "The extraterrestrial is currently typing in the private channel." },
      { kpaxian: "stutudo a greeting before the portal closes.", english: "Compose a dispatch before the gateway disconnects." }
    ],
    synonyms: ["scribe", "transmit", "compose"],
    tags: ["verbs", "communication", "tech"]
  },
  {
    id: "bbychubi",
    word: "bbychubi",
    ipa: "/ˈbeɪbiˌtʃuːbi/",
    partOfSpeech: "noun",
    definition: "A round, cherished alien creature; an evocative sticker or symbolic illustration.",
    extendedDefinition: "A sacred biological and artistic classification. Bbychubis are spherical, gelatinous fauna indigenous to the moss flats of K-PAX, celebrated for their docile nature and expressive optic domes. In iconography, represents high-status digital stickers.",
    conjugations: {
      singular: "bbychubi",
      plural: "bbychubis",
      diminutive: "lil bbychubi",
      collective: "bbychubi collection (sticker gallery)",
      honorific: "favourite bbychubi"
    },
    etymology: "Derived from ancient nursery chants of the Spoon Planet nomads (*bh’chub*), later naturalized into High K-PAXian nobility.",
    researchNotes: "Discovered on 18 November 2022 etched upon ceramic amphorae retrieved from the sunken silt temples of Lake Mimble. Notes suggest ancient sentients traded prime grazing land for rare holographic bbychubis.",
    examples: [
      { kpaxian: "adopt bbychubis to expand the emotional arsenal.", english: "Install new sticker packs to enrich your expressivity." },
      { kpaxian: "favourite bbychubis glow brightest in dark orbits.", english: "Cherished sticker companions shine with highest luminescence at night." }
    ],
    synonyms: ["chubi", "totem", "sticker"],
    tags: ["nouns", "biology", "art"]
  },
  {
    id: "connec",
    word: "connec",
    ipa: "/kəˈnɛk/",
    partOfSpeech: "noun / verb",
    definition: "A telepathic or hyper-wave communications link; a chat thread or active contact.",
    extendedDefinition: "Both the state of mutual entanglement between consciousnesses and the infrastructure facilitating it. To 'connec' is to bridge interplanetary distance with tentacle warmth.",
    conjugations: {
      verbPresent: "connec",
      verbContinuous: "connec-ing!!",
      verbPast: "connec'd",
      nounSingular: "connec",
      nounPlural: "connecs",
      imperative: "connec back! (reply immediately!)"
    },
    etymology: "Borrowed from archaic Earth radiotelegraphy during the first accidental interstellar handshake (circa 1974), adopted into K-PAXian grammar as a sacred bond.",
    researchNotes: "Deciphered by the Royal Academy of Astrolinguistics on 30 July 2024. Transmission logs demonstrate that a broken link is described as 'autism connec ded :C', indicating grief over severed telepathic accord.",
    examples: [
      { kpaxian: "fren is connec-ing through the ether wave!!", english: "A companion is establishing a voice call connection!!" },
      { kpaxian: "connec back when your orbit passes the perimeter.", english: "Reply to me once your spacecraft traverses the boundary." }
    ],
    synonyms: ["resonance", "link", "commune"],
    tags: ["core", "verbs", "nouns", "communication"]
  },
  {
    id: "kpax",
    word: "kpax",
    ipa: "/keɪ.pæks/",
    partOfSpeech: "proper noun",
    definition: "The ancestral homeworld of peaceful grazing and tentacle harmony; chat list.",
    extendedDefinition: "The fourth planet orbiting the binary star system Procyon-Aleph. A lush world characterized by luminescent violet grasslands, methane-cooled lagoons, and zero bureaucracy. In software, refers to the master conversation hub.",
    conjugations: {
      locative: "on kpax (online, at home, in bliss)",
      ablative: "off kpax (offline, disconnected, wandering)",
      demonym: "kpaxian / kpax-ian (one who speaks the truth of the grazing flats)"
    },
    etymology: "Ancient astral designation *K’Phaax-Prime*. Literal translation disputed: either 'Where Grass Sings' or 'The Calm Spherical Realm'.",
    researchNotes: "First planetary coordinates recovered from a gold-foil chart recovered from the wreckage of a scout shuttle in Sector 9 on 15 August 2020.",
    examples: [
      { kpaxian: "alien is on kpax and grazing peacefully.", english: "The user is online and browsing content serenely." },
      { kpaxian: "off kpax for a bit to repair tentacle antennas.", english: "Offline for a short duration while servicing sensory gear." }
    ],
    synonyms: ["homeworld", "haven", "sanctuary"],
    tags: ["places", "cosmos", "core"]
  },
  {
    id: "mimbly-mumbly",
    word: "mimbly mumbly",
    ipa: "/ˈmɪm.bliː ˈmʌm.bliː/",
    partOfSpeech: "noun / verb",
    definition: "An acoustic voice message; a soft murmur or whispered audio transmission.",
    extendedDefinition: "Sub-vocalized sonic waves produced by the vibration of upper tentacle chambers. Considered far more intimate than written tings, carrying emotional inflections like sleepiness, excitement, or hunger.",
    conjugations: {
      noun: "mimbly mumbly (voice message)",
      verbContinuous: "mimble mumble-ing... (recording voice...)",
      verbPast: "mimbled mumbly",
      plural: "mimbly mumblies"
    },
    etymology: "Olde K-PAXian onomatopoeia describing the bubbling sound of deep-water bio-luminescent mollusks.",
    researchNotes: "Decoded on 22 October 2023 from a thermal resin cylinder found buried under glacial basalt on K-PAX's southern ice shelf.",
    examples: [
      { kpaxian: "hold for mimbly mumbly and whisper your orbit lore.", english: "Hold the record button to transmit an audio recording of your day." },
      { kpaxian: "mimble mumble-ing under the dual moons.", english: "Recording audio quietly beneath the twin moons." }
    ],
    synonyms: ["whisper", "audio-pulse", "acoustic-ting"],
    tags: ["nouns", "verbs", "communication"]
  },
  {
    id: "notti",
    word: "notti",
    ipa: "/ˈnɒti/",
    partOfSpeech: "adjective",
    definition: "Mischievous, unruly, rogue, blocked, or disobedient to the planetary accord.",
    extendedDefinition: "Used to describe entities who disrupt peaceful grazing, spam alien portals, or refuse to share bbychubi pictures. Such aliens are placed in the 'notti aliens' directory (blocked list).",
    conjugations: {
      base: "notti",
      comparative: "notti-er",
      superlative: "most notti",
      collectiveNoun: "notti aliens (blocked contacts)"
    },
    etymology: "Surfaced in late 20th-century orbital slang, likely an ironic corruption of the Earth English word 'naughty' through faulty sub-space acoustic filters.",
    researchNotes: "Documented in the penal logs of the K-PAX Citadel, dated 11 January 2024. Sentences for notti behavior typically involve cleaning mud from ceremonial grazing fields.",
    examples: [
      { kpaxian: "new notti alien added to the isolation chamber.", english: "A newly troublesome user has been placed on the blocked list." },
      { kpaxian: "behave kalm or the Council will mark you notti.", english: "Remain tranquil or the moderators will flag you as disruptive." }
    ],
    synonyms: ["rogue", "renegade", "unruly"],
    tags: ["adjectives", "social"]
  },
  {
    id: "scenary",
    word: "scenary",
    ipa: "/ˈsiːnəri/",
    partOfSpeech: "noun",
    definition: "Chat wallpaper; holographic planetary vista; decorative sky simulation.",
    extendedDefinition: "The sensory projection that surrounds a conversation. K-PAXian dialogue is considered incomplete without proper atmospheric conditions, whether rolling violet dunes or deep space starscapes.",
    conjugations: {
      singular: "scenary",
      plural: "scenaries",
      actionChoose: "choose scenary (select wallpaper)",
      actionReset: "remove scenary (restore default vista)",
      actionEdit: "new kpax scenary"
    },
    etymology: "Derived from Terran landscape theatrical nomenclature, transformed by K-PAXian architects into a legal right to aesthetic shelter during telepathic link.",
    researchNotes: "Deciphered on 19 April 2024 from the Imperial Aesthetic Codex found within the orbital library of New Alexandria-upon-Kpax.",
    examples: [
      { kpaxian: "travelled to new planet with you to choose scenary :o", english: "Traversed spacetime dimensions with you to establish a shared backdrop." },
      { kpaxian: "reacted with tentacle emotion to the new scenary.", english: "Expressed aesthetic delight at the freshly applied wallpaper." }
    ],
    synonyms: ["vista", "backdrop", "horizon"],
    tags: ["nouns", "art", "tech"]
  },
  {
    id: "ded",
    word: "ded",
    ipa: "/dɛd/",
    partOfSpeech: "adjective / verb",
    definition: "Destroyed, erased, deleted, powered off, expired, or non-functional.",
    extendedDefinition: "Denotes the cessation of energetic cohesion. When a message is deleted, it 'went ded :C'. When an alien session is terminated, it is 'made ded'.",
    conjugations: {
      state: "ded",
      verbTransitive: "make it ded (delete it / eliminate)",
      verbIntransitive: "went ded (was erased / ceased)",
      absolute: "always ded (permanently disabled)"
    },
    etymology: "Shortened form of Terran 'dead', stripped of mortality superstition and applied purely to data packets and energy fields.",
    researchNotes: "Encountered in the terminal shutdown sequence of the flagship *Nebula Grazer* (recovered 3 May 2019).",
    examples: [
      { kpaxian: "ting went ded before tentacles could absorb it :C", english: "The message was deleted before eyes could read it." },
      { kpaxian: "make it ded with extreme galactic prejudice.", english: "Delete this item permanently from storage." }
    ],
    synonyms: ["nullified", "vanished", "terminated"],
    tags: ["adjectives", "verbs", "tech"]
  },
  {
    id: "aliv",
    word: "aliv!",
    ipa: "/əˈlaɪv/",
    partOfSpeech: "adjective",
    definition: "Powered on, functioning, energized, awake, transmitting successfully.",
    extendedDefinition: "The antithesis of ded. Applied to active toggle switches, flourishing flora, and orbital relays operating at optimal capacitive resonance.",
    conjugations: {
      state: "aliv!",
      habitual: "always aliv! (permanently enabled)",
      transition: "turned aliv! (switched on)"
    },
    etymology: "Corrupted from early human telemetry signals broadcasting 'life signs verified'.",
    researchNotes: "Recorded from the power grid telemetry of the central solar arrays of K-PAX on 14 February 2025.",
    examples: [
      { kpaxian: "the power crystal is turned aliv!", english: "The energy circuit has been switched on." },
      { kpaxian: "connec is full aliv and humming with signal.", english: "The link is completely active and vibrant with incoming data." }
    ],
    synonyms: ["active", "vibrant", "ignited"],
    tags: ["adjectives", "tech", "core"]
  },
  {
    id: "kalm",
    word: "kalm",
    ipa: "/kɑːm/",
    partOfSpeech: "adjective / noun",
    definition: "Muted, peaceful, undisturbed; serene silence devoid of notifications.",
    extendedDefinition: "A sacred virtue in K-PAXian philosophy. When notifications overwhelm the sensory stalk, one invokes 'shhh kalm' to achieve tranquil balance.",
    conjugations: {
      state: "kalm",
      command: "shhh kalm (mute notifications)",
      pluralGroup: "kalm connecs (muted chat threads)"
    },
    etymology: "Derived from the ancient sea of Kalm-Nu, where waves never crest higher than three millimeters.",
    researchNotes: "Excavated from meditation tablets at the Monastery of Silent Tentacles on 9 September 2021.",
    examples: [
      { kpaxian: "shhh kalm the fren cluster until the sun sets.", english: "Mute the group chat until nightfall." },
      { kpaxian: "enter the kalm zone to digest heavy tings.", english: "Enter a quiet state to contemplate complex knowledge." }
    ],
    synonyms: ["serene", "tranquil", "muted"],
    tags: ["adjectives", "feelings", "core"]
  },
  {
    id: "meow",
    word: "meow",
    ipa: "/miˈaʊ/",
    partOfSpeech: "interjection / verb",
    definition: "Universal affirmative greeting; unmuting signal; energetic activation cry.",
    extendedDefinition: "A multi-modal vocalization utilized by K-PAXians to signal readiness, joy, and sensory awakening. To 'meow again' is to reactivate unmuted notifications.",
    conjugations: {
      interjection: "meow!",
      imperativeSend: "meow gib!! (send it immediately!!)",
      verbAction: "meow again (unmute / re-enable sound)"
    },
    etymology: "Phonetic mimicry of Earth feline envoys encountered during the Orion Expedition of 1842. Regarded by K-PAXian elders as the pinnacle of vocal sophistication.",
    researchNotes: "Found engraved on the boundary pillars of every major planetary settlement on K-PAX.",
    examples: [
      { kpaxian: "meow gib the secret coordinates to mi lil corna!", english: "Send the confidential coordinates to my Saved Messages right away!" },
      { kpaxian: "tentacles unmuted, meow again across all channels!!", english: "Audio restored, broadcasting cheerful greetings across all channels!!" }
    ],
    synonyms: ["hail", "activate", "cheer"],
    tags: ["interjections", "verbs", "core"]
  },
  {
    id: "gib",
    word: "gib",
    ipa: "/ɡɪb/",
    partOfSpeech: "verb",
    definition: "To transmit, provide, donate, hand over, send, or bestow.",
    extendedDefinition: "The cardinal verb of interplanetary exchange. Encompasses the physical handing of gifts, the digital sending of files, and the psychic transmission of warmth.",
    conjugations: {
      present: "gib",
      continuous: "gibbing",
      past: "gibbed!!",
      imperative: "gib more! (add / donate more)",
      directive: "meow gib!! (send immediately)"
    },
    etymology: "Proto-Germanic substrate carried via deep space shortwave radio, rapidly replacing the cumbersome Olde K-PAXian root *th’rraqu’la*.",
    researchNotes: "Deciphered by Dr. Eleanor Vane on 12 December 2023 from a marketplace tally stone in the Port of Spoons.",
    examples: [
      { kpaxian: "gib all the tings into the basket.", english: "Select all items into the folder." },
      { kpaxian: "ting has been gibbed across the orbit!!", english: "The message has been successfully dispatched into orbit!!" }
    ],
    synonyms: ["dispatch", "bestow", "transmit"],
    tags: ["verbs", "actions", "core"]
  },
  {
    id: "pasties",
    word: "pasties",
    ipa: "/ˈpeɪstiz/",
    partOfSpeech: "verb / noun",
    definition: "To paste from clipboard; adhered digital attachment; sticker adhesive.",
    extendedDefinition: "The tactile act of pressing copied memory crystals against a blank receptor field until the data adheres.",
    conjugations: {
      action: "pasties :o",
      past: "pasted",
      continuous: "pasting"
    },
    etymology: "Derived from the sticky tree sap of the K-PAXian Gloom-Pine, used historically to fasten parchment to tentacle bracelets.",
    researchNotes: "Cataloged on 7 October 2024 from the workbench of an ancient cybernetic craftsman in Sector 4.",
    examples: [
      { kpaxian: "clon the ting and slap pasties :o into the chat.", english: "Copy the item and paste it into the message prompt." }
    ],
    synonyms: ["paste", "affix", "adhere"],
    tags: ["verbs", "tech"]
  },
  {
    id: "twinkly-twonkly",
    word: "twinkly twonkly",
    ipa: "/ˈtwɪŋkli ˈtwɒŋkli/",
    partOfSpeech: "noun",
    definition: "Telegram Stars; cosmic currency; luminescent energy vouchers.",
    extendedDefinition: "Units of crystallized photonic wealth harvested from the dust rings of K-PAX. Used to buy special bbychubi gifts and unlock premium features.",
    conjugations: {
      singular: "twinkly twonkly",
      plural: "twinkly twonklies",
      quantity: "bag of twinkly twonkly"
    },
    etymology: "Onomatopoeic resonance reflecting the chime produced when two raw stellar crystals collide in zero gravity.",
    researchNotes: "First recorded in the mercantile ledgers of the High Stellar Guild, 19 August 2024.",
    examples: [
      { kpaxian: "gib twinkly twonkly to unlock the secret album.", english: "Pay Telegram Stars to unlock the special media collection." }
    ],
    synonyms: ["stars", "crystal-credits", "photons"],
    tags: ["nouns", "finance", "cosmos"]
  },
  {
    id: "orbit",
    word: "orbit",
    ipa: "/ˈɔːrbɪt/",
    partOfSpeech: "noun",
    definition: "A day; a planetary diurnal cycle; a full revolution of consciousness.",
    extendedDefinition: "The foundational temporal measurement of K-PAXian existence. A single rotation around the sun takes approximately 26 Earth hours.",
    conjugations: {
      current: "this orbit (today)",
      previous: "last orbit (yesterday)",
      future: "later orbit (tomorrow / in future)",
      plural: "orbits"
    },
    etymology: "From orbital mechanics terminology taught to K-PAXians by benevolent satellite explorers in the early Space Age.",
    researchNotes: "Found in planetary chronometers unearthed at the Sunken Observatory of Zephyr.",
    examples: [
      { kpaxian: "ting scheduled for later orbit.", english: "The message has been scheduled for tomorrow." },
      { kpaxian: "last seen at sunset last orbit.", english: "Last detected yesterday at dusk." }
    ],
    synonyms: ["cycle", "revolution", "day"],
    tags: ["time", "cosmos", "core"]
  },
  {
    id: "flashed",
    word: "flashed",
    ipa: "/flæʃt/",
    partOfSpeech: "verb",
    definition: "Forwarded; beamed to multiple recipients; echoed across the cluster.",
    extendedDefinition: "To catch a transmission with one tentacle and immediately project it outward with another, ensuring viral dispersion across all orbits.",
    conjugations: {
      present: "flash",
      continuous: "flashing",
      past: "flashd everybody",
      passive: "flashed frm (forwarded from)"
    },
    etymology: "Refers to the bioluminescent beacon pulses used by deep-trench K-PAXian sentinels to warn of approaching solar flares.",
    researchNotes: "Decoded from an emergency radio buoy recovered in the Kuiper Belt, 6 February 2024.",
    examples: [
      { kpaxian: "flash everybody with the news of the born day!", english: "Forward to everyone the announcement of the birthday celebration!" }
    ],
    synonyms: ["forwarded", "relayed", "broadcast"],
    tags: ["verbs", "communication"]
  },
  {
    id: "grazed",
    word: "grazed",
    ipa: "/ɡreɪzd/",
    partOfSpeech: "verb",
    definition: "Read, seen, mentally consumed, peacefully absorbed into cognition.",
    extendedDefinition: "Reading on K-PAX is not a mechanical optical chore; it is an act of gentle browsing, akin to grazing across a meadow of sweet clover.",
    conjugations: {
      present: "graze",
      continuous: "grazing",
      past: "has been grazed (seen / read)",
      negative: "ungrazed (unread)"
    },
    etymology: "Inherited from the pastoral nomadic era before the technological ascension of K-PAX.",
    researchNotes: "Appeared in agricultural treatises dated to the 12th Century of the Violet Sun.",
    examples: [
      { kpaxian: "ting has been grazed by all members of the cluster.", english: "The message has been read by everyone in the group." },
      { kpaxian: "twenty ungrazed tings waiting in the basket.", english: "Twenty unread messages are awaiting your attention in the folder." }
    ],
    synonyms: ["absorbed", "read", "perused"],
    tags: ["verbs", "actions", "core"]
  },
  {
    id: "born-day",
    word: "born day",
    ipa: "/bɔːrn deɪ/",
    partOfSpeech: "noun",
    definition: "Birthday; planetary arrival anniversary; annual celebration of existence.",
    extendedDefinition: "The precise anniversary of when an entity emerged from the maternal nutrient pods or planetary spore fields.",
    conjugations: {
      singular: "born day",
      current: "born day today! 🎂",
      actionEdit: "edit born day",
      actionRemove: "remove born day"
    },
    etymology: "Vernacular translation favored over the clinical medical term *Incubation-Apex*.",
    researchNotes: "Documented in municipal identity cylinders excavated from the Hall of Records on 3 November 2026.",
    examples: [
      { kpaxian: "It's fren's born day today! 🎂 gib presentz!!", english: "It is our companion's birthday today! Send gifts!!" }
    ],
    synonyms: ["birthday", "hatch-day", "arrival-cycle"],
    tags: ["nouns", "social", "time"]
  },
  {
    id: "exterminate",
    word: "EXTERMINATE",
    ipa: "/ɪkˈstɜːrmɪneɪt/",
    partOfSpeech: "verb / exclamation",
    definition: "Drastic full-session wipe, total deletion, complete purge of obsolete nodes.",
    extendedDefinition: "The ultimate administrative command. Uttered with fierce determination when all foreign connections, corrupt caches, or stale devices must be wiped from reality.",
    conjugations: {
      commandAll: "EXTERMINATE ALL",
      sadVariant: "EXTERMINATE :< (clear chat)",
      planetsVariant: "EXTERMINATE all other planets >:( (terminate all sessions)",
      automatic: "auto-EXTERMINATE (auto-delete timer)"
    },
    etymology: "Ancient battle-cry borrowed from early terrestrial broadcast dramas intercepted by deep-space radio dishes.",
    researchNotes: "Found stamped in red luminescent wax across decommissioned planetary server banks, 10 January 2026.",
    examples: [
      { kpaxian: "EXTERMINATE all other alien equipments >:(", english: "Log out of all devices except this one." }
    ],
    synonyms: ["purge", "annihilate", "wipe"],
    tags: ["verbs", "tech", "actions"]
  },
  {
    id: "wibble",
    word: "wibble",
    ipa: "/ˈwɪbəl/",
    partOfSpeech: "noun / verb",
    definition: "Video stream, live video call, moving transmission, fluid visual resonance.",
    extendedDefinition: "Dynamic visual media characterized by organic fluidity and undulating motion, distinguishing it from static 'still tings' (photos).",
    conjugations: {
      noun: "wibble",
      compound: "wibbly moving ting (video file)",
      adjective: "wibbly wobbly tings (GIFs)",
      actionCall: "wibble (video call button)"
    },
    etymology: "Mimics the physical shaking of water droplets upon an optic sensor lens.",
    researchNotes: "Recovered from the user interface firmware of the first K-PAXian handheld comms pod, 28 May 2024.",
    examples: [
      { kpaxian: "tap wibble to see eyetoeye with alien fren.", english: "Tap the video call button to see each other face to face." }
    ],
    synonyms: ["video", "motion-feed", "stream"],
    tags: ["nouns", "verbs", "media"]
  },
  {
    id: "clon",
    word: "clon",
    ipa: "/klɒn/",
    partOfSpeech: "verb",
    definition: "To duplicate, copy to clipboard, replicate matter or digital symbols.",
    extendedDefinition: "The precise atomic or algorithmic cloning of a target ting so it can be pasted elsewhere without loss of fidelity.",
    conjugations: {
      present: "clon",
      continuous: "cloning",
      past: "cloned",
      imperative: "clon the ting (copy message)"
    },
    etymology: "Scientific shorthand developed during the bio-replicator boom of the 3rd Planetary Dynasty.",
    researchNotes: "Cataloged on 14 July 2023 from a laboratory schematic at the Bio-Synthesis Tower.",
    examples: [
      { kpaxian: "clon the portal link and gib to the cluster.", english: "Copy the hyperlink and share it with the group." }
    ],
    synonyms: ["duplicate", "copy", "replicate"],
    tags: ["verbs", "tech"]
  },
  {
    id: "sekret",
    word: "sekret",
    ipa: "/ˈsiːkrət/",
    partOfSpeech: "adjective",
    definition: "End-to-end encrypted, clandestine, shielded from all third-party orbital scanners.",
    extendedDefinition: "Communication that takes place over quantum-entangled photon channels with self-destruct timers and screenshot shielding.",
    conjugations: {
      base: "sekret",
      compoundChat: "sekret connec (secret chat)",
      confirmation: "cfm sekret chat with %@?"
    },
    etymology: "Derived from the ancient order of K-PAXian cipher-weavers who spoke solely in silent bioluminescent chromatophore patterns.",
    researchNotes: "Deciphered from sealed cryptographic crystals found in the Deep Vault of Orion, 11 August 2025.",
    examples: [
      { kpaxian: "open a sekret connec for ultra-notti plans.", english: "Initiate an encrypted secret chat for confidential schemes." }
    ],
    synonyms: ["encrypted", "confidential", "shielded"],
    tags: ["adjectives", "security", "tech"]
  },
  {
    id: "meslo",
    word: "meslo",
    ipa: "/ˈmɛzloʊ/",
    partOfSpeech: "adjective / noun",
    definition: "Low-power mode, sluggish velocity, energy-saving operational state.",
    extendedDefinition: "The condition where an alien reduces mental cycles, halts animations, and dims their ocular glow to survive on remaining battery power.",
    conjugations: {
      state: "meslo",
      mode: "meslo mode :( (power saving mode)",
      status: "running meslo"
    },
    etymology: "Contraction of 'me slow', reflecting the deliberate reduction of processing clock speeds.",
    researchNotes: "Found inscribed on emergency hibernation pods found drifting near Asteroid Belt 404.",
    examples: [
      { kpaxian: "battery below 10%, entering meslo mode :(", english: "Battery is under 10%, enabling power saving mode." }
    ],
    synonyms: ["eco-mode", "sluggish", "dormant"],
    tags: ["adjectives", "tech"]
  },
  {
    id: "fren",
    word: "fren",
    ipa: "/frɛn/",
    partOfSpeech: "noun",
    definition: "A trusted companion, ally, fellow celestial entity, or address book contact.",
    extendedDefinition: "The highest social honorific in K-PAXian civilization. Denotes a companion with whom one willingly shares clover, stickers, and unencrypted thoughts.",
    conjugations: {
      singular: "fren",
      plural: "frens",
      collective: "fren cluster (group chat)",
      possessive: "my kpax frens"
    },
    etymology: "Harmonized vocalization of Earth 'friend', modified to reflect the pure affectionate tone natural to tentacled sentients.",
    researchNotes: "Recorded on peace treaties signed between the Sovereign Grazing Guilds of K-PAX, 23 September 2020.",
    examples: [
      { kpaxian: "make a fren cluster to plan the next comet viewing.", english: "Create a group chat to organize the next comet watching gathering." }
    ],
    synonyms: ["companion", "ally", "kin"],
    tags: ["nouns", "social", "core"]
  },
  {
    id: "basket",
    word: "basket",
    ipa: "/ˈbæskɪt/",
    partOfSpeech: "noun",
    definition: "A chat folder, category vessel, organized container for related connections.",
    extendedDefinition: "A woven digital compartment where related chats and channels are clustered for quick jumping and mental tidiness.",
    conjugations: {
      singular: "basket",
      plural: "baskets",
      actionCreate: "make a kpax basket (create folder)",
      tags: "basket tags (folder tags)"
    },
    etymology: "Derived from the woven reed hampers used by meadow foragers to sort different species of phosphorescent mushrooms.",
    researchNotes: "Appeared in municipal filing standards of the High Archives, 17 March 2024.",
    examples: [
      { kpaxian: "make baskets for connec clusters and jump between them mefast!", english: "Create folders for chat groups and switch between them swiftly!" }
    ],
    synonyms: ["folder", "vessel", "compartment"],
    tags: ["nouns", "tech"]
  },
  {
    id: "nomnom",
    word: "nomnom",
    ipa: "/ˈnɒmnɒm/",
    partOfSpeech: "noun",
    definition: "Music, harmonic sound files, auditory sustenance, sweet ear food.",
    extendedDefinition: "Acoustic frequencies so delightful that the acoustic receptors digest them with the same pleasure as confectionery grass.",
    conjugations: {
      singular: "nomnom",
      descriptive: "nomnom for ears (music / audio track)",
      verbDigest: "nomnom-ing the rhythm"
    },
    etymology: "Infant culinary vocalization applied to harmonic melodies by the philosopher-poet Chubi-Chubi VII.",
    researchNotes: "Found stamped on musical notation clay discs from the ancient Amphitheater of Harmonics.",
    examples: [
      { kpaxian: "send sweet nomnom for ears across the voice link.", english: "Transmit delightful music through the audio connection." }
    ],
    synonyms: ["music", "harmonies", "melody"],
    tags: ["nouns", "art", "media"]
  },
  {
    id: "tentacle",
    word: "tentacle",
    ipa: "/ˈtɛntəkəl/",
    partOfSpeech: "noun",
    definition: "The primary appendage of manipulation, tactile sensing, typing, and empathy.",
    extendedDefinition: "The multi-purpose sensory and locomotive limb of K-PAXian physiology. Equipped with millions of micro-receptors sensitive to temperature, emotion, and touchscreens.",
    conjugations: {
      singular: "tentacle",
      plural: "tentacles",
      sensor: "tentacle eye (camera)",
      emotion: "tentacle emotion (reaction / emoji)"
    },
    etymology: "Anatomical loanword accepted into standard intergalactic medical compendia.",
    researchNotes: "Diagrammed in forensic autopsy plates of early interplanetary diplomatic teams (1952).",
    examples: [
      { kpaxian: "show tentacle emotion on this wonderful dispatch :O", english: "Add an emoji reaction to this marvelous message." }
    ],
    synonyms: ["limb", "sensor-stalk", "tendril"],
    tags: ["nouns", "biology", "core"]
  },
  {
    id: "mefast",
    word: "mefast",
    ipa: "/ˈmiːfæst/",
    partOfSpeech: "adverb",
    definition: "Quickly, swiftly, with rapid agility, without procrastination.",
    extendedDefinition: "The velocity of an alien rushing toward a freshly opened bag of treats or responding to an emergency distress ping.",
    conjugations: {
      adverb: "mefast",
      superlative: "super-mefast"
    },
    etymology: "Compound of 'me' + 'fast', typical of high-frequency simplified galactic Pidgin.",
    researchNotes: "Interstellar transport flight manifests (Star Date 8842.1).",
    examples: [
      { kpaxian: "jump between chat baskets mefast before the alert fades.", english: "Switch between chat folders swiftly before the alert disappears." }
    ],
    synonyms: ["swiftly", "rapidly", "speedily"],
    tags: ["adverbs", "actions"]
  },
  {
    id: "corna",
    word: "corna",
    ipa: "/ˈkɔːrnə/",
    partOfSpeech: "noun",
    definition: "Saved Messages; personal private alcove; sanctuary for cherished tings.",
    extendedDefinition: "A cozy, encrypted micro-dimension reserved for an individual's personal bookmarks, drafts, and hoarded bbychubi media.",
    conjugations: {
      noun: "corna",
      possessive: "mi lil corna (my Saved Messages)",
      locative: "kept in corna"
    },
    etymology: "Dialectal variant of English 'corner', conveying intimacy, safety, and modest seclusion.",
    researchNotes: "Deciphered from personal diary seals excavated in the residential sector of Alpha Outpost.",
    examples: [
      { kpaxian: "keep this important ting safe in mi lil corna.", english: "Save this critical item into your Saved Messages." }
    ],
    synonyms: ["sanctuary", "vault", "nook"],
    tags: ["nouns", "tech", "core"]
  },
  {
    id: "portal",
    word: "portal",
    ipa: "/ˈpɔːrtəl/",
    partOfSpeech: "noun",
    definition: "A hyperlink, URL, web gateway, or dimensional threshold.",
    extendedDefinition: "A luminous geometric doorway encoded in text that, when activated by touch, transports consciousness to another server or world.",
    conjugations: {
      singular: "portal",
      plural: "portals",
      actionOpen: "enter portal (open link)",
      actionCopy: "clon portal (copy link)"
    },
    etymology: "From ancient dimensional engineering treatises of the Precursor Builders.",
    researchNotes: "Engraved above the gateway arches of all interstellar transit hubs on K-PAX.",
    examples: [
      { kpaxian: "clon portal and broadcast to the public feed.", english: "Copy the hyperlink and share it with the public." }
    ],
    synonyms: ["hyperlink", "gateway", "conduit"],
    tags: ["nouns", "tech"]
  },
  {
    id: "slpy",
    word: "slpy",
    ipa: "/ˈslɪpi/",
    partOfSpeech: "adjective",
    definition: "Inactive, sleepy, idle, in deep slumber, dormant on an orbit.",
    extendedDefinition: "The physiological necessity of resting sensory stalks and lowering metabolic rate after hours of intensive stutudoing.",
    conjugations: {
      base: "slpy",
      condition: "if slpy for (if inactive for...)",
      prolonged: "super-slpy"
    },
    etymology: "Typographical truncation of 'sleepy', coined when an exhausted telepath omitted vowels in a transmission.",
    researchNotes: "Medical logs of the K-PAXian Circadian Clinic, Sector 3.",
    examples: [
      { kpaxian: "auto EXTERMINATE session if slpy for 6 orbits.", english: "Automatically terminate device session if inactive for 6 days." }
    ],
    synonyms: ["idle", "dormant", "slumbering"],
    tags: ["adjectives", "biology", "time"]
  },
  {
    id: "okae-gud",
    word: "okae gud",
    ipa: "/oʊˈkeɪ ɡʊd/",
    partOfSpeech: "interjection / phrase",
    definition: "Done, agreed, completed with satisfaction, perfectly fine.",
    extendedDefinition: "The standard ritual phrase uttered upon finishing an operation, saving a setting, or confirming an arrangement.",
    conjugations: {
      phrase: "okae gud",
      affirmation: "agreed!"
    },
    etymology: "Double affirmation blending universal trade jargon 'OK' with K-PAXian approval particle *g’ud*.",
    researchNotes: "End-of-record stamp on official treaty dispatches.",
    examples: [
      { kpaxian: "tap okae gud to lock in your chosen theme.", english: "Click Done to confirm and save your selected theme." }
    ],
    synonyms: ["approved", "done", "satisfactory"],
    tags: ["interjections", "actions"]
  },
  {
    id: "nnnope",
    word: "nnnope",
    ipa: "/ˈnəʊp/",
    partOfSpeech: "interjection",
    definition: "Negative confirmation, cancel, refusal, backing out of an action.",
    extendedDefinition: "An emphatic verbal withdrawal. Prevents destructive operations, aborts file uploads, and dismisses unwanted popups.",
    conjugations: {
      interjection: "nnnope",
      action: "tap nnnope to cancel"
    },
    etymology: "Phonetic elongation of the human negation 'nope', mimicking the defensive snap of a startled tentacle tip.",
    researchNotes: "Safety release labels on hazardous planetary machinery.",
    examples: [
      { kpaxian: "press nnnope if you do not wish to EXTERMINATE the ting.", english: "Press cancel if you do not want to delete the file." }
    ],
    synonyms: ["cancel", "abort", "negative"],
    tags: ["interjections", "actions"]
  },
  {
    id: "noww",
    word: "noww!",
    ipa: "/ˈnaʊ.w/",
    partOfSpeech: "adverb",
    definition: "Just now; in this exact moment; instantaneous real-time occurrence.",
    extendedDefinition: "Temporal precision marker denoting zero elapsed duration since an event took place.",
    conjugations: {
      adverb: "noww!",
      state: "seen noww!"
    },
    etymology: "Elongated present-tense marker signifying urgent immediacy.",
    researchNotes: "Precision clock synchronization protocols, K-PAXian Space Fleet.",
    examples: [
      { kpaxian: "alien was grazing grass right noww!", english: "The user was online just now!" }
    ],
    synonyms: ["instantly", "presently", "immediately"],
    tags: ["adverbs", "time"]
  }
];
