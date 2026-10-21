// YouCrick — Comprehensive Cricket Dataset (Matches, Scorecards, Commentary, Rankings, Stats, News)
window.YOUCRICK_DATA = {
  matches: [
    {
      id: "m1",
      series: "Border-Gavaskar Trophy 2026-27 • 1st Test",
      category: "International",
      format: "TEST",
      status: "LIVE",
      statusBadge: "DAY 4 • SESSION 3",
      venue: "Melbourne Cricket Ground (MCG), Melbourne",
      toss: "India won the toss and elected to bat first",
      umpires: "Richard Kettleborough (ENG), Nitin Menon (IND) • TV: Chris Gaffaney (NZ)",
      referee: "Ranjan Madugalle (SL)",
      weather: { condition: "Partly Cloudy", temp: "22°C", humidity: "54%", rainChance: "10%", wind: "18 km/h SW" },
      pitchReport: "Firm Melbourne drop-in surface with true bounce. Seam movement with the second new ball; spinners getting sharp turn out of the footmarks on Day 4.",
      team1: { code: "IND", name: "India", flag: "🇮🇳", score: "384 & 268/4", overs: "74.2", crr: "3.60", winProb: 68 },
      team2: { code: "AUS", name: "Australia", flag: "🇦🇺", score: "312 & Yet to bat", overs: "96.4", rrr: "—", winProb: 18 },
      drawProb: 14,
      summaryText: "India lead by 340 runs with 6 wickets remaining in 2nd Innings",
      currentPartnership: { runs: 114, balls: 168, p1: "Rishabh Pant 64*(78)", p2: "Yashasvi Jaiswal 118*(204)" },
      currentBatters: [
        { name: "Yashasvi Jaiswal", runs: 118, balls: 204, fours: 13, sixes: 2, sr: "57.84", onStrike: true, role: "LHB" },
        { name: "Rishabh Pant", runs: 64, balls: 78, fours: 7, sixes: 3, sr: "82.05", onStrike: false, role: "LHB • WK" }
      ],
      currentBowlers: [
        { name: "Pat Cummins (c)", overs: "18.2", maidens: 3, runs: 62, wickets: 2, econ: "3.38", current: true },
        { name: "Nathan Lyon", overs: "24.0", maidens: 4, runs: 76, wickets: 1, econ: "3.17", current: false }
      ],
      recentBalls: ["0", "4", "0", "1", "6", "0", "2", "0", "4", "1", "0", "1"],
      headToHead: { t1Wins: 33, t2Wins: 45, draws: 29, last5: ["IND", "AUS", "IND", "DRAW", "IND"] },
      manhattan1: [18, 29, 34, 42, 38, 49, 55, 44, 62, 51, 68, 72, 48, 59, 64, 52, 47, 61, 58, 70],
      manhattan2: [22, 35, 41, 48, 52, 60, 58, 67, 74, 81, 69, 77, 84, 79, 92, 88, 95, 102, 110, 118],
      innings: [
        {
          title: "India 2nd Innings",
          shortTitle: "IND 2nd Inn",
          total: "268/4 (74.2 Ov)",
          extras: "14 (b 4, lb 5, w 2, nb 3)",
          fow: "1-24 (KL Rahul, 8.2 ov), 2-78 (Shubman Gill, 24.5 ov), 3-142 (Virat Kohli, 46.1 ov), 4-154 (Ravindra Jadeja, 49.4 ov)",
          dnb: "Nitish Kumar Reddy, Washington Sundar, Jasprit Bumrah, Mohammed Siraj, Akash Deep",
          batters: [
            { name: "Yashasvi Jaiswal", dismissal: "not out", r: 118, b: 204, fours: 13, sixes: 2, sr: "57.84", active: true },
            { name: "KL Rahul", dismissal: "c Carey b Starc", r: 12, b: 29, fours: 2, sixes: 0, sr: "41.38" },
            { name: "Shubman Gill", dismissal: "lbw b Boland", r: 28, b: 54, fours: 4, sixes: 0, sr: "51.85" },
            { name: "Virat Kohli", dismissal: "c Smith b Cummins", r: 31, b: 68, fours: 3, sixes: 0, sr: "45.59" },
            { name: "Ravindra Jadeja", dismissal: "c Labuschagne b Lyon", r: 1, b: 11, fours: 0, sixes: 0, sr: "9.09" },
            { name: "Rishabh Pant (wk)", dismissal: "not out", r: 64, b: 78, fours: 7, sixes: 3, sr: "82.05", active: true }
          ],
          bowlers: [
            { name: "Mitchell Starc", o: "16.0", m: 2, r: 68, w: 1, nb: 1, wd: 1, eco: "4.25" },
            { name: "Pat Cummins (c)", o: "18.2", m: 3, r: 62, w: 2, nb: 2, wd: 0, eco: "3.38" },
            { name: "Scott Boland", o: "16.0", m: 4, r: 53, w: 0, nb: 0, wd: 1, eco: "3.31" },
            { name: "Nathan Lyon", o: "24.0", m: 4, r: 76, w: 1, nb: 0, wd: 0, eco: "3.17" }
          ]
        },
        {
          title: "Australia 1st Innings",
          shortTitle: "AUS 1st Inn",
          total: "312/10 (96.4 Ov)",
          extras: "11 (b 2, lb 4, w 1, nb 4)",
          fow: "1-38 (Khawaja), 2-89 (McSweeney), 3-145 (Labuschagne), 4-238 (Smith), 5-274 (Head)",
          dnb: "None",
          batters: [
            { name: "Usman Khawaja", dismissal: "c Pant b Bumrah", r: 19, b: 51, fours: 2, sixes: 0, sr: "37.25" },
            { name: "Sam Konstas", dismissal: "b Siraj", r: 44, b: 62, fours: 6, sixes: 1, sr: "70.97" },
            { name: "Marnus Labuschagne", dismissal: "lbw b Jadeja", r: 52, b: 134, fours: 5, sixes: 0, sr: "38.81" },
            { name: "Steven Smith", dismissal: "c Rahul b Bumrah", r: 104, b: 198, fours: 11, sixes: 1, sr: "52.53" },
            { name: "Travis Head", dismissal: "b Bumrah", r: 41, b: 48, fours: 6, sixes: 1, sr: "85.42" },
            { name: "Alex Carey (wk)", dismissal: "not out", r: 31, b: 64, fours: 3, sixes: 0, sr: "48.44" }
          ],
          bowlers: [
            { name: "Jasprit Bumrah (c)", o: "26.4", m: 8, r: 64, w: 5, nb: 2, wd: 0, eco: "2.40" },
            { name: "Mohammed Siraj", o: "22.0", m: 3, r: 79, w: 2, nb: 1, wd: 1, eco: "3.59" },
            { name: "Akash Deep", o: "20.0", m: 4, r: 68, w: 1, nb: 1, wd: 0, eco: "3.40" },
            { name: "Ravindra Jadeja", o: "28.0", m: 5, r: 95, w: 2, nb: 0, wd: 0, eco: "3.39" }
          ]
        }
      ],
      commentary: [
        { over: "74.2", ball: "1", type: "run", batter: "Jaiswal", bowler: "Cummins", text: "Cummins bangs it in short of a length outside off, Jaiswal rides the bounce and steers it past gully for a brisk single." },
        { over: "74.1", ball: "0", type: "dot", batter: "Jaiswal", bowler: "Cummins", text: "Full and angling across off stump at 141.6 kph, Jaiswal watches it closely and shoulders arms." },
        { over: "73.6", ball: "4", type: "four", batter: "Pant", bowler: "Lyon", text: "FOUR! Audacious from Rishabh Pant! Steps down the track to Nathan Lyon and whips it against the spin through midwicket for a scorching boundary!" },
        { over: "73.5", ball: "1", type: "milestone", batter: "Jaiswal", bowler: "Lyon", text: "MILESTONE! Jaiswal tucks it off his pads to deep square leg. The 100-run partnership between Jaiswal and Pant comes up in just 146 balls!" },
        { over: "73.4", ball: "6", type: "six", batter: "Pant", bowler: "Lyon", text: "SIX! One-handed maximum! Pant gets down on one knee and slog-sweeps Lyon 88 meters into the second tier at deep midwicket!" },
        { over: "72.3", ball: "4", type: "four", batter: "Jaiswal", bowler: "Cummins", text: "FOUR! Glorious cover drive! Overpitched by a fraction and Jaiswal leans into it, threading the gap between cover and mid-off." },
        { over: "49.4", ball: "W", type: "wicket", batter: "Jadeja", bowler: "Lyon", text: "OUT! Caught at silly point! Lyon gets one to spit out of the rough, kisses the inside shoulder of Jadeja's bat and Labuschagne takes a sharp reflex catch!" }
      ],
      squads: {
        t1Playing: ["Yashasvi Jaiswal", "KL Rahul", "Shubman Gill", "Virat Kohli", "Rishabh Pant (wk)", "Ravindra Jadeja", "Nitish Kumar Reddy", "Washington Sundar", "Jasprit Bumrah (c)", "Mohammed Siraj", "Akash Deep"],
        t1Bench: ["Dhruv Jurel", "Sarfaraz Khan", "Prasidh Krishna", "Harshit Rana"],
        t2Playing: ["Usman Khawaja", "Sam Konstas", "Marnus Labuschagne", "Steven Smith", "Travis Head", "Mitchell Marsh", "Alex Carey (wk)", "Pat Cummins (c)", "Mitchell Starc", "Nathan Lyon", "Scott Boland"],
        t2Bench: ["Josh Inglis", "Beau Webster", "Sean Abbott", "Jhye Richardson"]
      }
    },
    {
      id: "m2",
      series: "Indian Premier League 2026 • Match 42",
      category: "T20 Leagues",
      format: "T20",
      status: "LIVE",
      statusBadge: "LIVE • CHASE ON",
      venue: "Wankhede Stadium, Mumbai",
      toss: "Mumbai Indians won the toss and elected to field",
      umpires: "Anil Chaudhary, KN Ananthapadmanabhan • TV: Virender Sharma",
      referee: "Javagal Srinath",
      weather: { condition: "Clear & Humid", temp: "29°C", humidity: "72%", rainChance: "0%", wind: "14 km/h W" },
      pitchReport: "Classic red-soil Wankhede belter! Evening dew makes chasing advantageous; par score is 215+.",
      team1: { code: "CSK", name: "Chennai Super Kings", flag: "🦁", score: "218/5", overs: "20.0", crr: "10.90", winProb: 44 },
      team2: { code: "MI", name: "Mumbai Indians", flag: "🌀", score: "184/4", overs: "17.2", crr: "10.61", rrr: "13.12", winProb: 56 },
      drawProb: 0,
      summaryText: "Mumbai Indians need 35 runs in 16 balls (RRR: 13.12)",
      currentPartnership: { runs: 68, balls: 33, p1: "Suryakumar Yadav 79*(39)", p2: "Hardik Pandya 28*(14)" },
      currentBatters: [
        { name: "Suryakumar Yadav", runs: 79, balls: 39, fours: 7, sixes: 5, sr: "202.56", onStrike: true, role: "RHB" },
        { name: "Hardik Pandya (c)", runs: 28, balls: 14, fours: 2, sixes: 2, sr: "200.00", onStrike: false, role: "RHB • All-rounder" }
      ],
      currentBowlers: [
        { name: "Matheesha Pathirana", overs: "3.2", maidens: 0, runs: 31, wickets: 2, econ: "9.30", current: true },
        { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 38, wickets: 1, econ: "9.50", current: false }
      ],
      recentBalls: ["6", "4", "1", "W", "0", "4", "2", "6", "1", "4", "1", "6"],
      headToHead: { t1Wins: 18, t2Wins: 21, draws: 0, last5: ["CSK", "CSK", "MI", "CSK", "MI"] },
      manhattan1: [11, 14, 9, 16, 12, 15, 8, 11, 13, 10, 14, 9, 12, 15, 7, 13, 18, 16, 14, 19],
      manhattan2: [13, 10, 15, 12, 18, 9, 11, 14, 8, 12, 16, 10, 11, 15, 13, 17, 19, 18, 0, 0],
      innings: [
        {
          title: "Mumbai Indians Innings (Target: 219)",
          shortTitle: "MI Inn",
          total: "184/4 (17.2 Ov)",
          extras: "8 (lb 2, w 5, nb 1)",
          fow: "1-42 (Ishan Kishan, 4.1 ov), 2-76 (Rohit Sharma, 7.5 ov), 3-108 (Tilak Varma, 11.4 ov), 4-116 (Tim David, 12.5 ov)",
          dnb: "Naman Dhir, Mitchell Santner, Jasprit Bumrah, Trent Boult, Deepak Chahar",
          batters: [
            { name: "Rohit Sharma", dismissal: "c Gaikwad b Pathirana", r: 44, b: 25, fours: 5, sixes: 3, sr: "176.00" },
            { name: "Ishan Kishan (wk)", dismissal: "b Deshpande", r: 21, b: 14, fours: 3, sixes: 1, sr: "150.00" },
            { name: "Suryakumar Yadav", dismissal: "not out", r: 79, b: 39, fours: 7, sixes: 5, sr: "202.56", active: true },
            { name: "Tilak Varma", dismissal: "st Dhoni b Jadeja", r: 19, b: 13, fours: 2, sixes: 1, sr: "146.15" },
            { name: "Hardik Pandya (c)", dismissal: "not out", r: 28, b: 14, fours: 2, sixes: 2, sr: "200.00", active: true }
          ],
          bowlers: [
            { name: "Khaleel Ahmed", o: "3.0", m: 0, r: 36, w: 0, nb: 0, wd: 2, eco: "12.00" },
            { name: "Ravindra Jadeja", o: "4.0", m: 0, r: 38, w: 1, nb: 0, wd: 0, eco: "9.50" },
            { name: "Noor Ahmad", o: "4.0", m: 0, r: 34, w: 1, nb: 0, wd: 1, eco: "8.50" },
            { name: "Matheesha Pathirana", o: "3.2", m: 0, r: 31, w: 2, nb: 1, wd: 2, eco: "9.30" }
          ]
        },
        {
          title: "Chennai Super Kings Innings",
          shortTitle: "CSK Inn",
          total: "218/5 (20.0 Ov)",
          extras: "9 (lb 3, w 5, nb 1)",
          fow: "1-54 (Conway), 2-132 (Gaikwad), 3-178 (Dube), 4-196 (Jadeja)",
          dnb: "Ravichandran Ashwin, Noor Ahmad, Matheesha Pathirana, Khaleel Ahmed",
          batters: [
            { name: "Ruturaj Gaikwad (c)", dismissal: "c Tilak b Bumrah", r: 78, b: 46, fours: 8, sixes: 4, sr: "169.57" },
            { name: "Devon Conway", dismissal: "b Boult", r: 29, b: 19, fours: 4, sixes: 1, sr: "152.63" },
            { name: "Shivam Dube", dismissal: "c Sky b Pandya", r: 58, b: 27, fours: 3, sixes: 6, sr: "214.81" },
            { name: "MS Dhoni (wk)", dismissal: "not out", r: 26, b: 9, fours: 2, sixes: 3, sr: "288.89" }
          ],
          bowlers: [
            { name: "Trent Boult", o: "4.0", m: 0, r: 44, w: 1, nb: 0, wd: 2, eco: "11.00" },
            { name: "Jasprit Bumrah", o: "4.0", m: 0, r: 28, w: 2, nb: 1, wd: 0, eco: "7.00" },
            { name: "Hardik Pandya (c)", o: "4.0", m: 0, r: 49, w: 1, nb: 0, wd: 2, eco: "12.25" },
            { name: "Mitchell Santner", o: "4.0", m: 0, r: 36, w: 1, nb: 0, wd: 1, eco: "9.00" }
          ]
        }
      ],
      commentary: [
        { over: "17.2", ball: "6", type: "six", batter: "Suryakumar", bowler: "Pathirana", text: "SIX! Vintage 360° SKY! Sits deep in the crease to a 148 kph yorker and ramps it over fine leg into the Wankhede roar!" },
        { over: "17.1", ball: "1", type: "run", batter: "Hardik", bowler: "Pathirana", text: "Slingy low full toss on leg stump, Hardik drills it to long-on for a single to bring SKY back on strike." },
        { over: "16.6", ball: "4", type: "four", batter: "Suryakumar", bowler: "Noor Ahmad", text: "FOUR! Inside-out over extra cover! Suryakumar reads the wrong'un from the hand and carves it away." },
        { over: "12.5", ball: "W", type: "wicket", batter: "Tim David", bowler: "Pathirana", text: "OUT! Castled by a 150.4 kph toe-crusher! Pathirana nails the base of middle stump!" }
      ],
      squads: {
        t1Playing: ["Ruturaj Gaikwad (c)", "Devon Conway", "Rachin Ravindra", "Shivam Dube", "Ravindra Jadeja", "Sam Curran", "MS Dhoni (wk)", "Ravichandran Ashwin", "Noor Ahmad", "Matheesha Pathirana", "Khaleel Ahmed"],
        t1Bench: ["Rahul Tripathi", "Vijay Shankar", "Deepak Hooda", "Anshul Kamboj"],
        t2Playing: ["Rohit Sharma", "Ishan Kishan (wk)", "Suryakumar Yadav", "Tilak Varma", "Hardik Pandya (c)", "Tim David", "Naman Dhir", "Mitchell Santner", "Jasprit Bumrah", "Trent Boult", "Deepak Chahar"],
        t2Bench: ["Will Jacks", "Robin Minz", "Karn Sharma", "Reece Topley"]
      }
    },
    {
      id: "m3",
      series: "England vs South Africa ODI Series 2026 • 2nd ODI",
      category: "International",
      format: "ODI",
      status: "LIVE",
      statusBadge: "LIVE • INNINGS 2",
      venue: "Lord's Cricket Ground, London",
      toss: "South Africa won the toss and elected to bat",
      umpires: "Michael Gough, Adrian Holdstock",
      referee: "Jeff Crowe",
      weather: { condition: "Overcast", temp: "16°C", humidity: "68%", rainChance: "20%", wind: "21 km/h NW" },
      pitchReport: "Good carry and nibble off the Lord's slope; batters well set can score briskly square of the wicket.",
      team1: { code: "RSA", name: "South Africa", flag: "🇿🇦", score: "316/6", overs: "50.0", crr: "6.32", winProb: 52 },
      team2: { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: "212/3", overs: "34.0", crr: "6.23", rrr: "6.56", winProb: 48 },
      drawProb: 0,
      summaryText: "England need 105 runs in 96 balls (RRR: 6.56)",
      currentPartnership: { runs: 89, balls: 78, p1: "Joe Root 74*(82)", p2: "Harry Brook 52*(46)" },
      currentBatters: [
        { name: "Joe Root", runs: 74, balls: 82, fours: 7, sixes: 1, sr: "90.24", onStrike: true, role: "RHB" },
        { name: "Harry Brook", runs: 52, balls: 46, fours: 5, sixes: 2, sr: "113.04", onStrike: false, role: "RHB" }
      ],
      currentBowlers: [
        { name: "Kagiso Rabada", overs: "7.0", maidens: 0, runs: 41, wickets: 2, econ: "5.86", current: true },
        { name: "Keshav Maharaj", overs: "8.0", maidens: 1, runs: 44, wickets: 1, econ: "5.50", current: false }
      ],
      recentBalls: ["1", "0", "4", "1", "2", "0", "1", "1", "4", "0", "1", "2"],
      headToHead: { t1Wins: 35, t2Wins: 30, draws: 1, last5: ["RSA", "ENG", "RSA", "RSA", "ENG"] },
      manhattan1: [24, 31, 28, 35, 30, 38, 29, 34, 42, 49],
      manhattan2: [28, 33, 27, 36, 31, 35, 22, 0, 0, 0],
      innings: [],
      commentary: [
        { over: "34.0", ball: "2", type: "run", batter: "Root", bowler: "Rabada", text: "Root opens the face of the bat and glides it down to third man for a comfortable brace." },
        { over: "33.4", ball: "4", type: "four", batter: "Brook", bowler: "Rabada", text: "FOUR! Stand and deliver! Brook climbs into a short-of-length delivery and pulls it fiercely in front of square!" }
      ],
      squads: {
        t1Playing: ["Temba Bavuma (c)", "Ryan Rickelton", "Aiden Markram", "Heinrich Klaasen (wk)", "Tristan Stubbs", "David Miller", "Marco Jansen", "Keshav Maharaj", "Kagiso Rabada", "Anrich Nortje", "Lungi Ngidi"],
        t1Bench: ["Tony de Zorzi", "Wiaan Mulder", "Tabraiz Shamsi"],
        t2Playing: ["Phil Salt", "Ben Duckett", "Joe Root", "Harry Brook", "Jos Buttler (c & wk)", "Liam Livingstone", "Sam Curran", "Jofra Archer", "Adil Rashid", "Mark Wood", "Gus Atkinson"],
        t2Bench: ["Will Jacks", "Jamie Smith", "Reece Topley"]
      }
    },
    {
      id: "m4",
      series: "ICC Women's T20 Tri-Series 2026 • Final",
      category: "Women",
      format: "WT20I",
      status: "RESULT",
      statusBadge: "RESULT • IND-W WON",
      venue: "Eden Gardens, Kolkata",
      toss: "India Women won the toss and elected to bat",
      umpires: "Claire Polosak, Vrinda Rathi",
      referee: "GS Lakshmi",
      weather: { condition: "Pleasant Evening", temp: "26°C", humidity: "60%", rainChance: "0%", wind: "10 km/h S" },
      pitchReport: "Fast outfield at Eden Gardens with grip for finger spinners under lights.",
      team1: { code: "IND-W", name: "India Women", flag: "🇮🇳", score: "176/4", overs: "20.0", crr: "8.80", winProb: 100 },
      team2: { code: "AUS-W", name: "Australia Women", flag: "🇦🇺", score: "162/8", overs: "20.0", crr: "8.10", rrr: "—", winProb: 0 },
      drawProb: 0,
      summaryText: "India Women beat Australia Women by 14 runs to lift the Tri-Series Trophy",
      currentPartnership: { runs: 42, balls: 24, p1: "Smriti Mandhana 84(51)", p2: "Harmanpreet Kaur 46*(28)" },
      currentBatters: [
        { name: "Smriti Mandhana", runs: 84, balls: 51, fours: 11, sixes: 3, sr: "164.71", onStrike: true, role: "LHB" },
        { name: "Harmanpreet Kaur (c)", runs: 46, balls: 28, fours: 5, sixes: 2, sr: "164.29", onStrike: false, role: "RHB" }
      ],
      currentBowlers: [
        { name: "Deepti Sharma", overs: "4.0", maidens: 0, runs: 24, wickets: 3, econ: "6.00", current: true },
        { name: "Renuka Singh Thakur", overs: "4.0", maidens: 0, runs: 29, wickets: 2, econ: "7.25", current: false }
      ],
      recentBalls: ["1", "W", "0", "2", "4", "W"],
      headToHead: { t1Wins: 11, t2Wins: 24, draws: 1, last5: ["IND-W", "AUS-W", "IND-W", "AUS-W", "IND-W"] },
      manhattan1: [14, 18, 15, 22, 19, 17, 21, 16, 15, 19],
      manhattan2: [16, 14, 19, 12, 15, 18, 17, 19, 18, 14],
      innings: [],
      commentary: [
        { over: "20.0", ball: "W", type: "wicket", batter: "Wareham", bowler: "Deepti Sharma", text: "OUT! Stumped by Richa Ghosh! India Women seal a famous 14-run victory at a packed Eden Gardens in Kolkata!" }
      ],
      squads: {
        t1Playing: ["Smriti Mandhana", "Shafali Verma", "Jemimah Rodrigues", "Harmanpreet Kaur (c)", "Richa Ghosh (wk)", "Deepti Sharma", "Pooja Vastrakar", "Radha Yadav", "Shreyanka Patil", "Renuka Singh Thakur", "Arundhati Reddy"],
        t1Bench: ["Yastika Bhatia", "Sajeevan Sajana", "Titas Sadhu"],
        t2Playing: ["Alyssa Healy (c & wk)", "Beth Mooney", "Ellyse Perry", "Tahlia McGrath", "Ashleigh Gardner", "Phoebe Litchfield", "Grace Harris", "Annabel Sutherland", "Georgia Wareham", "Megan Schutt", "Darcie Brown"],
        t2Bench: ["Kim Garth", "Alana King"]
      }
    },
    {
      id: "m5",
      series: "Ranji Trophy Elite 2026-27 • Round 3",
      category: "Domestic",
      format: "FIRST CLASS",
      status: "LIVE",
      statusBadge: "DAY 2 • TEA",
      venue: "Eden Gardens, Kolkata",
      toss: "Bengal won the toss and elected to bowl",
      umpires: "Rohan Pandit, Jayaraman Madanagopal",
      referee: "Manu Nayyar",
      weather: { condition: "Sunny & Crisp", temp: "27°C", humidity: "58%", rainChance: "5%", wind: "12 km/h NE" },
      pitchReport: "Green tinge assisting early seam movement for pacers before flattening out on Days 2-3.",
      team1: { code: "MUM", name: "Mumbai", flag: "🛡️", score: "328", overs: "88.4", crr: "3.70", winProb: 45 },
      team2: { code: "BEN", name: "Bengal", flag: "🐅", score: "214/3", overs: "61.0", crr: "3.51", rrr: "—", winProb: 40 },
      drawProb: 15,
      summaryText: "Bengal trail by 114 runs with 7 wickets remaining in 1st Innings",
      currentPartnership: { runs: 96, balls: 174, p1: "Abhimanyu Easwaran 102*(168)", p2: "Anustup Majumdar 48*(92)" },
      currentBatters: [
        { name: "Abhimanyu Easwaran", runs: 102, balls: 168, fours: 12, sixes: 1, sr: "60.71", onStrike: true, role: "RHB" },
        { name: "Anustup Majumdar", runs: 48, balls: 92, fours: 6, sixes: 0, sr: "52.17", onStrike: false, role: "RHB" }
      ],
      currentBowlers: [
        { name: "Shardul Thakur", overs: "16.0", maidens: 3, runs: 54, wickets: 2, econ: "3.38", current: true },
        { name: "Shams Mulani", overs: "19.0", maidens: 4, runs: 58, wickets: 1, econ: "3.05", current: false }
      ],
      recentBalls: ["0", "0", "4", "0", "1", "0"],
      headToHead: { t1Wins: 14, t2Wins: 2, draws: 11, last5: ["MUM", "DRAW", "MUM", "BEN", "DRAW"] },
      manhattan1: [28, 34, 41, 32, 38, 45, 36, 39, 35],
      manhattan2: [25, 32, 38, 41, 39, 39],
      innings: [],
      commentary: [
        { over: "61.0", ball: "4", type: "milestone", batter: "Easwaran", bowler: "Thakur", text: "HUNDRED FOR EASWARAN! Punches Shardul Thakur off the back foot through cover point to bring up a sparkling First-Class century at Eden Gardens!" }
      ],
      squads: {
        t1Playing: ["Prithvi Shaw", "Ayush Mhatre", "Ajinkya Rahane (c)", "Shreyas Iyer", "Siddhesh Lad", "Hardik Tamore (wk)", "Shardul Thakur", "Shams Mulani", "Tanush Kotian", "Mohit Avasthi", "Tushar Deshpande"],
        t1Bench: ["Angkrish Raghuvanshi", "Royston Dias"],
        t2Playing: ["Abhimanyu Easwaran", "Sudip Chatterjee", "Sudip Kumar Gharami", "Anustup Majumdar (c)", "Shahbaz Ahmed", "Abishek Porel (wk)", "Writtick Chatterjee", "Akash Deep", "Mukesh Kumar", "Ishan Porel", "Suraj Sindhu Jaiswal"],
        t2Bench: ["Avilin Ghosh", "Pradipta Pramanik"]
      }
    },
    {
      id: "m6",
      series: "New Zealand vs Pakistan T20I Series 2026 • 3rd T20I",
      category: "International",
      format: "T20I",
      status: "UPCOMING",
      statusBadge: "TODAY • 19:30 IST",
      venue: "Eden Park, Auckland",
      toss: "Toss at 19:00 IST",
      umpires: "Chris Brown, Wayne Knights",
      referee: "Jeff Crowe",
      weather: { condition: "Breezy & Clear", temp: "19°C", humidity: "62%", rainChance: "5%", wind: "22 km/h W" },
      pitchReport: "Short straight boundaries at Eden Park (55m) promise a six-hitting carnival.",
      team1: { code: "NZ", name: "New Zealand", flag: "🇳🇿", score: "Yet to bat", overs: "0.0", crr: "0.00", winProb: 55 },
      team2: { code: "PAK", name: "Pakistan", flag: "🇵🇰", score: "Yet to bat", overs: "0.0", crr: "0.00", rrr: "—", winProb: 45 },
      drawProb: 0,
      summaryText: "Series tied 1-1 • Decider starts at 19:30 IST",
      currentPartnership: { runs: 0, balls: 0, p1: "Finn Allen", p2: "Devon Conway" },
      currentBatters: [
        { name: "Finn Allen", runs: 0, balls: 0, fours: 0, sixes: 0, sr: "0.00", onStrike: true, role: "RHB" },
        { name: "Tim Seifert (wk)", runs: 0, balls: 0, fours: 0, sixes: 0, sr: "0.00", onStrike: false, role: "RHB" }
      ],
      currentBowlers: [
        { name: "Shaheen Shah Afridi", overs: "0.0", maidens: 0, runs: 0, wickets: 0, econ: "0.00", current: true }
      ],
      recentBalls: ["-", "-", "-", "-", "-", "-"],
      headToHead: { t1Wins: 20, t2Wins: 23, draws: 0, last5: ["NZ", "PAK", "NZ", "NZ", "PAK"] },
      manhattan1: [10, 12, 15, 11, 14, 16, 13, 18, 15, 20],
      manhattan2: [11, 14, 12, 16, 15, 13, 17, 14, 19, 18],
      innings: [],
      commentary: [
        { over: "0.0", ball: "-", type: "info", batter: "Preview", bowler: "Eden Park", text: "Welcome to our live coverage of the 3rd T20I decider at Eden Park, Auckland! Both captains are inspecting the surface." }
      ],
      squads: {
        t1Playing: ["Finn Allen", "Devon Conway (wk)", "Rachin Ravindra", "Daryl Mitchell", "Glenn Phillips", "Mark Chapman", "Mitchell Santner (c)", "Matt Henry", "Tim Southee", "Lockie Ferguson", "Ish Sodhi"],
        t1Bench: ["Will Young", "Ben Sears"],
        t2Playing: ["Saim Ayub", "Babar Azam", "Mohammad Rizwan (c & wk)", "Fakhar Zaman", "Salman Ali Agha", "Shadab Khan", "Iftikhar Ahmed", "Shaheen Shah Afridi", "Naseem Shah", "Haris Rauf", "Abrar Ahmed"],
        t2Bench: ["Usman Khan", "Abbas Afridi"]
      }
    }
  ],

  wagonWheelShots: [
    { batter: "Yashasvi Jaiswal", runs: 4, angle: 35, dist: 0.92, zone: "Cover Drive", length: "Full" },
    { batter: "Yashasvi Jaiswal", runs: 4, angle: 65, dist: 0.90, zone: "Point Cut", length: "Short" },
    { batter: "Yashasvi Jaiswal", runs: 6, angle: 140, dist: 0.98, zone: "Fine Leg Hook", length: "Short" },
    { batter: "Yashasvi Jaiswal", runs: 4, angle: 215, dist: 0.91, zone: "Midwicket Flick", length: "Good" },
    { batter: "Yashasvi Jaiswal", runs: 6, angle: 255, dist: 0.97, zone: "Long-On Loft", length: "Full" },
    { batter: "Yashasvi Jaiswal", runs: 2, angle: 310, dist: 0.65, zone: "Straight Push", length: "Good" },
    { batter: "Yashasvi Jaiswal", runs: 1, angle: 110, dist: 0.55, zone: "Third Man Glide", length: "Good" },
    { batter: "Yashasvi Jaiswal", runs: 4, angle: 15, dist: 0.93, zone: "Straight Drive", length: "Full" },
    { batter: "Rishabh Pant", runs: 6, angle: 230, dist: 0.99, zone: "Slog Sweep", length: "Full" },
    { batter: "Rishabh Pant", runs: 6, angle: 175, dist: 0.96, zone: "Reverse Scoop", length: "Yorker" },
    { batter: "Rishabh Pant", runs: 4, angle: 280, dist: 0.92, zone: "Cow Corner Whip", length: "Good" },
    { batter: "Rishabh Pant", runs: 4, angle: 48, dist: 0.89, zone: "Extra Cover Slash", length: "Short" },
    { batter: "Rishabh Pant", runs: 6, angle: 350, dist: 0.98, zone: "SightscreenTonk", length: "Full" },
    { batter: "Rishabh Pant", runs: 2, angle: 195, dist: 0.62, zone: "Square Leg Tuck", length: "Good" },
    { batter: "Suryakumar Yadav", runs: 6, angle: 162, dist: 0.99, zone: "Supla Fine Leg", length: "Full" },
    { batter: "Suryakumar Yadav", runs: 6, angle: 118, dist: 0.96, zone: "Upper Cut Third Man", length: "Short" },
    { batter: "Suryakumar Yadav", runs: 4, angle: 42, dist: 0.92, zone: "Inside-Out Cover", length: "Good" },
    { batter: "Suryakumar Yadav", runs: 4, angle: 245, dist: 0.91, zone: "Wristy Flick", length: "Yorker" }
  ],

  pitchDeliveries: [
    { x: 0.48, y: 0.22, length: "Yorker", speed: "146.2 kph", outcome: "0", color: "#f59e0b" },
    { x: 0.54, y: 0.35, length: "Full", speed: "141.8 kph", outcome: "4", color: "#10b981" },
    { x: 0.42, y: 0.38, length: "Full", speed: "139.4 kph", outcome: "6", color: "#8b5cf6" },
    { x: 0.51, y: 0.54, length: "Good", speed: "143.1 kph", outcome: "0", color: "#3b82f6" },
    { x: 0.47, y: 0.58, length: "Good", speed: "142.5 kph", outcome: "W", color: "#ef4444" },
    { x: 0.56, y: 0.52, length: "Good", speed: "140.0 kph", outcome: "1", color: "#3b82f6" },
    { x: 0.39, y: 0.74, length: "Short", speed: "145.7 kph", outcome: "4", color: "#10b981" },
    { x: 0.52, y: 0.78, length: "Short", speed: "147.1 kph", outcome: "6", color: "#8b5cf6" },
    { x: 0.49, y: 0.56, length: "Good", speed: "89.4 kph", outcome: "0", color: "#3b82f6" },
    { x: 0.44, y: 0.49, length: "Good", speed: "91.2 kph", outcome: "W", color: "#ef4444" }
  ],

  seriesStandings: {
    "WTC 2025-27": [
      { pos: 1, team: "🇮🇳 India", p: 13, w: 9, l: 3, d: 1, pts: 112, pct: "71.79%", nrr: "+1.14", form: ["W", "W", "D", "W", "L"] },
      { pos: 2, team: "🇦🇺 Australia", p: 14, w: 9, l: 4, d: 1, pts: 108, pct: "64.28%", nrr: "+0.86", form: ["W", "L", "W", "W", "W"] },
      { pos: 3, team: "🇿🇦 South Africa", p: 10, w: 6, l: 3, d: 1, pts: 76, pct: "63.33%", nrr: "+0.62", form: ["W", "W", "W", "L", "W"] },
      { pos: 4, team: "🇳🇿 New Zealand", p: 11, w: 6, l: 5, d: 0, pts: 72, pct: "54.55%", nrr: "+0.28", form: ["L", "W", "W", "L", "W"] },
      { pos: 5, team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", p: 16, w: 8, l: 7, d: 1, pts: 92, pct: "47.92%", nrr: "+0.11", form: ["W", "L", "L", "W", "W"] },
      { pos: 6, team: "🇱🇰 Sri Lanka", p: 10, w: 4, l: 6, d: 0, pts: 48, pct: "40.00%", nrr: "-0.34", form: ["L", "W", "L", "W", "L"] }
    ],
    "IPL 2026": [
      { pos: 1, team: "🦁 Chennai Super Kings", p: 10, w: 7, l: 3, d: 0, pts: 14, pct: "70.00%", nrr: "+0.942", form: ["W", "W", "L", "W", "W"] },
      { pos: 2, team: "💜 Kolkata Knight Riders", p: 10, w: 7, l: 3, d: 0, pts: 14, pct: "70.00%", nrr: "+0.815", form: ["W", "L", "W", "W", "W"] },
      { pos: 3, team: "🌀 Mumbai Indians", p: 10, w: 6, l: 4, d: 0, pts: 12, pct: "60.00%", nrr: "+0.518", form: ["W", "W", "W", "L", "L"] },
      { pos: 4, team: "🔥 Sunrisers Hyderabad", p: 10, w: 6, l: 4, d: 0, pts: 12, pct: "60.00%", nrr: "+0.390", form: ["L", "W", "W", "L", "W"] },
      { pos: 5, team: "👑 Royal Challengers Bengaluru", p: 10, w: 5, l: 5, d: 0, pts: 10, pct: "50.00%", nrr: "+0.124", form: ["W", "W", "L", "L", "W"] },
      { pos: 6, team: "🩷 Rajasthan Royals", p: 10, w: 4, l: 6, d: 0, pts: 8, pct: "40.00%", nrr: "-0.265", form: ["L", "L", "W", "L", "W"] }
    ]
  },

  players: [
    {
      id: "p1", name: "Virat Kohli", country: "🇮🇳 India", role: "Top-Order Batter", style: "Right-hand bat",
      test: { m: 121, runs: 9165, avg: 48.75, sr: 55.8, hundreds: 30, fifties: 31, hs: "254*" },
      odi: { m: 295, runs: 13906, avg: 58.18, sr: 93.5, hundreds: 50, fifties: 72, hs: "183" },
      t20i: { m: 125, runs: 4188, avg: 48.69, sr: 137.0, hundreds: 1, fifties: 38, hs: "122*" },
      ipl: { m: 252, runs: 8004, avg: 38.66, sr: 131.9, hundreds: 8, fifties: 55, hs: "113" }
    },
    {
      id: "p2", name: "Joe Root", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", role: "Top-Order Batter", style: "Right-hand bat • Offbreak",
      test: { m: 152, runs: 12972, avg: 51.07, sr: 57.1, hundreds: 36, fifties: 65, hs: "262" },
      odi: { m: 174, runs: 6622, avg: 47.64, sr: 86.9, hundreds: 16, fifties: 39, hs: "133*" },
      t20i: { m: 32, runs: 893, avg: 35.72, sr: 126.3, hundreds: 0, fifties: 5, hs: "90*" },
      ipl: { m: 3, runs: 10, avg: 10.0, sr: 90.9, hundreds: 0, fifties: 0, hs: "10" }
    },
    {
      id: "p3", name: "Jasprit Bumrah", country: "🇮🇳 India", role: "Fast Bowler", style: "Right-arm fast",
      test: { m: 43, runs: 312, avg: 19.42, sr: 42.1, hundreds: 202, fifties: 12, hs: "6/27 (BBI)" },
      odi: { m: 89, runs: 91, avg: 23.55, sr: 30.7, hundreds: 149, fifties: 2, hs: "6/19 (BBI)" },
      t20i: { m: 70, runs: 12, avg: 17.74, sr: 16.5, hundreds: 89, fifties: 0, hs: "3/7 (BBI)" },
      ipl: { m: 133, runs: 69, avg: 22.51, sr: 18.2, hundreds: 165, fifties: 2, hs: "5/10 (BBI)" }
    },
    {
      id: "p4", name: "Yashasvi Jaiswal", country: "🇮🇳 India", role: "Opening Batter", style: "Left-hand bat",
      test: { m: 18, runs: 1720, avg: 57.33, sr: 66.8, hundreds: 5, fifties: 9, hs: "214*" },
      odi: { m: 4, runs: 184, avg: 46.00, sr: 104.5, hundreds: 0, fifties: 2, hs: "77" },
      t20i: { m: 23, runs: 723, avg: 36.15, sr: 164.3, hundreds: 1, fifties: 5, hs: "100" },
      ipl: { m: 53, runs: 1607, avg: 32.14, sr: 150.6, hundreds: 2, fifties: 9, hs: "124" }
    },
    {
      id: "p5", name: "Travis Head", country: "🇦🇺 Australia", role: "Aggressive Middle-Order", style: "Left-hand bat • Offbreak",
      test: { m: 54, runs: 3610, avg: 43.49, sr: 66.4, hundreds: 8, fifties: 17, hs: "175" },
      odi: { m: 71, runs: 2742, avg: 44.22, sr: 104.8, hundreds: 6, fifties: 16, hs: "154*" },
      t20i: { m: 38, runs: 1093, avg: 33.12, sr: 160.4, hundreds: 0, fifties: 5, hs: "91" },
      ipl: { m: 25, runs: 772, avg: 35.09, sr: 173.8, hundreds: 1, fifties: 5, hs: "102" }
    },
    {
      id: "p6", name: "Smriti Mandhana", country: "🇮🇳 India Women", role: "Opening Batter", style: "Left-hand bat",
      test: { m: 7, runs: 629, avg: 57.18, sr: 67.2, hundreds: 2, fifties: 3, hs: "149" },
      odi: { m: 91, runs: 3960, avg: 46.58, sr: 86.2, hundreds: 9, fifties: 29, hs: "136" },
      t20i: { m: 145, runs: 3684, avg: 29.47, sr: 123.8, hundreds: 0, fifties: 29, hs: "87" },
      ipl: { m: 26, runs: 749, avg: 31.20, sr: 135.4, hundreds: 0, fifties: 5, hs: "81" }
    }
  ],

  iccRankings: {
    men: {
      TEST: {
        teams: [
          { rank: 1, name: "🇮🇳 India", rating: 124, points: 4464, trend: "▲1" },
          { rank: 2, name: "🇦🇺 Australia", rating: 122, points: 4514, trend: "▼1" },
          { rank: 3, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", rating: 109, points: 4687, trend: "—" },
          { rank: 4, name: "🇿🇦 South Africa", rating: 105, points: 2730, trend: "▲1" },
          { rank: 5, name: "🇳🇿 New Zealand", rating: 101, points: 3131, trend: "▼1" }
        ],
        batters: [
          { rank: 1, name: "Joe Root (ENG)", rating: 903, best: 932, trend: "—" },
          { rank: 2, name: "Yashasvi Jaiswal (IND)", rating: 868, best: 868, trend: "▲2" },
          { rank: 3, name: "Kane Williamson (NZ)", rating: 859, best: 919, trend: "▼1" },
          { rank: 4, name: "Harry Brook (ENG)", rating: 849, best: 898, trend: "▼1" },
          { rank: 5, name: "Rishabh Pant (IND)", rating: 814, best: 814, trend: "▲1" }
        ],
        bowlers: [
          { rank: 1, name: "Jasprit Bumrah (IND)", rating: 904, best: 904, trend: "—" },
          { rank: 2, name: "Kagiso Rabada (RSA)", rating: 866, best: 902, trend: "—" },
          { rank: 3, name: "Josh Hazlewood (AUS)", rating: 847, best: 864, trend: "—" },
          { rank: 4, name: "Pat Cummins (AUS)", rating: 832, best: 914, trend: "▲1" },
          { rank: 5, name: "Ravindra Jadeja (IND)", rating: 809, best: 899, trend: "—" }
        ]
      },
      ODI: {
        teams: [
          { rank: 1, name: "🇮🇳 India", rating: 122, points: 5490, trend: "—" },
          { rank: 2, name: "🇦🇺 Australia", rating: 116, points: 4756, trend: "—" },
          { rank: 3, name: "🇿🇦 South Africa", rating: 112, points: 4144, trend: "—" },
          { rank: 4, name: "🇵🇰 Pakistan", rating: 107, points: 3852, trend: "—" },
          { rank: 5, name: "🇳🇿 New Zealand", rating: 103, points: 4017, trend: "—" }
        ],
        batters: [
          { rank: 1, name: "Shubman Gill (IND)", rating: 818, best: 847, trend: "▲1" },
          { rank: 2, name: "Babar Azam (PAK)", rating: 812, best: 898, trend: "▼1" },
          { rank: 3, name: "Rohit Sharma (IND)", rating: 787, best: 885, trend: "—" },
          { rank: 4, name: "Virat Kohli (IND)", rating: 774, best: 911, trend: "—" },
          { rank: 5, name: "Heinrich Klaasen (RSA)", rating: 756, best: 760, trend: "▲1" }
        ],
        bowlers: [
          { rank: 1, name: "Rashid Khan (AFG)", rating: 711, best: 806, trend: "—" },
          { rank: 2, name: "Kuldeep Yadav (IND)", rating: 698, best: 765, trend: "▲1" },
          { rank: 3, name: "Keshav Maharaj (RSA)", rating: 691, best: 741, trend: "▼1" },
          { rank: 4, name: "Shaheen Afridi (PAK)", rating: 682, best: 733, trend: "—" },
          { rank: 5, name: "Jasprit Bumrah (IND)", rating: 675, best: 841, trend: "▲2" }
        ]
      },
      T20I: {
        teams: [
          { rank: 1, name: "🇮🇳 India", rating: 270, points: 16200, trend: "—" },
          { rank: 2, name: "🇦🇺 Australia", rating: 259, points: 11655, trend: "—" },
          { rank: 3, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", rating: 254, points: 11176, trend: "—" },
          { rank: 4, name: "🌴 West Indies", rating: 248, points: 11904, trend: "▲1" },
          { rank: 5, name: "🇿🇦 South Africa", rating: 245, points: 10780, trend: "▼1" }
        ],
        batters: [
          { rank: 1, name: "Travis Head (AUS)", rating: 862, best: 881, trend: "—" },
          { rank: 2, name: "Suryakumar Yadav (IND)", rating: 848, best: 912, trend: "—" },
          { rank: 3, name: "Phil Salt (ENG)", rating: 816, best: 859, trend: "—" },
          { rank: 4, name: "Tilak Varma (IND)", rating: 804, best: 806, trend: "▲1" },
          { rank: 5, name: "Yashasvi Jaiswal (IND)", rating: 782, best: 794, trend: "—" }
        ],
        bowlers: [
          { rank: 1, name: "Adil Rashid (ENG)", rating: 722, best: 746, trend: "—" },
          { rank: 2, name: "Akeal Hosein (WI)", rating: 709, best: 715, trend: "▲1" },
          { rank: 3, name: "Varun Chakaravarthy (IND)", rating: 704, best: 706, trend: "▲3" },
          { rank: 4, name: "Wanindu Hasaranga (SL)", rating: 696, best: 797, trend: "▼2" },
          { rank: 5, name: "Arshdeep Singh (IND)", rating: 688, best: 692, trend: "▲1" }
        ]
      }
    },
    women: {
      TEST: {
        teams: [
          { rank: 1, name: "🇦🇺 Australia Women", rating: 148, points: 2960, trend: "—" },
          { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England Women", rating: 126, points: 2520, trend: "—" },
          { rank: 3, name: "🇮🇳 India Women", rating: 121, points: 2420, trend: "▲1" }
        ],
        batters: [
          { rank: 1, name: "Smriti Mandhana (IND-W)", rating: 768, best: 768, trend: "▲1" },
          { rank: 2, name: "Nat Sciver-Brunt (ENG-W)", rating: 762, best: 790, trend: "▼1" },
          { rank: 3, name: "Ellyse Perry (AUS-W)", rating: 749, best: 812, trend: "—" }
        ],
        bowlers: [
          { rank: 1, name: "Sophie Ecclestone (ENG-W)", rating: 779, best: 796, trend: "—" },
          { rank: 2, name: "Deepti Sharma (IND-W)", rating: 742, best: 748, trend: "▲1" },
          { rank: 3, name: "Ashleigh Gardner (AUS-W)", rating: 731, best: 755, trend: "▼1" }
        ]
      },
      ODI: {
        teams: [
          { rank: 1, name: "🇦🇺 Australia Women", rating: 164, points: 4920, trend: "—" },
          { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England Women", rating: 128, points: 3840, trend: "—" },
          { rank: 3, name: "🇮🇳 India Women", rating: 118, points: 3540, trend: "▲1" }
        ],
        batters: [
          { rank: 1, name: "Laura Wolvaardt (RSA-W)", rating: 773, best: 785, trend: "—" },
          { rank: 2, name: "Smriti Mandhana (IND-W)", rating: 758, best: 797, trend: "▲1" },
          { rank: 3, name: "Chamari Athapaththu (SL-W)", rating: 744, best: 773, trend: "▼1" }
        ],
        bowlers: [
          { rank: 1, name: "Sophie Ecclestone (ENG-W)", rating: 770, best: 799, trend: "—" },
          { rank: 2, name: "Megan Schutt (AUS-W)", rating: 712, best: 766, trend: "—" },
          { rank: 3, name: "Deepti Sharma (IND-W)", rating: 698, best: 715, trend: "▲1" }
        ]
      },
      T20I: {
        teams: [
          { rank: 1, name: "🇦🇺 Australia Women", rating: 294, points: 10290, trend: "—" },
          { rank: 2, name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England Women", rating: 281, points: 9835, trend: "—" },
          { rank: 3, name: "🇮🇳 India Women", rating: 269, points: 9953, trend: "—" }
        ],
        batters: [
          { rank: 1, name: "Beth Mooney (AUS-W)", rating: 769, best: 794, trend: "—" },
          { rank: 2, name: "Smriti Mandhana (IND-W)", rating: 759, best: 765, trend: "▲1" },
          { rank: 3, name: "Tahlia McGrath (AUS-W)", rating: 752, best: 837, trend: "▼1" }
        ],
        bowlers: [
          { rank: 1, name: "Sophie Ecclestone (ENG-W)", rating: 762, best: 795, trend: "—" },
          { rank: 2, name: "Deepti Sharma (IND-W)", rating: 745, best: 755, trend: "—" },
          { rank: 3, name: "Sadia Iqbal (PAK-W)", rating: 736, best: 746, trend: "—" }
        ]
      }
    }
  },

  news: [
    {
      id: "n1",
      category: "Tactical Analysis",
      badge: "YOUCRICK PLUS",
      title: "How Yashasvi Jaiswal & Rishabh Pant Decoded the Kookaburra Seam at the MCG",
      summary: "By batting 18cm outside the popping crease against Scott Boland and sweeping Nathan Lyon against the rough, India's left-hand duo shifted the 4th-day momentum.",
      author: "Harsha Bhogle & Tactical Desk",
      time: "18 mins ago",
      readTime: "4 min read",
      body: [
        "Fourth-day afternoons at the Melbourne Cricket Ground have historically belonged to relentless seamers exploiting variable bounce. Yet Yashasvi Jaiswal and Rishabh Pant flipped the script with contrasting geometry.",
        "Hawkeye tracking reveals Jaiswal intercepted 72% of Pat Cummins's deliveries a full 18 centimeters ahead of his Day 1 contact point—smothering late nip before the Kookaburra could deviate.",
        "At the other end, Pant neutralized Nathan Lyon's footmarks by stepping across his stumps to unlock the 190°–250° arc between deep square leg and wide long-on, forcing Cummins to push two catchers back to the rope."
      ]
    },
    {
      id: "n2",
      category: "IPL 2026 Live",
      badge: "MATCH REPORT",
      title: "Suryakumar Yadav's 360° Masterclass Keeps Mumbai Indians Alive in 219 Chase",
      summary: "After Shivam Dube and MS Dhoni propelled CSK to 218/5, Suryakumar's 39-ball 79* has set up a thrilling last-3-over finish at Wankhede.",
      author: "Sambit Bal",
      time: "42 mins ago",
      readTime: "3 min read",
      body: [
        "El Clasico of the IPL rarely disappoints, and Match 42 at the Wankhede Stadium has delivered fireworks from ball one.",
        "Ruturaj Gaikwad (78 off 46) and Shivam Dube (58 off 27) laid a commanding platform before MS Dhoni launched three towering sixes in a 9-ball 26* cameo.",
        "In response, Suryakumar Yadav used the pace of Matheesha Pathirana to ramp, scoop, and slice boundaries all around the dial, reducing the equation to 35 off 16 balls."
      ]
    },
    {
      id: "n3",
      category: "Women's Cricket",
      badge: "CHAMPIONS",
      title: "Mandhana 84 & Deepti 3-Fer Power India Women to Tri-Series Final Triumph at Eden Gardens",
      summary: "Playing in front of 48,000 fans in Kolkata, India Women defended 176/4 with clinical middle-overs spin choke.",
      author: "Snehal Pradhan",
      time: "2 hours ago",
      readTime: "5 min read",
      body: [
        "Smriti Mandhana's love affair with big-match finals continued at Eden Gardens as her fluent 51-ball 84 powered India Women to 176/4.",
        "When Australia Women threatened through Ellyse Perry and Ashleigh Gardner, local favorite Deepti Sharma bowled four overs of flight and dip to claim 3/24, sparking celebrations across Kolkata."
      ]
    },
    {
      id: "n4",
      category: "Domestic Watch",
      badge: "RANJI TROPHY",
      title: "Abhimanyu Easwaran's Unbeaten Century Anchors Bengal's Reply Against Mumbai",
      summary: "Bengal's prolific opener compiled his 28th First-Class hundred to narrow Mumbai's first-innings lead at Tea on Day 2.",
      author: "Joy Bhattacharjya",
      time: "3 hours ago",
      readTime: "3 min read",
      body: [
        "Against a disciplined Mumbai attack led by Shardul Thakur and Shams Mulani, Abhimanyu Easwaran showed textbook judgment outside off stump.",
        "His unbroken 96-run stand with veteran Anustup Majumdar has positioned Bengal within 114 runs of the first-innings lead with 7 wickets in hand."
      ]
    }
  ]
};
