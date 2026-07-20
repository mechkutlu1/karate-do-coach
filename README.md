# Karate-Dō Coach — Sayokan

A single-page PWA that watches karate kihon through the phone camera
(MediaPipe pose estimation), detects **kizami-zuki, gyaku-zuki, mawashi-zuki**
and **mae-geri**, and scores each one 0–100 with one correction at a time. No
build step and no dependencies to install — everything loads from a CDN at
runtime and all processing stays on the device.

The emblem is an **original Japanese-styled mark** (an *enso* brush-circle with
the kanji 道, "the way"), not the official Sayokan trademark — swap in your own
mark by replacing the `icon-*.png` files and the inline SVG in `index.html`.

## Files
- `index.html` — the whole app (camera, pose, coaching engine, UI).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — installable PWA + offline shell.

## Install on the phone
Open the Pages URL, then Android/Chrome → *Install app*; iPhone/Safari → Share →
*Add to Home Screen*.

## Using it
1. Tap **Start camera** and allow access (first launch downloads the pose model).
2. Pick a drill: **Kihon** scores everything, **Tsuki** only punches, **Mawashi**
   only roundhouse punches, **Geri** only kicks.
3. In **Settings** set your **lead side** and **sensitivity** (lower for a young
   student / slow kihon), and toggle voice.
4. Stand side-on in kamae so your whole body is in frame, and strike with control.

Each technique is scored and logged in **Waza notes** with a per-checkpoint
breakdown. Punches check **kime** (extension), **hikite** (reaction hand to hip),
**chudan** (level), **dachi** (stance depth) and posture. Kicks check chamber,
extension, height, balance and **hikiashi** (re-chamber). Phase cues show live:
*kamae → kiai → kime*.

Bump the `CACHE` string in `sw.js` whenever you edit shell files so installed
copies update.
