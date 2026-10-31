# SahiCar car-data schema (research output)

Each research file is a JSON array of `Car` objects. Prices are **ex-showroom Delhi in INR (integers)**, current as of
Oct 2026, i.e. after the GST 2.0 rate change of 22 Sep 2025. If you cannot verify a field, use `null` — never invent.

```jsonc
{
  "id": "maruti-brezza",                 // kebab-case brand-model, unique
  "brand": "Maruti Suzuki",
  "model": "Brezza",
  "body": "hatchback",                    // hatchback | sedan | compact-suv (sub-4m SUV) | suv | mpv | pickup | coupe
  "segment": "B",                        // A (entry) | B | C | D | E | luxury
  "launched": "2022-06",                 // launch of the current generation (YYYY-MM)
  "lastUpdate": "2025-09",               // last facelift / meaningful update, or null
  "price": { "min": 869000, "max": 1398000 },
  "seats": [5],                          // e.g. [6, 7] for MPVs offered in both
  "dims": { "length": 3995, "width": 1790, "height": 1685, "wheelbase": 2500,
            "groundClearance": 198, "boot": 328, "kerbWeight": 1120, "fuelTank": 48, "turningRadius": 5.2 },
  "safety": { "agency": "BNCAP",         // BNCAP | GNCAP | ANCAP | EuroNCAP | none
              "adult": 4, "child": 4,    // stars, null if untested
              "year": 2024, "airbagsStd": 6, "airbagsMax": 6,
              "esc": true, "adas": "none" },   // none | L1 | L2
  "powertrains": [
    { "fuel": "petrol",                  // petrol | diesel | cng | mild-hybrid | strong-hybrid | ev
      "engine": "1.5L K15C 4-cyl NA",
      "cc": 1462, "powerPs": 103, "torqueNm": 137,
      "transmissions": ["MT5", "AT6"],   // MT5, MT6, AT6 (torque-converter), AMT5, CVT, DCT7, iMT, e-CVT, single-speed
      "efficiency": 19.89,               // ARAI/claimed: kmpl (petrol/diesel/hybrid), km/kg (CNG), km range (EV, MIDC/ARAI)
      "batteryKwh": null,                // EV only
      "priceFrom": 869000 }              // cheapest variant with this powertrain
  ],
  "variants": [                          // the full variant ladder where you can find it (name, fuel, transmission, price)
    { "name": "LXi", "fuel": "petrol", "transmission": "MT", "price": 869000 }
  ],
  "features": ["sunroof", "360-camera", "ventilated-seats", "wireless-carplay", "6-airbags", "adas", "hud", "cruise"],
  "highlights": ["Short, factual strengths"],
  "weaknesses": ["Short, factual weaknesses"],
  "serviceCost": 2,                      // 1 (very cheap) .. 5 (expensive) — typical 5-yr maintenance relative to segment
  "resale": 4,                           // 1 (poor) .. 5 (excellent) — 3-5 yr resale strength in India
  "network": 5,                          // 1 (sparse) .. 5 (everywhere incl. small towns) — service network reach
  "wiki": "Maruti Suzuki Brezza",       // exact English Wikipedia article title (used for a free image)
  "oemUrl": "https://www.marutisuzuki.com/brezza",
  "sources": ["https://..."],
  "verifiedOn": "2026-10"
}
```

Upcoming launches use:

```jsonc
{ "id": "maruti-e-vitara", "brand": "Maruti Suzuki", "model": "e Vitara", "body": "suv",
  "expected": "2026-Q4",                // YYYY-Qn or YYYY-Hn or YYYY-MM if confirmed
  "price": { "min": 1700000, "max": 2500000 },   // expected, ex-showroom; null if unknown
  "fuels": ["ev"], "status": "confirmed",          // launched-recently | confirmed | testing | rumoured
  "rivals": ["hyundai-creta-ev"],                  // ids of existing cars it competes with
  "waitAdvice": "Why a buyer of X might wait for this",
  "notes": "Key facts", "wiki": null, "sources": ["https://..."] }
```
