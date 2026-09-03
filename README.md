# CTE Calc

A coefficient of thermal expansion calculator for precision measurement and
inspection work. Enter a material, a nominal length, and the reference and
material temperatures, and it returns the change in length, the corrected total
length, and the correction scale factor used to normalize a measurement back to
the reference temperature.

**Live:** https://subydev.github.io/cte/

Built with Expo and React Native Web, so the same source runs as a web app and
as an iOS/Android build.

## What it calculates

For a temperature difference `dT = T_material - T_reference`:

```
change in length          dL    = L * alpha * dT
total length              L_tot = L + dL
correction scale factor   CSF   = L / L_tot
```

`alpha` is the material's linear coefficient of thermal expansion. Multiplying a
measurement taken at the material temperature by the correction scale factor
brings it back to the nominal length at the reference temperature.

## Units

The app runs in two modes and converts your entered values when you switch:

| | Metric | Imperial |
|---|---|---|
| Length | mm | in |
| Temperature | °C | °F |
| Coefficient | mm/mm °C | in/in °F |

Defaults are 20 °C / 68 °F reference and 26.67 °C / 80 °F material temperature.

## Materials

Thirty materials ship with the app, plus a **Custom Material** option for
entering a coefficient by hand. The full table is on the References screen, and
the same data backs both the picker and that screen.

The coefficients are nominal values from standard engineering tables, rounded
for display. They are intended for estimation. For work where the coefficient
materially affects conformance, use the value on your material certificate.

Note that the per-°C and per-°F columns are each rounded independently, so a few
materials differ by a few percent between the two unit modes. See
`docs/REFERENCE-DATA.md` for the affected entries.

## Running locally

```bash
npm install
npm run web       # browser
npm run ios       # iOS simulator
npm run android   # Android emulator
```

## Deploying

`npm run deploy` exports the web build and publishes `dist/` to the `gh-pages`
branch, which GitHub Pages serves at the live URL above.

```bash
npm run deploy
```

The repository must stay public for GitHub Pages to serve the site on a free
plan. Making it private unpublishes the site and the URL starts returning
"Site not found".

## Embedding

The app is safe to embed in an iframe; no framing headers are set.

```html
<iframe
  src="https://subydev.github.io/cte/"
  title="CTE Calc"
  style="width:100%;height:600px;border:none"
  loading="lazy"
></iframe>
```

## Project layout

```
app/index.js      entry, re-exports Home
app/details.js    materials reference table
app/_layout.js    expo-router stack + theme provider
Home.js           calculator UI, materials data, and the math
VerisurfIcon.js   brand mark
public/           static files copied into the web build
```

## License

No license is currently declared, which means default copyright applies and
others may not reuse the code. Add a LICENSE file if reuse is intended.
