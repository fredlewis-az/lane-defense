#!/usr/bin/env python3
import asyncio
import json
import subprocess
from pathlib import Path

import edge_tts

VOICE = "en-US-AndrewNeural"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "audio"

SCENES = {
    "scene01": (
        "Most of us don't have a money problem. We have a visibility problem. "
        "Money comes in, money goes out, and at the end of the month we're not sure where it went."
    ),
    "scene02": (
        "A budget fixes that. It isn't a punishment. It's a plan for money you already have, "
        "and the first thing it gives you is visibility, meaning you can see where everything stands at a glance."
    ),
    "scene03": (
        "The tool I use is YNAB, short for You Need A Budget. Its rule is simple: give every dollar a job. "
        "When a paycheck arrives, you decide what each dollar is for before you spend it. "
        "If one job gets more money, another gets less. "
        "That tradeoff is what makes your spending intentional instead of accidental."
    ),
    "scene04": (
        "Next, set goals. For a $1,200 trip in six months, "
        "YNAB sets aside $200 a month and shows your progress. "
        "The same works for a car down payment or an emergency fund. "
        "A wish becomes a line item you can track."
    ),
    "scene05": (
        "Then AI does the tedious part. My AI assistant reads new transactions, "
        "files each one into the right category, and sends me plain-English updates like, "
        "you've used 80 percent of groceries and it's the 20th. "
        "It catches problems early, while they're still easy to fix."
    ),
    "scene06": (
        "Setup takes an afternoon. Download YNAB, connect your bank, create a few categories, "
        "and pick one goal. Add the AI once the basics feel natural."
    ),
    "scene07": (
        "You get visibility, intentional spending, goals you can track, and early warnings. "
        "Give every dollar a job."
    ),
}


async def synth(name: str, text: str) -> None:
    path = OUT_DIR / f"{name}.mp3"
    for attempt in range(5):
        try:
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(str(path))
            return
        except edge_tts.exceptions.NoAudioReceived:
            await asyncio.sleep(2 ** attempt)
    raise RuntimeError(f"Failed to synthesize {name}")


def duration_seconds(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        text=True,
    )
    return float(out.strip())


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, text in SCENES.items():
        path = OUT_DIR / f"{name}.mp3"
        if path.exists() and path.stat().st_size > 1000:
            print(f"skip {name}")
            continue
        await synth(name, text)
        await asyncio.sleep(1.5)
    padding = 0.35
    scene08_hold = 4.0
    durations = {}
    for name in SCENES:
        d = duration_seconds(OUT_DIR / f"{name}.mp3")
        durations[name] = {"audioSec": d, "sceneSec": d + padding}
    durations["scene08"] = {"audioSec": 0, "sceneSec": scene08_hold}
    meta = {"voice": VOICE, "paddingSec": padding, "scenes": durations}
    meta_path = OUT_DIR / "durations.json"
    meta_path.write_text(json.dumps(meta, indent=2))
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
