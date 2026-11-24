const http = require("http");
const { Pool } = require("pg");

const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL || "";

const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl, connectionTimeoutMillis: 5000 })
  : null;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.url === "/api/hello" || req.url === "/") {
    let db = "skipped";
    if (pool) {
      try {
        const r = await pool.query("SELECT 1 AS n");
        db = r.rows[0]?.n === 1 ? "ok" : "unexpected";
      } catch (error) {
        db = error instanceof Error ? error.message : String(error);
      }
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "DeployPanel example API",
        db,
        service: "api",
      }),
    );
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`example api listening on ${port}`);
});
