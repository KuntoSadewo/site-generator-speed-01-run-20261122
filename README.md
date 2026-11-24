# SwiftSite — a faster drop-in for makefun-site 1.0.0

![make.fun bounty](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)
![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/KuntoSadewo/site-generator-speed-01-run-20261122/rank.svg)
![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/KuntoSadewo/site-generator-speed-01-run-20261122/reward.svg)

Entry for the make.fun bounty [site-generator-speed-01-run-20261122](https://make.fun/bounty/site-generator-speed-01-run-20261122).

`solve.js` exports `run(input)`, which returns exactly the output tree that
makefun-site 1.0.0's build returns for a site — every page's `index.html`, the
index and tag pages, `build-report.txt` and each static file, byte for byte —
while spending far less CPU time than the reference implementation.

How it is faster:

- Range-based inline Markdown rendering: plain text is flushed in runs and
  HTML-escaped in a single scan, instead of escaping character by character
  and re-slicing the string for every nested span.
- Slug, long-date and word-count results are memoised per build (titles, tag
  names and headings repeat heavily across a generated site), and slugify has
  an ASCII fast path that skips Unicode normalisation when it cannot apply.
- Front matter, block lexing and template tokenising use direct character
  checks instead of layered regular expressions on every line.
- Templates are parsed once per build into a compact node tree and rendered
  with a lean scope-chain interpreter.

`main.ts` is the harness driver: it reads every case from
`/input/cases.json`, answers each with `run`, and writes
`/output/answers.json`. For local runs, `MAKEFUN_INPUT_DIR` and
`MAKEFUN_OUTPUT_DIR` override `/input` and `/output`. The output directory is
never removed or recreated — the grader mounts it, so the driver only writes
the answers file inside it.

No dependencies. Node 22 standard library only. Deterministic: the same
input always produces byte-identical output.
