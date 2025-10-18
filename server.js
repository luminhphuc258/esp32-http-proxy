import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/audio/:filename", async (req, res) => {
  const { filename } = req.params;
  const target = `https://embeddedprogramming-healtheworldserver.up.railway.app/audio/${filename}`;
  console.log(" Streaming:", target);

  try {
    const r = await fetch(target);
    if (!r.ok) throw new Error("Fetch error " + r.status);
    res.setHeader("Content-Type", "audio/mpeg");
    r.body.pipe(res);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/", (req, res) => res.send(" ESP32 Proxy Active"));
app.listen(10000, () => console.log("Proxy started on port 10000"));
