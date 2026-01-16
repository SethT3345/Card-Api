const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

const JWT_SECRET = "secret_key";



function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
}

app.post("/getToken", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/getToken", (req, res) => {
  res.send(`
    <form method="POST" action="/getToken">
      <h1>Get Token</h1>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.get("/cards", (req, res) => {
  res.send(`
    <h1>Get Cards</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getCards()">Get Cards</button>
    <pre id="result"></pre>
    
    <script>
      async function getCards() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/cards', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/cards", authenticateToken, (req, res) => {
  const cards = JSON.parse(fs.readFileSync("./cards.json", "utf-8"));
  res.json(cards);
});

app.get("/sets", (req, res) => {
  res.send(`
    <h1>Get Card Sets</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getSets()">Get Sets</button>
    <pre id="result"></pre>
    
    <script>
      async function getSets() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/sets', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/sets", authenticateToken, (req, res) => {
  const sets = JSON.parse(fs.readFileSync("./sets.json", "utf-8"));
  res.json(sets);
});

app.get("/rarities", (req, res) => {
  res.send(`
    <h1>Get Card Sets</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getSets()">Get Rarities</button>
    <pre id="result"></pre>
    
    <script>
      async function getSets() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/rarities', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/rarities", authenticateToken, (req, res) => {
  const sets = JSON.parse(fs.readFileSync("./rarities.json", "utf-8"));
  res.json(sets);
});

app.get("/rarities", (req, res) => {
  res.send(`
    <h1>Get Card Sets</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getSets()">Get Rarities</button>
    <pre id="result"></pre>
    
    <script>
      async function getSets() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/rarities', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/rarities", authenticateToken, (req, res) => {
  const sets = JSON.parse(fs.readFileSync("./rarities.json", "utf-8"));
  res.json(sets);
});

app.get("/stats", (req, res) => {
  res.send(`
    <h1>Get Card Stats</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getStats()">Get Stats</button>
    <pre id="result"></pre>
    
    <script>
      async function getStats() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/stats', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/stats", authenticateToken, (req, res) => {
  const stats = JSON.parse(fs.readFileSync("./stats.json", "utf-8"));
  res.json(stats);
});

app.get("/stats", (req, res) => {
  res.send(`
    <h1>Get Card Stats</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getStats()">Get Stats</button>
    <pre id="result"></pre>
    
    <script>
      async function getStats() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/stats', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/stats", authenticateToken, (req, res) => {
  const stats = JSON.parse(fs.readFileSync("./stats.json", "utf-8"));
  res.json(stats);
});

app.get("/cards/random", (req, res) => {
  res.send(`
    <h1>Get Random Card</h1>
    <input type="text" id="token" placeholder="Paste your token here" style="width: 500px;" />
    <button onclick="getRandomCard()">Get Random Card</button>
    <pre id="result"></pre>
    
    <script>
      async function getRandomCard() {
        const token = document.getElementById('token').value;
        
        try {
          const response = await fetch('/cards/random', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          
          const data = await response.json();
          document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          document.getElementById('result').textContent = 'Error: ' + error.message;
        }
      }
    </script>
  `);
});

app.post("/cards/random", authenticateToken, (req, res) => {
  const cards = JSON.parse(fs.readFileSync("./cards.json", "utf-8"));
  const randomIndex = Math.floor(Math.random() * cards.length);
  res.json(cards[randomIndex]);
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});
