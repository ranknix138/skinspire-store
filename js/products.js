/**
 * Skinspire Aesthetic & Technology - Official Product Catalog
 * Skinspire Aesthetic & Technology Official Inventory
 * 
 * Strict VIP Pricing Rule:
 * Original Price -> 15% VIP Discount -> Rounded to nearest 50 (always ends in 50 or 00)
 */

function calculateVIPPrice(originalPrice) {
  const discounted = originalPrice * 0.85; // 15% discount
  return Math.round(discounted / 50) * 50; // Rounded to 50 or 100
}

const products = [
  // 1. AESTHETIC DEVICES & MICRONEEDLING
  {
    id: "dr-pen-a9",
    title: "Dr. Pen A9 Wireless Professional Microneedling Device",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 24000,
    price: calculateVIPPrice(24000), // 20,400 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Bestseller Device",
    rating: 5.0,
    reviewsCount: 38,
    image: "images/products/dr-pen-a9.jpg",
    shortDesc: "Original Dr. Pen A9 wireless auto-microneedling system with high-speed motor, ultra-fine needle cartridges, and adjustable depth dial (0.25mm - 2.5mm).",
    specs: [
      { label: "Battery", value: "Dual Rechargeable Batteries + Wired Mode" },
      { label: "Speeds", value: "6 Digital Speed Levels (Up to 18,000 RPM)" },
      { label: "Needle Adjustment", value: "0mm to 2.5mm calibrated dial" },
      { label: "Package", value: "Dr. Pen A9, Charger, Cable, 2 Cartridges, Box" }
    ],
    howToUse: "Insert sterile cartridge. Select needle depth (0.25-0.5mm for eye contour, 0.75-1.5mm for face). Work smoothly across skin with meso serum."
  },
  {
    id: "high-frequency-machine",
    title: "High Frequency Machine for Skin Tightening & Acne (4 Tubes)",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 11500,
    price: calculateVIPPrice(11500), // 9,800 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Clinic Essential",
    rating: 5.0,
    reviewsCount: 27,
    image: "images/products/high-frequency-machine.jpg",
    shortDesc: "Professional high-frequency electrotherapy wand equipped with 4 neon & argon gas glass electrodes (Mushroom, Hook, Spoon, Comb) for acne treatment, tightening, and scalp therapy.",
    specs: [
      { label: "Electrodes", value: "4 Glass Tubes: Mushroom, Spoon, Hook, Comb" },
      { label: "Gas Type", value: "Neon Gas (Orange) & Argon (Violet)" },
      { label: "Power", value: "220V Pakistan Plug" },
      { label: "Application", value: "Acne sterilization, collagen, hair growth" }
    ],
    howToUse: "Select desired glass tube. Adjust intensity dial. Use circular motions on acne lesions or sparking method to destroy bacteria."
  },
  {
    id: "dr-pen-m7s",
    title: "Dr. Pen M7S Rechargeable Microneedling Pen",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 28000,
    price: calculateVIPPrice(28000), // 23,800 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Clinic Grade",
    rating: 4.9,
    reviewsCount: 19,
    image: "images/products/dr-pen-m7s.jpg",
    shortDesc: "Rechargeable Dr. Pen M7S with up to 2.5mm needle depth and multi-speed digital settings for professional skin rejuvenation and collagen induction therapy.",
    specs: [
      { label: "Motor", value: "High precision Japanese motor" },
      { label: "Needle Gauge", value: "Compatible with 12, 24, 36 & Nano" },
      { label: "Operation", value: "Cordless & Corded dual operation" }
    ],
    howToUse: "Disinfect skin. Apply peptide serum. Glide vertically and horizontally across treatment zone."
  },
  {
    id: "ems-skin-scrubber",
    title: "EMS Ultrasonic Skin Scrubber & Deep Pore Spatula",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 8500,
    price: calculateVIPPrice(8500), // 7,250 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Deep Cleansing",
    rating: 4.8,
    reviewsCount: 14,
    image: "images/products/ems-skin-scrubber.jpg",
    shortDesc: "Deep ultrasonic pore cleansing spatula with 24,000Hz micro-vibrations and EMS microcurrent lifting mode for blackhead extraction and serum infusion.",
    specs: [
      { label: "Modes", value: "Cleansing, Ion+, Ion-, EMS Lifting" },
      { label: "Vibration", value: "24,000 Hz / Sec" },
      { label: "Charging", value: "USB Rechargeable" }
    ],
    howToUse: "Keep face wet with warm water or toner. Angle spatula 45 degrees to push blackheads. Reverse flat side for serum infusion."
  },
  {
    id: "galvanic-bio-face-lift",
    title: "Galvanic BIO Face Lift Machine - AU-8403 Microcurrent Device",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 65000,
    price: calculateVIPPrice(65000), // 55,250 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Salon Machine",
    rating: 4.9,
    reviewsCount: 11,
    image: "images/products/galvanic-bio-face-lift.jpg",
    shortDesc: "Professional microcurrent facial toning device for aesthetic salons and dermatology clinics for non-surgical face lifting and product iontophoresis.",
    specs: [
      { label: "Technology", value: "Galvanic Current + BIO Microcurrent" },
      { label: "Probes", value: "Dual Roller, Point Probe, Ground Bar" },
      { label: "Clinical Target", value: "Skin tightening, lymphatic drainage" }
    ],
    howToUse: "Apply conductive conductive gel or serum. Select negative polarity for deep cleansing, positive for product penetration."
  },
  {
    id: "kim-8-cavitation",
    title: "Kim 8 Cavitation Slimming Machine 6-in-1 Body Contouring System",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 155000,
    price: calculateVIPPrice(155000), // 131,750 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Clinic System",
    rating: 5.0,
    reviewsCount: 15,
    image: "images/products/kim-8-cavitation.jpg",
    shortDesc: "All-in-one 40K ultrasonic cavitation body contouring system with multipolar RF, vacuum bi-polar, and laser lipo pads for body slimming and skin tightening.",
    specs: [
      { label: "Cavitation", value: "40KHz Ultrasonic Unoisetion" },
      { label: "RF", value: "Tripolar, Quadrupolar, Sextupolar Radiofrequency" },
      { label: "Vacuum", value: "Bi-polar Vacuum with Smart LED" }
    ],
    howToUse: "Apply ultrasound transmission gel over target fat deposits. Perform cavitation for 20 mins followed by multipolar RF."
  },
  {
    id: "magic-bubble-machine",
    title: "Magic Bubble Foaming Facial Oxygen Machine",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 28000,
    price: calculateVIPPrice(28000), // 23,800 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Oxygen Facial",
    rating: 4.8,
    reviewsCount: 18,
    image: "images/products/magic-bubble-machine.jpg",
    shortDesc: "Micro-oxygen bubble producing skincare device for oxygenating deep facial treatments, micro-circulation enhancement, and intense dermal hydration.",
    specs: [
      { label: "Function", value: "Oxygen Foaming, Deep Pore Cleansing" },
      { label: "Power", value: "AC 220V 50Hz" }
    ],
    howToUse: "Add bubble foaming solution into container. Generate dense micro-foam across client's face. Leave for 10 minutes then cleanse."
  },
  {
    id: "medex-vein-finder",
    title: "Medex USA Portable Vein Finder VF-101",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 25000,
    price: calculateVIPPrice(25000), // 21,250 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Doctor Essential",
    rating: 5.0,
    reviewsCount: 12,
    image: "images/products/medex-vein-finder.jpg",
    description: "Infrared vein visualization device allowing aesthetic doctors and phlebotomists to locate subcutaneous veins accurately for cannulas and IV access.",
    specs: [
      { label: "Technology", value: "Near-Infrared LED Transillumination" },
      { label: "Portability", value: "Rechargeable Handheld Unit" }
    ],
    howToUse: "Dim clinic room lighting. Place illuminator ring against skin surface to display vein paths clearly."
  },

  // 2. CHEMICAL PEELS & BIOREVITALIZATION
  {
    id: "biorepeel-fnd",
    title: "BioRePeelCl3 FND Biphasic TCA Peel (5 x 6ml Vials) - Made in Italy",
    category: "Chemical Peels",
    categorySlug: "peels",
    originalPrice: 26000,
    price: calculateVIPPrice(26000), // 22,100 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Italian Innovation",
    rating: 5.0,
    reviewsCount: 49,
    image: "images/products/biorepeel-fnd.jpg",
    shortDesc: "Patented 35% Trichloroacetic Acid (TCA) biphasic medical peel enhanced with amino acids, GABA, and vitamins. Zero peeling downtime bio-revitalization.",
    specs: [
      { label: "Packaging", value: "5 Vials x 6ml (Total 30ml)" },
      { label: "Active Acids", value: "TCA 35%, Lactobionic, Salicylic, Tartaric, Citric" },
      { label: "Amino Acids", value: "Glycine, Proline, Hydroxyproline, Arginine" },
      { label: "Origin", value: "CMED Aesthetics (Italy)" }
    ],
    howToUse: "Shake vial vigorously to mix both phases. Draw 1.5-2ml with needle. Apply with nitrile gloves and massage for 3-5 mins. Wash off with cool water."
  },
  {
    id: "gent-peel",
    title: "Gent Peel Mixed Acid Professional Chemical Peel",
    category: "Chemical Peels",
    categorySlug: "peels",
    originalPrice: 6500,
    price: calculateVIPPrice(6500), // 5,550 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Pigmentation Care",
    rating: 4.7,
    reviewsCount: 13,
    image: "images/products/gent-peel.jpg",
    shortDesc: "Gentle multi-acid chemical peeling solution suited for sensitive Asian skin, intimate area lightening, and uniform keratolytic exfoliation without harsh peeling.",
    specs: [
      { label: "Active Blend", value: "Lactic Acid, Mandelic Acid, Kojic Acid" },
      { label: "Skin Type", value: "Fitzpatrick Types III - V" },
      { label: "Volume", value: "30ml Professional Bottle" }
    ],
    howToUse: "Degrease skin. Apply thin layer with fan brush. Leave for 5-8 minutes. Neutralize thoroughly."
  },

  // 3. MESO SERUMS, COCKTAILS & EXOSOMES
  {
    id: "sculptra-plla",
    title: "SCULPTRA Poly-L-Lactic Acid (PLLA) - 2 Vials (Original)",
    category: "Dermal Fillers",
    categorySlug: "fillers",
    originalPrice: 160000,
    price: calculateVIPPrice(160000), // 136,000 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Gold Standard",
    rating: 5.0,
    reviewsCount: 22,
    image: "images/products/sculptra-plla.jpg",
    shortDesc: "Original injectable PLLA collagen biostimulator restoring deep facial volume, treating nasolabial folds, and rejuvenating skin architecture for up to 2 years.",
    specs: [
      { label: "Box Quantity", value: "2 Vials of Lyophilized PLLA" },
      { label: "Reconstitution", value: "Reconstitute with Sterile Water 24-48 hrs prior" },
      { label: "Duration", value: "Up to 25 Months" }
    ],
    howToUse: "For certified medical aesthetic doctors only. Inject into deep dermis or subcutaneous layer via 25G cannula."
  },
  {
    id: "exovex-5b-exosomes",
    title: "Exovex Revive 5 Billion Exosomes | Made in USA",
    category: "Meso Serums",
    categorySlug: "serums",
    originalPrice: 155000,
    price: calculateVIPPrice(155000), // 131,750 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Exosome Therapy",
    rating: 5.0,
    reviewsCount: 18,
    image: "images/products/exovex-5b-exosomes.jpg",
    shortDesc: "Ultra-purified placental mesenchymal stem cell-derived exosomes containing 5 billion active extracellular vesicles with growth factors, cytokines, and regenerative mRNA.",
    specs: [
      { label: "Exosome Count", value: "5 Billion Extracellular Vesicles" },
      { label: "Manufacturer", value: "ExoCoBio / Exovex USA" },
      { label: "Storage", value: "Cold-chain 2Â°C - 8Â°C" }
    ],
    howToUse: "Thaw prior to procedure. Infuse topically during microneedling or RF microneedling treatments for rapid tissue renewal."
  },
  {
    id: "jennera-pn-nad",
    title: "Jennera PN NAD+ Skin Booster (2.5ml x 3 Syringes) - Korea",
    category: "Skin Boosters",
    categorySlug: "serums",
    originalPrice: 42000,
    price: calculateVIPPrice(42000), // 35,700 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Korean Skin Booster",
    rating: 4.9,
    reviewsCount: 21,
    image: "images/products/jennera-pn-nad.jpg",
    shortDesc: "Advanced Korean polydeoxyribonucleotide (PN) combined with cellular NAD+ coenzyme for DNA repair, deep dermal hydration, and cellular longevity.",
    specs: [
      { label: "Packaging", value: "3 Pre-filled Syringes x 2.5ml" },
      { label: "Key Actives", value: "Polynucleotides (PN) + NAD+ + Hyaluronic Acid" },
      { label: "Origin", value: "South Korea" }
    ],
    howToUse: "Superficial dermal papular microinjections (0.05ml per point) spaced 1cm apart across facial contours."
  },
  {
    id: "mesobase-stretch-scar",
    title: "MESOBASE Stretch & Scar Cocktail (5 x 10ml) - Made in Spain",
    category: "Meso Serums",
    categorySlug: "serums",
    originalPrice: 8500,
    price: calculateVIPPrice(8500), // 7,250 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Scar Repair",
    rating: 4.9,
    reviewsCount: 24,
    image: "images/products/mesobase-stretch-scar.jpg",
    shortDesc: "Spanish sterile mesotherapy cocktail combining Centella Asiatica, organic silicium, and collagen booster peptides for striae distensae and acne scarring.",
    specs: [
      { label: "Packaging", value: "5 Vials x 10ml" },
      { label: "Ingredients", value: "Centella Asiatica, Organic Silicon, Dexapanthenol" },
      { label: "Origin", value: "Spain" }
    ],
    howToUse: "Apply during microneedling or dermarolling sessions over stretch marks, surgical scars, or post-acne depressions."
  },
  {
    id: "mesobase-tranexamic",
    title: "Mesobase Tranexamic Acid Solution for Melasma & Pigmentation",
    category: "Meso Serums",
    categorySlug: "serums",
    originalPrice: 8000,
    price: calculateVIPPrice(8000), // 6,800 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Melasma Target",
    rating: 4.8,
    reviewsCount: 29,
    image: "images/products/mesobase-tranexamic.jpg",
    shortDesc: "Pure sterile tranexamic acid solution targeted for hormonal melasma, post-inflammatory erythema (PIE), and stubborn UV sun pigmentation.",
    specs: [
      { label: "Active Compound", value: "Tranexamic Acid Sterile Solution" },
      { label: "Volume", value: "5 Vials x 5ml" },
      { label: "Application", value: "Meso infusion / Micro-needling" }
    ],
    howToUse: "Apply 2-3ml directly over pigmented patches. Use 0.5mm microneedle cartridge. Apply broad-spectrum sunscreen post-care."
  },
  {
    id: "hydurage-glutathione",
    title: "HYDURAGE Glutathione Premium Meso Ampoules - Made in France",
    category: "Meso Serums",
    categorySlug: "serums",
    originalPrice: 7500,
    price: calculateVIPPrice(7500), // 6,400 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Skin Lightening",
    rating: 4.9,
    reviewsCount: 16,
    image: "images/products/hydurage-glutathione.jpg",
    shortDesc: "High-grade French L-Glutathione antioxidant mesotherapy vial for clinical skin lightening, free radical scavenging, and radiant glow.",
    specs: [
      { label: "Active Strength", value: "High Purity L-Glutathione + Ascorbic Acid" },
      { label: "Packaging", value: "5 Vials x 5ml" },
      { label: "Manufacturer", value: "Hydurage Laboratories France" }
    ],
    howToUse: "Infuse via hydra stamp, dermapen, or mesotherapy gun across face, neck, and hands."
  },
  {
    id: "reglory-exo",
    title: "Reglory EXO Lyophilized Exosome 50mg + 6ml HA Solvent",
    category: "Meso Serums",
    categorySlug: "serums",
    originalPrice: 35000,
    price: calculateVIPPrice(35000), // 29,750 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Tissue Regeneration",
    rating: 5.0,
    reviewsCount: 15,
    image: "images/products/reglory-exo.jpg",
    shortDesc: "Korean freeze-dried exosome complex with 50mg lyophilized powder and 6ml hyaluronic activating solution for rapid tissue regeneration and collagen synthesis.",
    specs: [
      { label: "Vial 1", value: "50mg Freeze-Dried Exosomes & Peptides" },
      { label: "Vial 2", value: "6ml Cross-linked Hyaluronic Acid Solvent" },
      { label: "Origin", value: "South Korea" }
    ],
    howToUse: "Inject solvent into lyophilized powder vial. Swirl gently until fully dissolved. Apply with microneedling pen."
  },

  // 4. CLINICAL ANESTHETICS & NUMBING CREAMS
  {
    id: "richesse-caine",
    title: "Richesse Caine Topical Numbing Cream 30g (10.56% Lidocaine)",
    category: "Clinical Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 4500,
    price: calculateVIPPrice(4500), // 3,850 (ends in 50)
    badge: "15% OFF VIP",
    tag: "High Strength",
    rating: 5.0,
    reviewsCount: 52,
    image: "images/products/richesse-caine.jpg",
    shortDesc: "High-concentration 10.56% lidocaine topical anesthetic cream for microneedling, laser hair removal, dermal fillers, and tattooing.",
    specs: [
      { label: "Lidocaine Concentration", value: "10.56% High Potency" },
      { label: "Tube Weight", value: "30 Grams Sealed Tube" },
      { label: "Onset Time", value: "15-20 Minutes" }
    ],
    howToUse: "Apply thick layer over treatment area. Cover with plastic film for 20 minutes. Wipe cleanly before injecting."
  },
  {
    id: "muchcaine-cream",
    title: "MUCHCAINE Topical Anesthetic Cream 30g (10.56% Lidocaine)",
    category: "Clinical Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 4500,
    price: calculateVIPPrice(4500), // 3,850 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Rapid Numbing",
    rating: 4.9,
    reviewsCount: 36,
    image: "images/products/muchcaine-cream.jpg",
    shortDesc: "Fast-acting dermatological numbing cream with 10.56% lidocaine base providing rapid epidermal insensibility within 20 minutes.",
    specs: [
      { label: "Active", value: "Lidocaine 105.6mg per gram" },
      { label: "Weight", value: "30g Tube" },
      { label: "Origin", value: "South Korea" }
    ],
    howToUse: "Apply uniform coat to intact skin under occlusion for 20-25 minutes."
  },
  {
    id: "kelen-spray",
    title: "Kelen Chloraethyl Topical Cryo Numbing Spray",
    category: "Clinical Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 6000,
    price: calculateVIPPrice(6000), // 5,100 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Cryo Freezing",
    rating: 4.8,
    reviewsCount: 19,
    image: "images/products/kelen-spray.jpg",
    shortDesc: "Instant cryo-anesthetic freezing spray for needle venipuncture, minor skin incisions, and localized pain alleviation during aesthetic injections.",
    specs: [
      { label: "Formula", value: "Ethyl Chloride Spray" },
      { label: "Can Size", value: "175ml Aerosol Spray" },
      { label: "Action Time", value: "Instant (Within 5-10 seconds)" }
    ],
    howToUse: "Hold can 20-30cm away from skin. Spray target area until thin white frost appears, then inject immediately."
  },

  // 5. KOREAN DERMA-SKINCARE ESSENTIALS
  {
    id: "anua-niacinamide",
    title: "Anua Niacinamide 10% + TXA 4% Dark Spot Serum 30ml",
    category: "Korean Skincare",
    categorySlug: "skincare",
    originalPrice: 7500,
    price: calculateVIPPrice(7500), // 6,400 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Viral Korean",
    rating: 5.0,
    reviewsCount: 44,
    image: "images/products/anua-niacinamide.jpg",
    shortDesc: "Viral Korean corrective serum formulating 10% Niacinamide, 4% Tranexamic Acid, and Arbutin to fade stubborn sun spots and post-blemish marks.",
    specs: [
      { label: "Actives", value: "Niacinamide 10%, TXA 4%, Arbutin 2%" },
      { label: "Skin Benefit", value: "Hyperpigmentation, acne scar redness" },
      { label: "Volume", value: "30ml Dropper Bottle" }
    ],
    howToUse: "Apply 3-4 drops morning and night after cleansing. Follow with barrier moisturizer."
  },
  {
    id: "anua-azelaic-acid",
    title: "ANUA Azelaic Acid 10+ Hyaluron Redness Soothing Serum",
    category: "Korean Skincare",
    categorySlug: "skincare",
    originalPrice: 7200,
    price: calculateVIPPrice(7200), // 6,100 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Rosacea Soothing",
    rating: 4.8,
    reviewsCount: 22,
    image: "images/products/anua-azelaic-acid.jpg",
    shortDesc: "Clinical azelaic acid 10% blend with multi-molecular hyaluronic acid for rosacea-prone skin, calming facial flushing, acne pustules, and bumpy texture.",
    specs: [
      { label: "Active", value: "Azelaic Acid 10% + Centella Asiatica" },
      { label: "Target", value: "Redness, rosacea, acne inflammation" }
    ],
    howToUse: "Dispense small amount across face after toner. Use daily for anti-inflammatory maintenance."
  },
  {
    id: "anua-pdrn-mist",
    title: "ANUA PDRN Hyaluronic Acid Dewy Glow Capsule Mist 100ml",
    category: "Korean Skincare",
    categorySlug: "skincare",
    originalPrice: 7500,
    price: calculateVIPPrice(7500), // 6,400 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Dewy Glow",
    rating: 4.9,
    reviewsCount: 17,
    image: "images/products/anua-pdrn-mist.jpg",
    shortDesc: "Salmon DNA PDRN enriched hydrating capsule mist that delivers an ultra-fine glass-skin moisture barrier throughout the day.",
    specs: [
      { label: "Core Ingredient", value: "PDRN (Salmon DNA) + 8 Hyaluronic Acids" },
      { label: "Finish", value: "Non-greasy radiant glass skin" }
    ],
    howToUse: "Hold 20cm away from face and spritz with eyes closed whenever skin feels dry or tight."
  },
  {
    id: "dr-althea-melaclear",
    title: "Dr. Althea Melaclear Cream 20g - Dark Spot Care",
    category: "Korean Skincare",
    categorySlug: "skincare",
    originalPrice: 7000,
    price: calculateVIPPrice(7000), // 5,950 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Melanin Control",
    rating: 4.9,
    reviewsCount: 20,
    image: "images/products/dr-althea-melaclear.jpg",
    shortDesc: "Targeted Korean dark spot treatment cream formulated with Tranexamic Acid and Glutathione to clear localized melanin deposits.",
    specs: [
      { label: "Active Ingredients", value: "Tranexamic Acid, Glutathione, Niacinamide" },
      { label: "Weight", value: "20g Precision Nozzle Tube" }
    ],
    howToUse: "Dab directly onto dark spots, freckles, or melasma patches as the final step of nighttime skincare."
  },

  // 6. SALON LASHES, BROWS & NAILS
  {
    id: "skinspire-eyelash-kit",
    title: "Skinspire Professional Eyelash Extension Kit with Glue & Tools",
    category: "Salon Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 15000,
    price: calculateVIPPrice(15000), // 12,750 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Salon Professional",
    rating: 5.0,
    reviewsCount: 28,
    image: "images/products/skinspire-eyelash-kit.jpg",
    shortDesc: "Complete professional eyelash extension kit including individual mink lash trays, medical adhesive glue, precision tweezers, and lash primer.",
    specs: [
      { label: "Kit Contents", value: "Lash Trays (C/D Curl), Medical Adhesive, 2 Tweezers, Primer" },
      { label: "Quality", value: "Salon grade, long retention formula" }
    ],
    howToUse: "Cleanse natural lashes. Apply under-eye gel pads. Isolate single lash and bond extension with precision adhesive."
  },
  {
    id: "brow-lamination-kit",
    title: "Professional Brow Lamination Kit - Salon Grade System",
    category: "Salon Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 6000,
    price: calculateVIPPrice(6000), // 5,100 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Feathered Brows",
    rating: 4.8,
    reviewsCount: 23,
    image: "images/products/brow-lamination-kit.jpg",
    shortDesc: "Salon-grade perming, fixing, and keratin nourishing kit creating full, feathered, natural-looking brows lasting 6-8 weeks.",
    specs: [
      { label: "Kit Steps", value: "1. Perm Lotion, 2. Fixation, 3. Nutrition, 4. Cleanser" },
      { label: "Duration", value: "Lasts 6 to 8 weeks" }
    ],
    howToUse: "Brush brows into place. Apply perm lotion under cling wrap for 6 mins. Apply fixation for 6 mins. Finish with keratin nutrition oil."
  },
  {
    id: "xeijayi-cat-eye-gel",
    title: "XEIJAYI Cat Eye Magnetic Nail Gel Polish 15ml",
    category: "Salon Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 3200,
    price: calculateVIPPrice(3200), // 2,700 (ends in 00)
    badge: "15% OFF VIP",
    tag: "3D Magnetic",
    rating: 4.9,
    reviewsCount: 20,
    image: "images/products/xeijayi-cat-eye-gel.jpg",
    shortDesc: "Premium magnetic gel polish with dense micro-iron particles producing mesmerizing 3D galaxy cat-eye effects under UV/LED lamps.",
    specs: [
      { label: "Volume", value: "15ml Glass Bottle" },
      { label: "Curing", value: "60s under LED / 120s under UV" }
    ],
    howToUse: "Apply black base gel and cure. Apply cat eye polish. Hold magnet stick 5mm above nail for 5 seconds to create beam pattern. Cure immediately."
  },
  {
    id: "twoing-solid-builder-gel",
    title: "TWOING Solid 3D Builder Nail Gel - 15g Non-Stick Formula",
    category: "Salon Supplies",
    categorySlug: "salon-supplies",
    originalPrice: 3800,
    price: calculateVIPPrice(3800), // 3,250 (ends in 50)
    badge: "15% OFF VIP",
    tag: "Nail Extension",
    rating: 4.9,
    reviewsCount: 16,
    image: "images/products/twoing-solid-builder-gel.jpg",
    shortDesc: "Innovative non-sticky solid sculpture gel moldable with bare hands for 3D nail art embellishments, floral charms, and extension shaping.",
    specs: [
      { label: "Texture", value: "Non-stick solid putty gel" },
      { label: "Weight", value: "15 Grams Jar" }
    ],
    howToUse: "Scoop small bead with silicone tool or clean fingers. Shape onto nail tip. Cure under UV lamp for 60 seconds."
  },
  {
    id: "magnetic-massage-comb",
    title: "Magnetic Oil Dispensing Massage Comb with Red Light Therapy",
    category: "Aesthetic Devices",
    categorySlug: "devices",
    originalPrice: 8000,
    price: calculateVIPPrice(8000), // 6,800 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Scalp Therapy",
    rating: 4.8,
    reviewsCount: 14,
    image: "images/products/magnetic-massage-comb.jpg",
    shortDesc: "Rechargeable electric scalp massager with magnetic bristles, red LED light therapy (650nm), and precision liquid serum roller balls for hair growth serums.",
    specs: [
      { label: "Light Therapy", value: "Red Light (650nm) follicle stimulation" },
      { label: "Reservoir", value: "Liquid serum reservoir with dispenser teeth" }
    ],
    howToUse: "Pour minoxidil or hair growth serum into reservoir. Turn on red light vibration. Comb through scalp for 10 minutes."
  },
  {
    id: "mens-rogaine-5",
    title: "Men's Rogaine 5% Minoxidil Foam (3-Month Supply, 3x60g)",
    category: "Korean Skincare",
    categorySlug: "skincare",
    originalPrice: 34000,
    price: calculateVIPPrice(34000), // 28,900 (ends in 00)
    badge: "15% OFF VIP",
    tag: "Hair Regrowth",
    rating: 5.0,
    reviewsCount: 35,
    image: "images/products/mens-rogaine-5.jpg",
    shortDesc: "Original USA FDA-approved 5% Minoxidil topical aerosol foam clinically proven to reactivate shrunken hair follicles and stimulate new hair density.",
    specs: [
      { label: "Supply", value: "3 Cans x 60g (3 Months Total)" },
      { label: "Strength", value: "5% Minoxidil Topical Aerosol" },
      { label: "Origin", value: "Made in USA (Johnson & Johnson)" }
    ],
    howToUse: "Dispense half a cap of foam directly onto fingers. Massage into thinning scalp areas twice daily on dry hair."
  }
];

