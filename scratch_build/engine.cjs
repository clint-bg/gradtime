"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/simulator/engine.ts
var engine_exports = {};
__export(engine_exports, {
  getDefaultInterventions: () => getDefaultInterventions,
  isCourseExempted: () => isCourseExempted,
  isCourseOffered: () => isCourseOffered,
  runSimulation: () => runSimulation
});
module.exports = __toCommonJS(engine_exports);

// src/data/classDetailsData.ts
var INITIAL_COURSES = [
  {
    "classId": "001",
    "classNumber": "170",
    "deptCode": "CBE",
    "typicalYear": "Freshman",
    "credits": 2,
    "topic": "Intro mass and energy balances",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "002",
    "classNumber": "191",
    "deptCode": "CBE",
    "typicalYear": "Freshman",
    "credits": 0.5,
    "topic": "Chemical engineering introduction seminar",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "003",
    "classNumber": "263",
    "deptCode": "CBE",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Computational tools",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "007",
      "001"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "004",
    "classNumber": "291",
    "deptCode": "CBE",
    "typicalYear": "Sophomore",
    "credits": 0.5,
    "topic": "Career Skills",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "005",
    "classNumber": "273",
    "deptCode": "CBE",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Material and Energy Balances",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "001",
      "012",
      "008"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "006",
    "classNumber": "112",
    "deptCode": "MATH",
    "typicalYear": "Freshman",
    "credits": 4,
    "topic": "Calculus 1",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "007",
    "classNumber": "113",
    "deptCode": "MATH",
    "typicalYear": "Freshman",
    "credits": 4,
    "topic": "Calculus 2",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "006"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "008",
    "classNumber": "121",
    "deptCode": "PHYS",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Newtonian Mechanics",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "009",
    "classNumber": "302",
    "deptCode": "MATH",
    "typicalYear": "Sophomore",
    "credits": 4,
    "topic": "Math for engineers",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "010",
    "classNumber": "303",
    "deptCode": "MATH",
    "typicalYear": "Sophomore",
    "credits": 4,
    "topic": "Math for engineers",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "009"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "011",
    "classNumber": "111",
    "deptCode": "CHEM",
    "typicalYear": "Freshman",
    "credits": 4,
    "topic": "Chemistry principles 1",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "012",
    "classNumber": "112",
    "deptCode": "CHEM",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Chemistry principles 2",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "011"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "013",
    "classNumber": "285",
    "deptCode": "CBE",
    "typicalYear": "Sophomore",
    "credits": 0.5,
    "topic": "Fluids lab",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "005",
      "017"
    ],
    "concurrentPrereqs": [
      "017"
    ],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "014",
    "classNumber": "311",
    "deptCode": "CBE",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Ethics, Safety, Environment",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "005"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "015",
    "classNumber": "345",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 0.5,
    "topic": "Reactions and Materials lab",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "008",
      "019",
      "021"
    ],
    "concurrentPrereqs": [
      "019",
      "021"
    ],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "016",
    "classNumber": "373",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Thermodynamics",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "033",
      "005"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "017",
    "classNumber": "374",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Fluid mechanics",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "009",
      "003",
      "005"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "018",
    "classNumber": "376",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Heat and mass transfer",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "014",
      "017"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "019",
    "classNumber": "378",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Material science",
    "termsTaught": [
      "Fall",
      "Spring"
    ],
    "prereqs": [
      "032"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "020",
    "classNumber": "385",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 0.5,
    "topic": "Heat and mass lab",
    "termsTaught": [
      "Winter",
      "016, 018"
    ],
    "prereqs": [
      "016",
      "018"
    ],
    "concurrentPrereqs": [
      "016",
      "018"
    ],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "021",
    "classNumber": "386",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Chemical reactions engineering (kinetics)",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "010",
      "005"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "022",
    "classNumber": "391",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 1,
    "topic": "Career skills 2",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "023",
    "classNumber": "436",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Process control",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "018",
      "021"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "024",
    "classNumber": "445",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 0.5,
    "topic": "Separations and process control lab",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "023",
      "026"
    ],
    "concurrentPrereqs": [
      "023",
      "026"
    ],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "025",
    "classNumber": "451",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 4,
    "topic": "Process design (capstone 1)",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "019",
      "023",
      "026"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "026",
    "classNumber": "476",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Separations",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "018",
      "016"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "027",
    "classNumber": "479",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 2,
    "topic": "Unit operations lab",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [
      "035",
      "018",
      "021"
    ],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "028",
    "classNumber": "221",
    "deptCode": "MMBio",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "micro or molecular biology",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "029",
      "030",
      "031"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "029",
    "classNumber": "120",
    "deptCode": "CELL",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Cell biology",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "028",
      "030",
      "031"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "030",
    "classNumber": "130",
    "deptCode": "BIO",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Biology",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "028",
      "029",
      "031"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "031",
    "classNumber": "100",
    "deptCode": "BIO",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Biology, introductory",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "028",
      "029",
      "030"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "032",
    "classNumber": "357",
    "deptCode": "CHEM",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Industrial organic chemistry",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "033",
    "classNumber": "467",
    "deptCode": "CHEM",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Physical chemistry",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "034",
    "classNumber": "110",
    "deptCode": "ECON",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Macro economics",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "035",
    "classNumber": "316",
    "deptCode": "WRTG",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Technical communication",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "036",
    "classNumber": "121",
    "deptCode": "STAT",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Statistical Data analysis",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "037",
    "classNumber": "353",
    "deptCode": "CHEM",
    "typicalYear": "Junior",
    "credits": 2,
    "topic": "Organic chemistry lab",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "038"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "038",
    "classNumber": "464",
    "deptCode": "CHEM",
    "typicalYear": "Senior",
    "credits": 2,
    "topic": "Physical chemistry lab",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Major",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [
      "037"
    ],
    "abetCategory": "Sci"
  },
  {
    "classId": "039",
    "classNumber": "433",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Energy Engineering",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "016",
      "017",
      "018"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "040",
    "classNumber": "400",
    "deptCode": "CEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Advanced class in CEEN. This represents multiple classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "040",
    "classNumber": "500",
    "deptCode": "CEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Advanced class in CEEN. This represents multiple classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "041",
    "classNumber": "541",
    "deptCode": "MEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Computational Fluid Dynamics",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "042",
    "classNumber": "410",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Petroleum Engineering",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "016",
      "017"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "043",
    "classNumber": "330",
    "deptCode": "GEOL",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Engineering geology",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "044",
    "classNumber": "400",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 1,
    "topic": "Creative Skills in engineering",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "045",
    "classNumber": "481",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 2,
    "topic": "Intro to semiconductor processing",
    "termsTaught": [
      "Fall, every other year"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "046",
    "classNumber": "452",
    "deptCode": "ECE",
    "typicalYear": "Senior",
    "credits": 1,
    "topic": "Experiments in semiconductor processing lab",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "047",
    "classNumber": "450",
    "deptCode": "ECE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Introduction to Semiconductor devices",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "048",
    "classNumber": "281",
    "deptCode": "PHYS",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Solid state physics",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "049",
    "classNumber": "540",
    "deptCode": "CEEN",
    "typicalYear": "Senior",
    "credits": 1,
    "topic": "Geoenvironmental Engineering",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "050",
    "classNumber": "518",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Biomedical engineering",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "017",
      "018"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "051",
    "classNumber": "513",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Molecular modeling",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "052",
    "classNumber": "533",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Transport phenomena",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "018",
      "010"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "053",
    "classNumber": "536",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Machine Learning",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "023"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "054",
    "classNumber": "541",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Numerical methods",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "018",
      "010"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "055",
    "classNumber": "412",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Introduction to Nuclear Engineering",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "007",
      "012"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "056",
    "classNumber": "351",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Fundamentals of Biomedical Engineering",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "007",
      "008"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "057",
    "classNumber": "531",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Thermodynamics of multicomponents systems",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "016"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "058",
    "classNumber": "535",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Kinetics and Catalysis",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "021"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "059",
    "classNumber": "481",
    "deptCode": "CHEM",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Biochemistry",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "032",
      "030"
    ],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "060",
    "classNumber": "355",
    "deptCode": "NDFS",
    "typicalYear": "Junior",
    "credits": 4,
    "topic": "Food process engineering includes lab",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "006"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "061",
    "classNumber": "410",
    "deptCode": "MATH",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Introduction to numerical methods",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "007"
    ],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "062",
    "classNumber": "510",
    "deptCode": "MEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Compressible fluid flow",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [
      "017"
    ],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "063",
    "classNumber": "199R",
    "deptCode": "CBE",
    "typicalYear": "Junior",
    "credits": 1,
    "topic": "Academic Internship - for students completing and internship",
    "termsTaught": [
      "Spring",
      "Summer"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "064",
    "classNumber": "300",
    "deptCode": "MFGEN",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "065",
    "classNumber": "200",
    "deptCode": "CS",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Eng",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Sci"
  },
  {
    "classId": "066",
    "classNumber": "200",
    "deptCode": "ACC",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "067",
    "classNumber": "300",
    "deptCode": "ACC",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "068",
    "classNumber": "200",
    "deptCode": "ENT",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "069",
    "classNumber": "300",
    "deptCode": "ENT",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "070",
    "classNumber": "200",
    "deptCode": "FIN",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "071",
    "classNumber": "300",
    "deptCode": "FIN",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "072",
    "classNumber": "200",
    "deptCode": "GSCM",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "073",
    "classNumber": "300",
    "deptCode": "GSCM",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "074",
    "classNumber": "200",
    "deptCode": "GCI",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "075",
    "classNumber": "300",
    "deptCode": "GCI",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "076",
    "classNumber": "200",
    "deptCode": "HRM",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "077",
    "classNumber": "300",
    "deptCode": "HRM",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "078",
    "classNumber": "200",
    "deptCode": "IS",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "079",
    "classNumber": "300",
    "deptCode": "IS",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "080",
    "classNumber": "200",
    "deptCode": "MKTG",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "081",
    "classNumber": "300",
    "deptCode": "MKTG",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "082",
    "classNumber": "200",
    "deptCode": "MPA",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "083",
    "classNumber": "300",
    "deptCode": "MPA",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "084",
    "classNumber": "200",
    "deptCode": "PSE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "085",
    "classNumber": "300",
    "deptCode": "PSE",
    "typicalYear": "Junior",
    "credits": 3,
    "topic": "Various topics as this represents several possible classes students could take",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EMSB",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "086",
    "classNumber": "461",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Capstone projects",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [
      "023",
      "026"
    ],
    "concurrentPrereqs": [],
    "category": "EPSEL",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "087",
    "classNumber": "499",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Mentored research",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EPSEL",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "088",
    "classNumber": "495R",
    "deptCode": "CBE",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Global engineering outreach",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EPSEL",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "089",
    "classNumber": "475",
    "deptCode": "MEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Mechanical engineering capstone 1",
    "termsTaught": [
      "Fall"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EPSEL",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "090",
    "classNumber": "476",
    "deptCode": "MEEN",
    "typicalYear": "Senior",
    "credits": 3,
    "topic": "Mechanical engineering capstone 2",
    "termsTaught": [
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "EPSEL",
    "genEdSets": [],
    "substitutionAllowed": true,
    "substitutionClassIds": [],
    "abetCategory": "Eng"
  },
  {
    "classId": "091",
    "classNumber": "101",
    "deptCode": "UNIV",
    "typicalYear": "Freshman",
    "credits": 2,
    "topic": "Gospel and College introduction principles",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1",
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "092",
    "classNumber": "150",
    "deptCode": "WRTG",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "Introduction to writing",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "093",
    "classNumber": "100",
    "deptCode": "AHTG",
    "typicalYear": "Freshman",
    "credits": 3,
    "topic": "American heritage",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "095",
    "classNumber": "100",
    "deptCode": "LETT",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Letters and global cultural awareness classes as part of general education to satisfy both letters and global cultural awareness at the same time",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "096",
    "classNumber": "100",
    "deptCode": "CIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Civilization and arts general requirements satisfied by any number of classes",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "1"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "097",
    "classNumber": "121",
    "deptCode": "RELA",
    "typicalYear": "Freshman",
    "credits": 2,
    "topic": "The book of mormon",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "098",
    "classNumber": "250",
    "deptCode": "RELA",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Christ and his gospel",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "099",
    "classNumber": "200",
    "deptCode": "RELC",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Role of the eternal family in the gospel of jesus christ",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "100",
    "classNumber": "200",
    "deptCode": "REL",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Religion elective",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "101",
    "classNumber": "300",
    "deptCode": "REL",
    "typicalYear": "Junior",
    "credits": 2,
    "topic": "Religion elective",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "102",
    "classNumber": "250",
    "deptCode": "REL",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Religion elective",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "103",
    "classNumber": "225",
    "deptCode": "RELC",
    "typicalYear": "Sophomore",
    "credits": 2,
    "topic": "Foundations of the restoration of the gospel of Jesus Christ",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Rel",
    "genEdSets": [],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "104",
    "classNumber": "102",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Great questions out of the best books",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "105",
    "classNumber": "103",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Inspired constitutional principles",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "106",
    "classNumber": "104",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Faith, family, and human flourishing",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "107",
    "classNumber": "105",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Stewardship and the natural world",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "108",
    "classNumber": "106",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Numeracy and Data",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "109",
    "classNumber": "107",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Effective communication",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "110",
    "classNumber": "108",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Languages and cultures",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  },
  {
    "classId": "111",
    "classNumber": "109",
    "deptCode": "UNIV",
    "typicalYear": "Sophomore",
    "credits": 3,
    "topic": "Arts, letters, and sciences",
    "termsTaught": [
      "Fall",
      "Winter"
    ],
    "prereqs": [],
    "concurrentPrereqs": [],
    "category": "Gen",
    "genEdSets": [
      "2"
    ],
    "substitutionAllowed": false,
    "substitutionClassIds": [],
    "abetCategory": ""
  }
];

// src/simulator/engine.ts
var LAB_COREQUISITES = {
  "013": "017",
  // CBE 285 (Fluids lab, 0.5 cr) paired with CBE 374 (Fluid mechanics)
  "015": "021",
  // CBE 345 (Reactions lab, 0.5 cr) paired with CBE 386 (Chemical reactions eng)
  "020": "018",
  // CBE 385 (Heat & mass lab, 0.5 cr) paired with CBE 376 (Heat & mass transfer)
  "024": "026"
  // CBE 445 (Separations lab, 0.5 cr) paired with CBE 476 (Separations)
};
function sampleNormal(mean, stdDev) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + num * stdDev;
}
function isCourseOffered(c, currentTerm, sem) {
  for (const t of c.termsTaught) {
    if (t === currentTerm) return true;
    if (t.startsWith(currentTerm)) {
      if (t.toLowerCase().includes("every other")) {
        const academicYear = Math.ceil(sem / 2);
        return academicYear % 2 === 1;
      }
      return true;
    }
  }
  return false;
}
function isCourseExempted(classId, interventions) {
  if (classId === "035" && interventions.removeWrtg316) return true;
  if (classId === "034" && interventions.removeEcon110) return true;
  if (classId === "010" && interventions.removeMath303) return true;
  if (classId === "038" && interventions.removeChem464) return true;
  if (classId === "036" && interventions.removeStat121) return true;
  if ((classId === "002" || classId === "004" || classId === "022") && interventions.removeCbeSeminars) return true;
  return false;
}
function getDefaultInterventions() {
  return {
    offeringOverrides: {},
    relCreditsRequired: 14,
    engCreditsRequired: 9,
    emsbCreditsRequired: 4,
    epselCreditsRequired: 3,
    genEdSet: 1,
    creditOverrides: {},
    prereqOverrides: {},
    removeWrtg316: false,
    removeEcon110: false,
    removeMath303: false,
    removeChem464: false,
    removeStat121: false,
    removeCbeSeminars: false,
    populationMeanCredits: 14.5,
    populationStdDevCredits: 1.8,
    workingPercentage: 0.3,
    workPenaltyCredits: 2.5,
    enableSpringSummer: false,
    prereqMode: "strict",
    relaxCbe273To374: false,
    relaxCbe374To376: false,
    relaxCbe376To476: false,
    relaxMath302ToCbe374: false,
    relaxChem351ToCbe386: false
  };
}
function computeDownstreamWeights(coursesMap) {
  const weightMap = /* @__PURE__ */ new Map();
  for (const [id, course] of coursesMap.entries()) {
    const dependents = /* @__PURE__ */ new Set();
    const stack = [id];
    while (stack.length > 0) {
      const current = stack.pop();
      for (const [otherId, otherCourse] of coursesMap.entries()) {
        if (otherCourse.prereqs.includes(current) && !dependents.has(otherId)) {
          dependents.add(otherId);
          stack.push(otherId);
        }
      }
    }
    weightMap.set(id, dependents.size);
  }
  return weightMap;
}
function runSimulation(cohortSize = 250, customInterventions, courses = INITIAL_COURSES) {
  const interventions = {
    ...getDefaultInterventions(),
    ...customInterventions
  };
  const coursesMap = /* @__PURE__ */ new Map();
  for (const c of courses) {
    const overrideCredits = interventions.creditOverrides[c.classId] !== void 0 ? interventions.creditOverrides[c.classId] : c.credits;
    let overridePrereqs = interventions.prereqOverrides[c.classId] !== void 0 ? interventions.prereqOverrides[c.classId] : c.prereqs;
    let overrideConcurrent = [...c.concurrentPrereqs];
    if (interventions.prereqMode === "none") {
      overridePrereqs = [];
      overrideConcurrent = [];
    } else if (interventions.prereqMode === "concurrentCore") {
      if (c.classId === "017") overrideConcurrent.push("005");
      if (c.classId === "018") overrideConcurrent.push("017");
      if (c.classId === "026" || c.classId === "023") overrideConcurrent.push("018");
    } else if (interventions.prereqMode === "waiveMathChem") {
      if (c.classId === "017") overridePrereqs = overridePrereqs.filter((pId) => pId !== "007");
      if (c.classId === "021") overridePrereqs = overridePrereqs.filter((pId) => pId !== "032");
    }
    if (interventions.relaxCbe273To374 && c.classId === "017") {
      overrideConcurrent.push("005");
    }
    if (interventions.relaxCbe374To376 && c.classId === "018") {
      overrideConcurrent.push("017");
    }
    if (interventions.relaxCbe376To476 && (c.classId === "026" || c.classId === "023")) {
      overrideConcurrent.push("018");
    }
    if (interventions.relaxMath302ToCbe374 && c.classId === "017") {
      overridePrereqs = overridePrereqs.filter((pId) => pId !== "007");
    }
    if (interventions.relaxChem351ToCbe386 && c.classId === "021") {
      overridePrereqs = overridePrereqs.filter((pId) => pId !== "032");
    }
    if (interventions.removeWrtg316) {
      overridePrereqs = overridePrereqs.filter((pId) => pId !== "035");
    }
    if (interventions.removeEcon110) {
      overridePrereqs = overridePrereqs.filter((pId) => pId !== "034");
    }
    if (interventions.removeMath303) {
      overridePrereqs = overridePrereqs.filter((pId) => pId !== "010");
    }
    const overrideTerms = interventions.offeringOverrides[c.classId] !== void 0 ? interventions.offeringOverrides[c.classId] : c.termsTaught;
    coursesMap.set(c.classId, {
      ...c,
      credits: overrideCredits,
      prereqs: overridePrereqs,
      concurrentPrereqs: overrideConcurrent,
      termsTaught: overrideTerms
    });
  }
  const downstreamWeights = computeDownstreamWeights(coursesMap);
  const students = [];
  for (let i = 1; i <= cohortSize; i++) {
    const rawCreditPref = sampleNormal(
      interventions.populationMeanCredits,
      interventions.populationStdDevCredits
    );
    const maxCreditHours = Math.min(20, Math.max(12, Math.round(rawCreditPref * 2) / 2));
    const isWorking = Math.random() < interventions.workingPercentage;
    const workCreditPenalty = isWorking ? interventions.workPenaltyCredits : 0;
    const effectiveCreditLimit = Math.max(12, Math.round((maxCreditHours - workCreditPenalty) * 2) / 2);
    students.push({
      id: `STD-${1e3 + i}`,
      name: `Student ${i}`,
      meanCreditHours: interventions.populationMeanCredits,
      stdDevCreditHours: interventions.populationStdDevCredits,
      maxCreditHours,
      isWorking,
      workCreditPenalty,
      effectiveCreditLimit,
      currentSemester: 1,
      currentTerm: "Fall",
      completedCourses: /* @__PURE__ */ new Set(),
      failedPrereqs: [],
      isGraduated: false,
      semesterHistory: []
    });
  }
  const bottleneckCounter = /* @__PURE__ */ new Map();
  const MAX_SEMESTERS = 20;
  for (let sem = 1; sem <= MAX_SEMESTERS; sem++) {
    let activeStudents = 0;
    for (const student of students) {
      if (student.isGraduated) continue;
      activeStudents++;
      student.currentSemester = sem;
      const currentTerm = sem % 2 === 1 ? "Fall" : "Winter";
      student.currentTerm = currentTerm;
      let completedRelCredits = 0;
      let completedEngCredits = 0;
      let completedEmsbCredits = 0;
      let completedEpselCredits = 0;
      for (const classId of student.completedCourses) {
        const c = coursesMap.get(classId);
        if (!c) continue;
        if (c.category === "Rel") completedRelCredits += c.credits;
        else if (c.category === "Eng") completedEngCredits += c.credits;
        else if (c.category === "EMSB") completedEmsbCredits += c.credits;
        else if (c.category === "EPSEL") completedEpselCredits += c.credits;
      }
      const neededCourses = [];
      for (const c of coursesMap.values()) {
        if (student.completedCourses.has(c.classId)) continue;
        if (isCourseExempted(c.classId, interventions)) continue;
        if (c.substitutionAllowed && c.substitutionClassIds.length > 0) {
          const subDone = c.substitutionClassIds.some((subId) => student.completedCourses.has(subId));
          if (subDone) continue;
        }
        if (c.category === "Major") {
          neededCourses.push(c);
        } else if (c.category === "Gen") {
          const genMatch = c.genEdSets.length === 0 || c.genEdSets.includes(interventions.genEdSet.toString());
          if (genMatch) {
            neededCourses.push(c);
          }
        } else if (c.category === "Rel" && completedRelCredits < interventions.relCreditsRequired) {
          neededCourses.push(c);
        } else if (c.category === "Eng" && completedEngCredits < interventions.engCreditsRequired) {
          neededCourses.push(c);
        } else if (c.category === "EMSB" && completedEmsbCredits < interventions.emsbCreditsRequired) {
          neededCourses.push(c);
        } else if (c.category === "EPSEL" && completedEpselCredits < interventions.epselCreditsRequired) {
          neededCourses.push(c);
        }
      }
      const eligibleCourses = [];
      const bottleneckNotes = [];
      for (const c of neededCourses) {
        const missingPrereqs = c.prereqs.filter((pId) => {
          if (student.completedCourses.has(pId)) return false;
          if (c.concurrentPrereqs && c.concurrentPrereqs.includes(pId)) {
            const pCourse = coursesMap.get(pId);
            if (pCourse) {
              const pPrereqsMet = pCourse.prereqs.every((reqId) => student.completedCourses.has(reqId));
              const pOffered = isCourseOffered(pCourse, currentTerm, sem);
              if (pPrereqsMet && pOffered) {
                return false;
              }
            }
          }
          const lectureId2 = LAB_COREQUISITES[c.classId];
          if (lectureId2 === pId) {
            const lectureCompleted = student.completedCourses.has(lectureId2);
            const lectureCourse = coursesMap.get(lectureId2);
            const lecturePrereqsMet = lectureCourse ? lectureCourse.prereqs.every((reqId) => student.completedCourses.has(reqId)) : false;
            const lectureOffered = lectureCourse ? isCourseOffered(lectureCourse, currentTerm, sem) : false;
            if (lectureCompleted || lecturePrereqsMet && lectureOffered) {
              return false;
            }
          }
          return true;
        });
        const isOffered = isCourseOffered(c, currentTerm, sem);
        const isPrereqSatisfied = missingPrereqs.length === 0;
        if (!isPrereqSatisfied) {
          if (c.category === "Major") {
            student.failedPrereqs.push({
              courseId: c.classId,
              missingPrereqId: missingPrereqs[0] || lectureId || "",
              semester: sem
            });
          }
        } else if (!isOffered) {
          if (c.category === "Major") {
            const note = `${c.deptCode} ${c.classNumber} not offered in ${currentTerm} (Offered: ${c.termsTaught.join(", ")})`;
            bottleneckNotes.push(note);
            const b = bottleneckCounter.get(c.classId) || { timesDelayed: 0, totalSemesters: 0, studentSet: /* @__PURE__ */ new Set() };
            b.timesDelayed++;
            b.totalSemesters++;
            b.studentSet.add(student.id);
            bottleneckCounter.set(c.classId, b);
          }
        } else {
          eligibleCourses.push(c);
        }
      }
      eligibleCourses.sort((a, b) => {
        const dsA = downstreamWeights.get(a.classId) || 0;
        const dsB = downstreamWeights.get(b.classId) || 0;
        let weightA = 0;
        if (a.category === "Major") {
          weightA = dsA > 0 ? 100 + dsA * 10 : 35;
        } else if (a.category === "Gen") {
          weightA = 55;
        } else if (a.category === "Rel") {
          weightA = 45;
        } else {
          weightA = 30;
        }
        let weightB = 0;
        if (b.category === "Major") {
          weightB = dsB > 0 ? 100 + dsB * 10 : 35;
        } else if (b.category === "Gen") {
          weightB = 55;
        } else if (b.category === "Rel") {
          weightB = 45;
        } else {
          weightB = 30;
        }
        return weightB - weightA;
      });
      let termCreditLimit = student.effectiveCreditLimit;
      let currentCredits = 0;
      const enrolledIds = [];
      let runningRelCredits = completedRelCredits;
      let runningEngCredits = completedEngCredits;
      let runningEmsbCredits = completedEmsbCredits;
      let runningEpselCredits = completedEpselCredits;
      if (sem === 1 && !student.completedCourses.has("091")) {
        const univ101 = coursesMap.get("091");
        if (univ101) {
          enrolledIds.push("091");
          currentCredits += univ101.credits;
        }
      }
      for (const c of eligibleCourses) {
        if (enrolledIds.includes(c.classId)) continue;
        if (c.category === "Rel" && runningRelCredits >= interventions.relCreditsRequired) continue;
        if (c.category === "Eng" && runningEngCredits >= interventions.engCreditsRequired) continue;
        if (c.category === "EMSB" && runningEmsbCredits >= interventions.emsbCreditsRequired) continue;
        if (c.category === "EPSEL" && runningEpselCredits >= Math.max(interventions.epselCreditsRequired, 6)) continue;
        if (currentCredits + c.credits <= termCreditLimit + 0.5) {
          enrolledIds.push(c.classId);
          currentCredits += c.credits;
          if (c.category === "Rel") runningRelCredits += c.credits;
          else if (c.category === "Eng") runningEngCredits += c.credits;
          else if (c.category === "EMSB") runningEmsbCredits += c.credits;
          else if (c.category === "EPSEL") runningEpselCredits += c.credits;
          for (const [labId, lecId] of Object.entries(LAB_COREQUISITES)) {
            if (lecId === c.classId && !student.completedCourses.has(labId) && !enrolledIds.includes(labId)) {
              const labCourse = coursesMap.get(labId);
              if (labCourse && isCourseOffered(labCourse, currentTerm, sem)) {
                if (currentCredits + labCourse.credits <= student.maxCreditHours + 0.5) {
                  enrolledIds.push(labId);
                  currentCredits += labCourse.credits;
                }
              }
            }
          }
        } else if (c.category === "Major" && currentCredits + c.credits <= student.maxCreditHours + 0.5) {
          enrolledIds.push(c.classId);
          currentCredits += c.credits;
          for (const [labId, lecId] of Object.entries(LAB_COREQUISITES)) {
            if (lecId === c.classId && !student.completedCourses.has(labId) && !enrolledIds.includes(labId)) {
              const labCourse = coursesMap.get(labId);
              if (labCourse && isCourseOffered(labCourse, currentTerm, sem)) {
                if (currentCredits + labCourse.credits <= student.maxCreditHours + 0.5) {
                  enrolledIds.push(labId);
                  currentCredits += labCourse.credits;
                }
              }
            }
          }
        }
      }
      for (const classId of enrolledIds) {
        student.completedCourses.add(classId);
      }
      const log = {
        semester: sem,
        term: currentTerm,
        targetCreditLimit: termCreditLimit,
        enrolledCourseIds: enrolledIds,
        totalCredits: currentCredits,
        bottleneckNotes
      };
      student.semesterHistory.push(log);
      if (interventions.enableSpringSummer && currentTerm === "Winter" && !student.isGraduated) {
        let ssRelDone = 0;
        let ssEngDone = 0;
        let ssEmsbDone = 0;
        let ssEpselDone = 0;
        for (const classId of student.completedCourses) {
          const c = coursesMap.get(classId);
          if (!c) continue;
          if (c.category === "Rel") ssRelDone += c.credits;
          else if (c.category === "Eng") ssEngDone += c.credits;
          else if (c.category === "EMSB") ssEmsbDone += c.credits;
          else if (c.category === "EPSEL") ssEpselDone += c.credits;
        }
        const ssEligible = [];
        for (const c of coursesMap.values()) {
          if (student.completedCourses.has(c.classId)) continue;
          if (isCourseExempted(c.classId, interventions)) continue;
          if (c.substitutionAllowed && c.substitutionClassIds.length > 0) {
            const subDone = c.substitutionClassIds.some((subId) => student.completedCourses.has(subId));
            if (subDone) continue;
          }
          const missingPrereqs = c.prereqs.filter((pId) => !student.completedCourses.has(pId));
          if (missingPrereqs.length > 0) continue;
          const isSpringSummerOffered = c.termsTaught.includes("Spring") || c.termsTaught.includes("Summer");
          const isGenEdOrRel = c.category === "Gen" || c.category === "Rel";
          if (isGenEdOrRel || isSpringSummerOffered) {
            if (c.category === "Gen") {
              const genMatch = c.genEdSets.length === 0 || c.genEdSets.includes(interventions.genEdSet.toString());
              if (genMatch) ssEligible.push(c);
            } else if (c.category === "Rel" && ssRelDone < interventions.relCreditsRequired) ssEligible.push(c);
            else if (c.category === "Eng" && isSpringSummerOffered && ssEngDone < interventions.engCreditsRequired) ssEligible.push(c);
            else if (c.category === "EMSB" && isSpringSummerOffered && ssEmsbDone < interventions.emsbCreditsRequired) ssEligible.push(c);
            else if (c.category === "EPSEL" && isSpringSummerOffered && ssEpselDone < Math.max(interventions.epselCreditsRequired, 6)) ssEligible.push(c);
            else if (c.category === "Major" && isSpringSummerOffered) ssEligible.push(c);
          }
        }
        let ssCredits = 0;
        const ssEnrolled = [];
        for (const c of ssEligible) {
          if (c.category === "Rel" && ssRelDone >= interventions.relCreditsRequired) continue;
          if (c.category === "Eng" && ssEngDone >= interventions.engCreditsRequired) continue;
          if (c.category === "EMSB" && ssEmsbDone >= interventions.emsbCreditsRequired) continue;
          if (c.category === "EPSEL" && ssEpselDone >= Math.max(interventions.epselCreditsRequired, 6)) continue;
          if (ssCredits + c.credits <= 6.5) {
            ssEnrolled.push(c.classId);
            ssCredits += c.credits;
            student.completedCourses.add(c.classId);
            if (c.category === "Rel") ssRelDone += c.credits;
            else if (c.category === "Eng") ssEngDone += c.credits;
            else if (c.category === "EMSB") ssEmsbDone += c.credits;
            else if (c.category === "EPSEL") ssEpselDone += c.credits;
          }
        }
        if (ssEnrolled.length > 0) {
          student.semesterHistory.push({
            semester: sem,
            term: "Spring",
            targetCreditLimit: 6,
            enrolledCourseIds: ssEnrolled,
            totalCredits: ssCredits,
            bottleneckNotes: [`Spring/Summer Term: Completed ${ssCredits} cr of GenEd/Rel/Electives`]
          });
        }
      }
      let relDone = 0;
      let engDone = 0;
      let emsbDone = 0;
      let epselDone = 0;
      for (const classId of student.completedCourses) {
        const c = coursesMap.get(classId);
        if (!c) continue;
        if (c.category === "Rel") relDone += c.credits;
        else if (c.category === "Eng") engDone += c.credits;
        else if (c.category === "EMSB") emsbDone += c.credits;
        else if (c.category === "EPSEL") epselDone += c.credits;
      }
      const majorCoursesAll = Array.from(coursesMap.values()).filter((c) => c.category === "Major");
      const majorFinished = majorCoursesAll.every((c) => {
        if (isCourseExempted(c.classId, interventions)) return true;
        if (student.completedCourses.has(c.classId)) return true;
        if (c.substitutionAllowed && c.substitutionClassIds.some((subId) => student.completedCourses.has(subId))) return true;
        return false;
      });
      const activeGenSetStr = interventions.genEdSet.toString();
      const genCoursesAll = Array.from(coursesMap.values()).filter(
        (c) => c.category === "Gen" && (c.genEdSets.length === 0 || c.genEdSets.includes(activeGenSetStr))
      );
      const genFinished = genCoursesAll.every((c) => {
        if (isCourseExempted(c.classId, interventions)) return true;
        if (student.completedCourses.has(c.classId)) return true;
        if (c.substitutionAllowed && c.substitutionClassIds.some((subId) => student.completedCourses.has(subId))) return true;
        return false;
      });
      const relFinished = relDone >= interventions.relCreditsRequired;
      const engFinished = engDone >= interventions.engCreditsRequired;
      const emsbFinished = emsbDone >= interventions.emsbCreditsRequired;
      const epselFinished = epselDone >= interventions.epselCreditsRequired;
      if (majorFinished && genFinished && relFinished && engFinished && emsbFinished && epselFinished) {
        student.isGraduated = true;
        student.graduationSemester = sem;
      }
    }
    if (activeStudents === 0) break;
  }
  for (const s of students) {
    if (!s.isGraduated) {
      s.graduationSemester = MAX_SEMESTERS;
    }
  }
  const semList = students.map((s) => s.graduationSemester);
  const sumSem = semList.reduce((a, b) => a + b, 0);
  const averageGraduationSemesters = Math.round(sumSem / cohortSize * 10) / 10;
  semList.sort((a, b) => a - b);
  const medianGraduationSemesters = semList[Math.floor(cohortSize / 2)];
  const minSemesters = semList[0];
  const maxSemesters = semList[cohortSize - 1];
  const eightSemCount = semList.filter((s) => s <= 8).length;
  const tenSemCount = semList.filter((s) => s <= 10).length;
  const eightSemesterGradRate = Math.round(eightSemCount / cohortSize * 100);
  const tenSemesterGradRate = Math.round(tenSemCount / cohortSize * 100);
  const semesterDistribution = {};
  for (const sem of semList) {
    semesterDistribution[sem] = (semesterDistribution[sem] || 0) + 1;
  }
  const cumulativeGraduation = [];
  let cumCount = 0;
  for (let s = 6; s <= 14; s++) {
    const countAtSem = semesterDistribution[s] || 0;
    cumCount += countAtSem;
    cumulativeGraduation.push({
      semester: s,
      count: cumCount,
      rate: Math.round(cumCount / cohortSize * 100)
    });
  }
  const bottlenecks = [];
  for (const [classId, stat] of bottleneckCounter.entries()) {
    const course = coursesMap.get(classId);
    if (!course) continue;
    bottlenecks.push({
      courseId: classId,
      courseName: `${course.deptCode} ${course.classNumber} - ${course.topic}`,
      category: course.category,
      timesDelayed: stat.timesDelayed,
      totalSemestersDelayed: stat.totalSemesters,
      affectedStudentsCount: stat.studentSet.size,
      primaryReason: `Course offered in ${course.termsTaught.join(", ")} only`
    });
  }
  bottlenecks.sort((a, b) => b.timesDelayed - a.timesDelayed);
  return {
    cohortSize,
    averageGraduationSemesters,
    medianGraduationSemesters,
    minSemesters,
    maxSemesters,
    eightSemesterGradRate,
    tenSemesterGradRate,
    semesterDistribution,
    cumulativeGraduation,
    bottlenecks,
    students
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultInterventions,
  isCourseExempted,
  isCourseOffered,
  runSimulation
});
