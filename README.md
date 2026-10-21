# YouCrick — Ultimate Cricket Platform (Netlify Deployment Package)

**YouCrick** is a responsive cricket web application modelled after **Cricbuzz** & **Cricbuzz Plus**, engineered to run across mobile phones (320px+), tablets, laptops, and 4K desktop monitors without breaking layout.

## Key Features Included
1. **Top Live Match Ticker Strip**: Filter across *All*, *Live Now*, *International*, *IPL 2026*, *Women's Cricket*, and *Ranji Trophy*.
2. **Real-Time Live Ball Simulation Engine**: Click **Sim Live** in the top header (or use the **Bowl Next Delivery Live** panel) to simulate real-time deliveries (`0`, `1`, `2`, `4`, `6`, `W`), complete with Web Audio bat-hit/crowd sound effects, instant scorecard updates, commentary feed updates, and Win Probability shifts.
3. **5-Tab Deep-Dive Match Center**:
   - **Live Commentary**: Filterable by *All*, *Fours (4s)*, *Sixes (6s)*, *Wickets (W)*, and *Milestones*.
   - **Full Scorecard**: Complete Batting, Bowling, Extras, Did Not Bat, and Fall of Wickets tables.
   - **360° Wagon Wheel, Hawkeye Pitch Map & Worm Charts**: Interactive HTML5 `<canvas>` 360° shot visualizer, length-band pitch map, and Chart.js innings run-rate comparison.
   - **Playing XI & Bench Squads**: Full lineups for both teams.
   - **Match Info & Weather Radar**: Toss, umpires, referee, pitch report, and weather conditions.
4. **Series Hub & Points Tables**: Official **ICC World Test Championship (WTC 2025-27)** and **IPL 2026** standings with Net Run Rate and Form Guides.
5. **Player Head-to-Head Comparator**: Compare stars (*Virat Kohli*, *Joe Root*, *Jasprit Bumrah*, *Yashasvi Jaiswal*, *Travis Head*, *Smriti Mandhana*) across Test, ODI, T20I, and IPL formats.
6. **Official ICC Rankings**: Switch between *Men's* and *Women's* rankings across *TEST*, *ODI*, and *T20I* for Teams, Batters, and Bowlers.
7. **YouCrick Fan Lab (DRS & DLS)**:
   - **Interactive 3rd-Umpire DRS Ball-Tracker Simulator**: Configure Pitching, Impact, and Seam/Spin to trigger a live Hawkeye review verdict.
   - **DLS Rain Par Score & Target Calculator**: Compute revised targets and required run rates for rain-shortened matches.
   - **Custom World XI Builder**: Pick and copy your 11-player Dream XI squad.

## How to Deploy on Netlify (30 Seconds)

### Method 1: Netlify Drop (Fastest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop `youcrick-netlify.zip` (or the extracted `youcrick-netlify` folder) directly onto the browser window.
3. Your site will be live immediately with HTTPS!

### Method 2: Netlify CLI
```bash
npx netlify-cli deploy --dir=. --prod
```

### Method 3: Git Repository Continuous Deployment
1. Push the contents of this folder to a GitHub/GitLab/Bitbucket repository.
2. Import the repository in Netlify (`netlify.toml` and `_redirects` are pre-configured automatically).