// Helper to get formatted PKR price string
function formatPKR(num) {
  return "Rs. " + num.toLocaleString('en-US');
}

function formatPKRFull(num) {
  return "Rs. " + num.toLocaleString('en-US') + " PKR";
}

// Top 6 Curated Featured Products for Compact Landing Page (2-2-2 mobile / 3-3 desktop)
const featuredProductIds = [
  "dr-pen-a9",
  "biorepeel-fnd",
  "high-frequency-machine",
  "exovex-5b-exosomes",
  "muchcaine-cream",
  "skinspire-eyelash-kit"
];

// Dynamic Category Tiles with authentic product thumbnails and exact counts
const categories = [
  {
    name: "All Products",
    shortName: "All Items",
    slug: "all",
    image: "images/products/dr-pen-a9.jpg",
    count: products.length
  },
  {
    name: "Aesthetic Devices",
    shortName: "Devices",
    slug: "devices",
    image: "images/products/dr-pen-a9.jpg",
    count: products.filter(p => p.categorySlug === "devices").length
  },
  {
    name: "Meso & Boosters",
    shortName: "Meso Serums",
    slug: "serums",
    image: "images/products/exovex-5b-exosomes.jpg",
    count: products.filter(p => p.categorySlug === "serums").length
  },
  {
    name: "Chemical Peels",
    shortName: "Peels",
    slug: "peels",
    image: "images/products/biorepeel-fnd.jpg",
    count: products.filter(p => p.categorySlug === "peels").length
  },
  {
    name: "Dermal Fillers",
    shortName: "Fillers",
    slug: "fillers",
    image: "images/products/sculptra-plla.jpg",
    count: products.filter(p => p.categorySlug === "fillers").length
  },
  {
    name: "Korean Skincare",
    shortName: "Skincare",
    slug: "skincare",
    image: "images/products/anua-niacinamide.jpg",
    count: products.filter(p => p.categorySlug === "skincare").length
  },
  {
    name: "Clinic & Salon",
    shortName: "Salon & Clinic",
    slug: "salon-supplies",
    image: "images/products/skinspire-eyelash-kit.jpg",
    count: products.filter(p => p.categorySlug === "salon-supplies").length
  }
];

