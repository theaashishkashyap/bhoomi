export interface VillagePlot {
  id: string;
  owner: string;
  area: number;
  type: "AGRICULTURAL" | "RESIDENTIAL" | "COMMERCIAL";
  surveyNo: string;
  status: "VERIFIED" | "PENDING" | "DISPUTED";
  lastTransaction: string;
  value: number;
  svgPath: string; // The SVG path data for the plot polygon
  center: { x: number; y: number }; // For labels
}

export const VILLAGE_DATA: VillagePlot[] = [
  {
    id: "VP-101",
    owner: "Ramphal Yadav",
    area: 1200,
    type: "AGRICULTURAL",
    surveyNo: "S-45/1",
    status: "VERIFIED",
    lastTransaction: "2024-05-12",
    value: 2500000,
    svgPath: "M 50 50 L 250 50 L 250 200 L 50 200 Z",
    center: { x: 150, y: 125 }
  },
  {
    id: "VP-102",
    owner: "Suresh Chandra",
    area: 800,
    type: "RESIDENTIAL",
    surveyNo: "S-45/2",
    status: "VERIFIED",
    lastTransaction: "2023-11-20",
    value: 4500000,
    svgPath: "M 260 50 L 400 50 L 400 150 L 260 150 Z",
    center: { x: 330, y: 100 }
  },
  {
    id: "VP-103",
    owner: "Meena Kumari",
    area: 1500,
    type: "AGRICULTURAL",
    surveyNo: "S-46/A",
    status: "DISPUTED",
    lastTransaction: "2022-01-15",
    value: 3000000,
    svgPath: "M 410 50 L 600 50 L 600 250 L 410 250 Z",
    center: { x: 505, y: 150 }
  },
  {
    id: "VP-104",
    owner: "Om Prakash",
    area: 450,
    type: "COMMERCIAL",
    surveyNo: "S-12/C",
    status: "VERIFIED",
    lastTransaction: "2025-01-10",
    value: 7500000,
    svgPath: "M 610 50 L 750 50 L 750 150 L 610 150 Z",
    center: { x: 680, y: 100 }
  },
  {
    id: "VP-105",
    owner: "Gopal Das",
    area: 2000,
    type: "AGRICULTURAL",
    surveyNo: "S-47",
    status: "PENDING",
    lastTransaction: "2024-08-05",
    value: 3800000,
    svgPath: "M 50 210 L 250 210 L 250 400 L 50 400 Z",
    center: { x: 150, y: 305 }
  },
  {
    id: "VP-106",
    owner: "Laxmi Devi",
    area: 600,
    type: "RESIDENTIAL",
    surveyNo: "S-48/1",
    status: "VERIFIED",
    lastTransaction: "2023-06-18",
    value: 3200000,
    svgPath: "M 260 160 L 400 160 L 400 300 L 260 300 Z",
    center: { x: 330, y: 230 }
  },
  {
    id: "VP-107",
    owner: "Vikram Singh",
    area: 950,
    type: "RESIDENTIAL",
    surveyNo: "S-48/2",
    status: "VERIFIED",
    lastTransaction: "2024-12-22",
    value: 4800000,
    svgPath: "M 260 310 L 400 310 L 400 450 L 260 450 Z",
    center: { x: 330, y: 380 }
  },
  {
    id: "VP-108",
    owner: "Anil Maurya",
    area: 3000,
    type: "AGRICULTURAL",
    surveyNo: "S-50",
    status: "VERIFIED",
    lastTransaction: "2021-09-30",
    value: 6200000,
    svgPath: "M 410 260 L 750 260 L 750 450 L 410 450 Z",
    center: { x: 580, y: 355 }
  },
  {
    id: "VP-109",
    owner: "Radha Rani",
    area: 350,
    type: "COMMERCIAL",
    surveyNo: "S-12/D",
    status: "VERIFIED",
    lastTransaction: "2025-02-01",
    value: 5500000,
    svgPath: "M 610 160 L 750 160 L 750 250 L 610 250 Z",
    center: { x: 680, y: 205 }
  },
  {
    id: "VP-110",
    owner: "Kailash Giri",
    area: 1100,
    type: "RESIDENTIAL",
    surveyNo: "S-51",
    status: "PENDING",
    lastTransaction: "2024-03-14",
    value: 5200000,
    svgPath: "M 760 50 L 950 50 L 950 200 L 760 200 Z",
    center: { x: 855, y: 125 }
  },
  {
    id: "VP-111",
    owner: "Sunita Verma",
    area: 2500,
    type: "AGRICULTURAL",
    surveyNo: "S-52",
    status: "DISPUTED",
    lastTransaction: "2020-05-25",
    value: 4000000,
    svgPath: "M 760 210 L 950 210 L 950 450 L 760 450 Z",
    center: { x: 855, y: 330 }
  },
  {
    id: "VP-112",
    owner: "Harish Panday",
    area: 700,
    type: "RESIDENTIAL",
    surveyNo: "S-53/A",
    status: "VERIFIED",
    lastTransaction: "2024-10-10",
    value: 3900000,
    svgPath: "M 50 410 L 250 410 L 250 550 L 50 550 Z",
    center: { x: 150, y: 480 }
  },
  {
    id: "VP-113",
    owner: "Rajesh Mishra",
    area: 1300,
    type: "AGRICULTURAL",
    surveyNo: "S-54",
    status: "VERIFIED",
    lastTransaction: "2023-01-05",
    value: 2800000,
    svgPath: "M 410 460 L 600 460 L 600 600 L 410 600 Z",
    center: { x: 505, y: 530 }
  },
  {
    id: "VP-114",
    owner: "Santosh Tiwari",
    area: 500,
    type: "COMMERCIAL",
    surveyNo: "S-13",
    status: "VERIFIED",
    lastTransaction: "2024-11-30",
    value: 8200000,
    svgPath: "M 610 460 L 950 460 L 950 600 L 610 600 Z",
    center: { x: 780, y: 530 }
  },
  {
    id: "VP-115",
    owner: "Kamla Bai",
    area: 900,
    type: "AGRICULTURAL",
    surveyNo: "S-55",
    status: "VERIFIED",
    lastTransaction: "2022-07-22",
    value: 1900000,
    svgPath: "M 260 460 L 400 460 L 400 600 L 260 600 Z",
    center: { x: 330, y: 530 }
  }
];
