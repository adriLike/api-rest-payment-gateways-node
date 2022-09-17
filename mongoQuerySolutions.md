&nbsp;

# Mongo query solutions

Example of how to resolve queries in MongoDB applying the use of the aggregate operation and functions such as lookup or group.

## First answer

### Query:
```js
db.getCollection('pokemons').aggregate([
    {
        $match: { next_evolution: { $exists: true, $ne: [] } }
    },
    {
        $unwind: "$next_evolution"
    },
    {
       $lookup:
         {
           from: "pokemons",
           localField: "next_evolution.num",
           foreignField: "num",
           as: "related_evolution"
         }
    },
    {
        $unwind: "$related_evolution"
    },
    {
        $group: {
            _id: "$num",
            name: { $first: "$name"},
            evolutions: { $push: "$related_evolution" },
        },
    },
    {
        $project: { _id: 1, name: 1, "evolutions.num": 1, "evolutions.name": 1,"evolutions.spawn_time": 1 }
    },
    {
        $sort : { _id : 1 }
    }
])
```

### Result:

```json
/* 1 */
{
    "_id" : "001",
    "name" : "Bulbasaur",
    "evolutions" : [
        {
            "num" : "002",
            "name" : "Ivysaur",
            "spawn_time" : "07:00"
        },
        {
            "num" : "003",
            "name" : "Venusaur",
            "spawn_time" : "11:30"
        }
    ]
}

/* 2 */
{
    "_id" : "002",
    "name" : "Ivysaur",
    "evolutions" : [
        {
            "num" : "003",
            "name" : "Venusaur",
            "spawn_time" : "11:30"
        }
    ]
}

/* 3 */
{
    "_id" : "004",
    "name" : "Charmander",
    "evolutions" : [
        {
            "num" : "005",
            "name" : "Charmeleon",
            "spawn_time" : "19:00"
        },
        {
            "num" : "006",
            "name" : "Charizard",
            "spawn_time" : "13:34"
        }
    ]
}

/* 4 */
{
    "_id" : "005",
    "name" : "Charmeleon",
    "evolutions" : [
        {
            "num" : "006",
            "name" : "Charizard",
            "spawn_time" : "13:34"
        }
    ]
}

/* 5 */
{
    "_id" : "007",
    "name" : "Squirtle",
    "evolutions" : [
        {
            "num" : "008",
            "name" : "Wartortle",
            "spawn_time" : "07:02"
        },
        {
            "num" : "009",
            "name" : "Blastoise",
            "spawn_time" : "00:06"
        }
    ]
}

/* 6 */
{
    "_id" : "008",
    "name" : "Wartortle",
    "evolutions" : [
        {
            "num" : "009",
            "name" : "Blastoise",
            "spawn_time" : "00:06"
        }
    ]
}

/* 7 */
{
    "_id" : "010",
    "name" : "Caterpie",
    "evolutions" : [
        {
            "num" : "011",
            "name" : "Metapod",
            "spawn_time" : "02:11"
        },
        {
            "num" : "012",
            "name" : "Butterfree",
            "spawn_time" : "05:23"
        }
    ]
}

/* 8 */
{
    "_id" : "011",
    "name" : "Metapod",
    "evolutions" : [
        {
            "num" : "012",
            "name" : "Butterfree",
            "spawn_time" : "05:23"
        }
    ]
}

/* 9 */
{
    "_id" : "013",
    "name" : "Weedle",
    "evolutions" : [
        {
            "num" : "014",
            "name" : "Kakuna",
            "spawn_time" : "02:30"
        },
        {
            "num" : "015",
            "name" : "Beedrill",
            "spawn_time" : "04:50"
        }
    ]
}

/* 10 */
{
    "_id" : "014",
    "name" : "Kakuna",
    "evolutions" : [
        {
            "num" : "015",
            "name" : "Beedrill",
            "spawn_time" : "04:50"
        }
    ]
}

/* 11 */
{
    "_id" : "016",
    "name" : "Pidgey",
    "evolutions" : [
        {
            "num" : "017",
            "name" : "Pidgeotto",
            "spawn_time" : "01:30"
        },
        {
            "num" : "018",
            "name" : "Pidgeot",
            "spawn_time" : "01:50"
        }
    ]
}

/* 12 */
{
    "_id" : "017",
    "name" : "Pidgeotto",
    "evolutions" : [
        {
            "num" : "018",
            "name" : "Pidgeot",
            "spawn_time" : "01:50"
        }
    ]
}

/* 13 */
{
    "_id" : "019",
    "name" : "Rattata",
    "evolutions" : [
        {
            "num" : "020",
            "name" : "Raticate",
            "spawn_time" : "01:56"
        }
    ]
}

/* 14 */
{
    "_id" : "021",
    "name" : "Spearow",
    "evolutions" : [
        {
            "num" : "022",
            "name" : "Fearow",
            "spawn_time" : "01:11"
        }
    ]
}

/* 15 */
{
    "_id" : "023",
    "name" : "Ekans",
    "evolutions" : [
        {
            "num" : "024",
            "name" : "Arbok",
            "spawn_time" : "01:50"
        }
    ]
}

/* 16 */
{
    "_id" : "025",
    "name" : "Pikachu",
    "evolutions" : [
        {
            "num" : "026",
            "name" : "Raichu",
            "spawn_time" : "23:58"
        }
    ]
}

/* 17 */
{
    "_id" : "027",
    "name" : "Sandshrew",
    "evolutions" : [
        {
            "num" : "028",
            "name" : "Sandslash",
            "spawn_time" : "12:34"
        }
    ]
}

/* 18 */
{
    "_id" : "029",
    "name" : "Nidoran ♀ (Female)",
    "evolutions" : [
        {
            "num" : "030",
            "name" : "Nidorina",
            "spawn_time" : "07:22"
        },
        {
            "num" : "031",
            "name" : "Nidoqueen",
            "spawn_time" : "12:35"
        }
    ]
}

/* 19 */
{
    "_id" : "030",
    "name" : "Nidorina",
    "evolutions" : [
        {
            "num" : "031",
            "name" : "Nidoqueen",
            "spawn_time" : "12:35"
        }
    ]
}

/* 20 */
{
    "_id" : "032",
    "name" : "Nidoran ♂ (Male)",
    "evolutions" : [
        {
            "num" : "033",
            "name" : "Nidorino",
            "spawn_time" : "09:02"
        },
        {
            "num" : "034",
            "name" : "Nidoking",
            "spawn_time" : "12:16"
        }
    ]
}

/* 21 */
{
    "_id" : "033",
    "name" : "Nidorino",
    "evolutions" : [
        {
            "num" : "034",
            "name" : "Nidoking",
            "spawn_time" : "12:16"
        }
    ]
}

/* 22 */
{
    "_id" : "035",
    "name" : "Clefairy",
    "evolutions" : [
        {
            "num" : "036",
            "name" : "Clefable",
            "spawn_time" : "03:29"
        }
    ]
}

/* 23 */
{
    "_id" : "037",
    "name" : "Vulpix",
    "evolutions" : [
        {
            "num" : "038",
            "name" : "Ninetales",
            "spawn_time" : "01:32"
        }
    ]
}

/* 24 */
{
    "_id" : "039",
    "name" : "Jigglypuff",
    "evolutions" : [
        {
            "num" : "040",
            "name" : "Wigglytuff",
            "spawn_time" : "12:28"
        }
    ]
}

/* 25 */
{
    "_id" : "041",
    "name" : "Zubat",
    "evolutions" : [
        {
            "num" : "042",
            "name" : "Golbat",
            "spawn_time" : "02:15"
        }
    ]
}

/* 26 */
{
    "_id" : "043",
    "name" : "Oddish",
    "evolutions" : [
        {
            "num" : "044",
            "name" : "Gloom",
            "spawn_time" : "11:33"
        },
        {
            "num" : "045",
            "name" : "Vileplume",
            "spawn_time" : "23:58"
        }
    ]
}

/* 27 */
{
    "_id" : "044",
    "name" : "Gloom",
    "evolutions" : [
        {
            "num" : "045",
            "name" : "Vileplume",
            "spawn_time" : "23:58"
        }
    ]
}

/* 28 */
{
    "_id" : "046",
    "name" : "Paras",
    "evolutions" : [
        {
            "num" : "047",
            "name" : "Parasect",
            "spawn_time" : "01:22"
        }
    ]
}

/* 29 */
{
    "_id" : "048",
    "name" : "Venonat",
    "evolutions" : [
        {
            "num" : "049",
            "name" : "Venomoth",
            "spawn_time" : "23:40"
        }
    ]
}

/* 30 */
{
    "_id" : "050",
    "name" : "Diglett",
    "evolutions" : [
        {
            "num" : "051",
            "name" : "Dugtrio",
            "spawn_time" : "12:37"
        }
    ]
}

/* 31 */
{
    "_id" : "052",
    "name" : "Meowth",
    "evolutions" : [
        {
            "num" : "053",
            "name" : "Persian",
            "spawn_time" : "02:44"
        }
    ]
}

/* 32 */
{
    "_id" : "054",
    "name" : "Psyduck",
    "evolutions" : [
        {
            "num" : "055",
            "name" : "Golduck",
            "spawn_time" : "23:06"
        }
    ]
}

/* 33 */
{
    "_id" : "056",
    "name" : "Mankey",
    "evolutions" : [
        {
            "num" : "057",
            "name" : "Primeape",
            "spawn_time" : "12:33"
        }
    ]
}

/* 34 */
{
    "_id" : "058",
    "name" : "Growlithe",
    "evolutions" : [
        {
            "num" : "059",
            "name" : "Arcanine",
            "spawn_time" : "03:11"
        }
    ]
}

/* 35 */
{
    "_id" : "060",
    "name" : "Poliwag",
    "evolutions" : [
        {
            "num" : "061",
            "name" : "Poliwhirl",
            "spawn_time" : "09:14"
        },
        {
            "num" : "062",
            "name" : "Poliwrath",
            "spawn_time" : "01:32"
        }
    ]
}

/* 36 */
{
    "_id" : "061",
    "name" : "Poliwhirl",
    "evolutions" : [
        {
            "num" : "062",
            "name" : "Poliwrath",
            "spawn_time" : "01:32"
        }
    ]
}

/* 37 */
{
    "_id" : "063",
    "name" : "Abra",
    "evolutions" : [
        {
            "num" : "064",
            "name" : "Kadabra",
            "spawn_time" : "11:25"
        },
        {
            "num" : "065",
            "name" : "Alakazam",
            "spawn_time" : "12:33"
        }
    ]
}

/* 38 */
{
    "_id" : "064",
    "name" : "Kadabra",
    "evolutions" : [
        {
            "num" : "065",
            "name" : "Alakazam",
            "spawn_time" : "12:33"
        }
    ]
}

/* 39 */
{
    "_id" : "066",
    "name" : "Machop",
    "evolutions" : [
        {
            "num" : "067",
            "name" : "Machoke",
            "spawn_time" : "10:32"
        },
        {
            "num" : "068",
            "name" : "Machamp",
            "spawn_time" : "02:55"
        }
    ]
}

/* 40 */
{
    "_id" : "067",
    "name" : "Machoke",
    "evolutions" : [
        {
            "num" : "068",
            "name" : "Machamp",
            "spawn_time" : "02:55"
        }
    ]
}

/* 41 */
{
    "_id" : "069",
    "name" : "Bellsprout",
    "evolutions" : [
        {
            "num" : "070",
            "name" : "Weepinbell",
            "spawn_time" : "09:45"
        },
        {
            "num" : "071",
            "name" : "Victreebel",
            "spawn_time" : "12:19"
        }
    ]
}

/* 42 */
{
    "_id" : "070",
    "name" : "Weepinbell",
    "evolutions" : [
        {
            "num" : "071",
            "name" : "Victreebel",
            "spawn_time" : "12:19"
        }
    ]
}

/* 43 */
{
    "_id" : "072",
    "name" : "Tentacool",
    "evolutions" : [
        {
            "num" : "073",
            "name" : "Tentacruel",
            "spawn_time" : "23:36"
        }
    ]
}

/* 44 */
{
    "_id" : "074",
    "name" : "Geodude",
    "evolutions" : [
        {
            "num" : "075",
            "name" : "Graveler",
            "spawn_time" : "04:53"
        },
        {
            "num" : "076",
            "name" : "Golem",
            "spawn_time" : "12:16"
        }
    ]
}

/* 45 */
{
    "_id" : "075",
    "name" : "Graveler",
    "evolutions" : [
        {
            "num" : "076",
            "name" : "Golem",
            "spawn_time" : "12:16"
        }
    ]
}

/* 46 */
{
    "_id" : "077",
    "name" : "Ponyta",
    "evolutions" : [
        {
            "num" : "078",
            "name" : "Rapidash",
            "spawn_time" : "04:00"
        }
    ]
}

/* 47 */
{
    "_id" : "079",
    "name" : "Slowpoke",
    "evolutions" : [
        {
            "num" : "080",
            "name" : "Slowbro",
            "spawn_time" : "02:56"
        }
    ]
}

/* 48 */
{
    "_id" : "081",
    "name" : "Magnemite",
    "evolutions" : [
        {
            "num" : "082",
            "name" : "Magneton",
            "spawn_time" : "15:25"
        }
    ]
}

/* 49 */
{
    "_id" : "084",
    "name" : "Doduo",
    "evolutions" : [
        {
            "num" : "085",
            "name" : "Dodrio",
            "spawn_time" : "02:12"
        }
    ]
}

/* 50 */
{
    "_id" : "086",
    "name" : "Seel",
    "evolutions" : [
        {
            "num" : "087",
            "name" : "Dewgong",
            "spawn_time" : "06:04"
        }
    ]
}
```

&nbsp;

## Second answer

### Query:

```js
db.getCollection('pokemons').aggregate([
    { $match: { prev_evolution: { $exists: true, $ne: [] } } },
    { $match: { next_evolution: { $exists: true, $ne: [] } } },
    {
        $unwind: "$next_evolution"
    },
    {
       $lookup:
         {
           from: "pokemons",
           localField: "next_evolution.num",
           foreignField: "num",
           as: "related_evolution"
         }
    },
    {
        $unwind: "$related_evolution"
    },
    { $match: { "related_evolution.avg_spawns": { $gte: 4 } } },
    {
        $project: { _id: 0, num: 1, name: 1 }
    },
    {
        $sort : { num : 1 }
    }
])
```

### Result:

```json
/* 1 */
{
    "num" : "014",
    "name" : "Kakuna"
}

/* 2 */
{
    "num" : "017",
    "name" : "Pidgeotto"
}
```
