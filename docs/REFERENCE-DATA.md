# Reference coefficient data

The material coefficients used by the picker and the References screen.
Values are nominal figures from standard engineering tables, rounded for
display, and are intended for estimation rather than as certified data.

## Table

| Material | mm/mm °C (x10^-6) | in/in °F (x10^-6) | exact 5/9 of column 2 | delta |
|---|---|---|---|---|
| Aluminum (99.9%) | 23.00 | 13.00 | 12.78 | +1.7% |
| Aluminum (2024-T4) | 22.00 | 12.00 | 12.22 | -1.8% |
| Aluminum (6061-T4) | 24.00 | 13.10 | 13.33 | -1.8% |
| Aluminum (7075-T6) | 24.00 | 13.10 | 13.33 | -1.8% |
| Beryllium | 12.00 | 6.40 | 6.67 | -4.0% |
| Beryllium-Copper | 18.00 | 9.90 | 10.00 | -1.0% |
| Brass | 19.00 | 10.40 | 10.56 | -1.5% |
| Bronze | 18.00 | 10.00 | 10.00 | +0.0% |
| Copper (99.9%) | 18.00 | 9.80 | 10.00 | -2.0% |
| Fiberglass | 14.00 | 7.90 | 7.78 | +1.6% |
| Gold | 15.00 | 8.20 | 8.33 | -1.6% |
| Graphite | 8.00 | 4.40 | 4.44 | -1.0% |
| Invar, Copper Clad | 6.00 | 3.50 | 3.33 | +5.0% |
| Iron | 12.00 | 6.70 | 6.67 | +0.5% |
| Kovar | 6.00 | 3.30 | 3.33 | -1.0% |
| Lead | 27.00 | 15.10 | 15.00 | +0.7% |
| Magnesium | 25.00 | 14.00 | 13.89 | +0.8% |
| Molybdenum | 5.00 | 3.00 | 2.78 | +8.0% |
| Monel | 14.00 | 7.50 | 7.78 | -3.6% |
| Nickel | 13.00 | 7.20 | 7.22 | -0.3% |
| Phosphor Bronze | 18.00 | 9.90 | 10.00 | -1.0% |
| Silver | 19.00 | 10.70 | 10.56 | +1.4% |
| Solder | 24.00 | 13.40 | 13.33 | +0.5% |
| Steel | 13.00 | 7.30 | 7.22 | +1.1% |
| Stainless Steel 310 | 14.00 | 8.00 | 7.78 | +2.9% |
| Stainless Steel 410 | 10.00 | 5.50 | 5.56 | -1.0% |
| Tin | 23.00 | 13.00 | 12.78 | +1.7% |
| Titanium | 9.00 | 4.80 | 5.00 | -4.0% |
| Tungsten | 4.00 | 2.40 | 2.22 | +8.0% |
| Zinc | 30.00 | 16.50 | 16.67 | -1.0% |

## Known unit-mode discrepancy

The two coefficient columns were each rounded independently from the source
tables rather than derived from one another. A coefficient in per-°F should
be exactly 5/9 of the same coefficient in per-°C, so for the materials below
the app returns a slightly different answer depending on which unit mode you
are in.

| Material | delta between unit modes |
|---|---|
| Beryllium | -4.0% |
| Invar, Copper Clad | +5.0% |
| Molybdenum | +8.0% |
| Monel | -3.6% |
| Titanium | -4.0% |
| Tungsten | +8.0% |

The largest gap is 8%. For a 1 in bar with a 10 °F rise, Tungsten yields
2.22e-5 in via the metric coefficient and 2.40e-5 in via the imperial one.

Fixing this means deciding which column is authoritative. The options are to
store one coefficient per material and derive the other at runtime, or to
carry more significant figures in both columns. Both change published
results, so the choice belongs with whoever owns the reference data.
