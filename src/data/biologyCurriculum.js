// ============================================================
// AQA GCSE Biology (8461) — fully-populated curriculum.
// Same shape as the Maths course: unit → lesson → (topics + questions).
// Progress is tracked per question and persisted per user.
//
// Freemium model: lessons in weeks 1–3 are free; weeks 4+ are premium.
// (The free-week threshold itself lives in curriculum.js.)
// ============================================================

// Question shapes:
//   { type: 'mcq', options: [...], answer: <index> }
//   { type: 'numeric', answer: <number>, tolerance?: <number> }
//   { type: 'short', answer: <string|string[]> }   (case/space-insensitive match)

export const BIOLOGY = {
  slug: 'biology',
  name: 'Biology',
  spec: 'AQA 8461',
  tiers: 'Foundation & Higher',
  units: [
    {
      id: 'b-cells',
      title: 'Cell Biology',
      blurb: 'Cell structure, microscopy, transport in and out of cells, and cell division.',
      lessons: [
        {
          id: 'bio-l1',
          title: 'Animal & Plant Cells',
          week: 1,
          minutes: 20,
          summary: 'Identify the sub-cellular structures of eukaryotic cells and explain what each one does.',
          topics: [
            {
              heading: 'Eukaryotic sub-cellular structures',
              body: 'Animal and plant cells are eukaryotic — they have a nucleus that holds the genetic material. Both contain cytoplasm, a cell membrane, mitochondria (aerobic respiration) and ribosomes (protein synthesis). Plant cells additionally have a cellulose cell wall, a permanent vacuole and chloroplasts containing chlorophyll for photosynthesis.',
            },
            {
              heading: 'Prokaryotes vs eukaryotes',
              body: 'Prokaryotic cells (bacteria) are much smaller and have no nucleus — their single loop of DNA floats free in the cytoplasm, often alongside small rings called plasmids. Eukaryotic cells are larger and keep their DNA inside a membrane-bound nucleus.',
            },
          ],
          questions: [
            {
              id: 'bio-l1-q1', type: 'mcq', marks: 1,
              prompt: 'Which structure is found in a plant cell but NOT an animal cell?',
              options: ['Mitochondria', 'Cell membrane', 'Chloroplast', 'Ribosome'],
              answer: 2,
              solution: 'Chloroplasts (where photosynthesis happens) are only in plant and algal cells; the others are in both.',
            },
            {
              id: 'bio-l1-q2', type: 'short', marks: 1,
              prompt: 'Name the sub-cellular structure where most aerobic respiration takes place.',
              answer: ['mitochondria', 'mitochondrion'],
              solution: 'Aerobic respiration releases energy inside the mitochondria.',
            },
            {
              id: 'bio-l1-q3', type: 'mcq', marks: 1,
              prompt: 'A cell has no nucleus and contains plasmids. What type of cell is it?',
              options: ['Eukaryotic', 'Prokaryotic', 'Plant', 'Fungal'],
              answer: 1,
              solution: 'No true nucleus + plasmids = a prokaryotic cell, such as a bacterium.',
            },
            {
              id: 'bio-l1-q4', type: 'short', marks: 1,
              prompt: 'Which part of a cell controls the activities of the cell and contains DNA?',
              answer: ['nucleus'],
              solution: 'The nucleus contains the chromosomes (DNA) and controls the cell.',
            },
          ],
        },
        {
          id: 'bio-l2',
          title: 'Microscopy & Magnification',
          week: 2,
          minutes: 25,
          summary: 'Use the magnification equation and convert confidently between millimetres and micrometres.',
          topics: [
            {
              heading: 'The magnification equation',
              body: 'magnification = image size ÷ real size. Rearrange to find any missing value. Keep the image size and real size in the SAME units before dividing.',
            },
            {
              heading: 'Units and conversions',
              body: '1 mm = 1000 micrometres (µm). Electron microscopes have much higher magnification and resolution than light microscopes, which is why they reveal sub-cellular structures light microscopes cannot.',
            },
          ],
          questions: [
            {
              id: 'bio-l2-q1', type: 'numeric', marks: 2,
              prompt: 'An image of a cell is 30 mm wide. The real cell is 0.06 mm wide. Calculate the magnification.',
              answer: 500,
              solution: 'magnification = image ÷ real = 30 ÷ 0.06 = ×500.',
            },
            {
              id: 'bio-l2-q2', type: 'numeric', marks: 1,
              prompt: 'Convert 0.05 mm into micrometres (µm).',
              answer: 50,
              solution: '1 mm = 1000 µm, so 0.05 × 1000 = 50 µm.',
            },
            {
              id: 'bio-l2-q3', type: 'mcq', marks: 1,
              prompt: 'Why can an electron microscope show ribosomes when a light microscope cannot?',
              options: ['It is cheaper', 'It has higher resolution', 'It uses sound', 'It stains cells red'],
              answer: 1,
              solution: 'Greater resolving power lets the electron microscope distinguish very small structures.',
            },
          ],
        },
        {
          id: 'bio-l3',
          title: 'Diffusion, Osmosis & Active Transport',
          week: 3,
          minutes: 25,
          summary: 'Compare the three transport processes and identify when each one moves substances across membranes.',
          topics: [
            {
              heading: 'Diffusion and osmosis',
              body: 'Diffusion is the net movement of particles from a higher to a lower concentration (down a gradient) — no energy needed. Osmosis is the diffusion of water across a partially permeable membrane, from a dilute solution to a more concentrated one.',
            },
            {
              heading: 'Active transport',
              body: 'Active transport moves substances AGAINST the concentration gradient (low to high), so it requires energy from respiration. Root hair cells use it to absorb mineral ions from dilute soil water.',
            },
          ],
          questions: [
            {
              id: 'bio-l3-q1', type: 'mcq', marks: 1,
              prompt: 'Which process moves substances against the concentration gradient and needs energy?',
              options: ['Diffusion', 'Osmosis', 'Active transport', 'Evaporation'],
              answer: 2,
              solution: 'Only active transport works against the gradient, using energy from respiration.',
            },
            {
              id: 'bio-l3-q2', type: 'short', marks: 1,
              prompt: 'Osmosis is the movement of which substance across a partially permeable membrane?',
              answer: ['water'],
              solution: 'Osmosis specifically describes the movement of water molecules.',
            },
            {
              id: 'bio-l3-q3', type: 'mcq', marks: 1,
              prompt: 'A plant cell is placed in pure water. What happens to it?',
              options: ['It loses water and shrinks', 'It gains water and becomes turgid', 'Nothing changes', 'It bursts immediately'],
              answer: 1,
              solution: 'Water moves in by osmosis; the cell wall stops it bursting, so it becomes firm (turgid).',
            },
          ],
        },
      ],
    },
    {
      id: 'b-organisation',
      title: 'Organisation',
      blurb: 'Cells to tissues to organs to systems: enzymes, digestion and the heart.',
      lessons: [
        {
          id: 'bio-l4',
          title: 'Enzymes & the Lock-and-Key Model',
          week: 4,
          minutes: 25,
          summary: 'Explain enzyme action and how temperature and pH affect the rate of enzyme-controlled reactions.',
          topics: [
            {
              heading: 'Biological catalysts',
              body: 'Enzymes are proteins that speed up reactions without being used up. Each enzyme has an active site with a specific shape that fits one substrate — the “lock and key” model.',
            },
            {
              heading: 'Denaturing',
              body: 'Rate increases with temperature up to an optimum. Too hot, or the wrong pH, changes the shape of the active site so the substrate no longer fits — the enzyme is denatured and stops working.',
            },
          ],
          questions: [
            {
              id: 'bio-l4-q1', type: 'mcq', marks: 1,
              prompt: 'What happens to an enzyme’s active site when it is denatured?',
              options: ['It gets larger', 'Its shape changes so the substrate no longer fits', 'It speeds up', 'It turns into a substrate'],
              answer: 1,
              solution: 'Denaturing changes the active site shape, so the substrate can no longer bind.',
            },
            {
              id: 'bio-l4-q2', type: 'short', marks: 1,
              prompt: 'Enzymes are made from which type of large biological molecule?',
              answer: ['protein', 'proteins'],
              solution: 'All enzymes are proteins.',
            },
            {
              id: 'bio-l4-q3', type: 'mcq', marks: 1,
              prompt: 'Which enzyme breaks down starch into sugars?',
              options: ['Protease', 'Lipase', 'Amylase', 'Catalase'],
              answer: 2,
              solution: 'Amylase (a carbohydrase) digests starch into simple sugars.',
            },
          ],
        },
        {
          id: 'bio-l5',
          title: 'The Heart & Circulation',
          week: 5,
          minutes: 25,
          summary: 'Trace the path of blood through the double circulatory system and name the main blood vessels.',
          topics: [
            {
              heading: 'Double circulation',
              body: 'Humans have a double circulatory system: one loop carries deoxygenated blood from the heart to the lungs, the other carries oxygenated blood from the heart to the body. The heart pumps both.',
            },
            {
              heading: 'Blood vessels',
              body: 'Arteries carry blood away from the heart at high pressure (thick muscular walls). Veins return blood to the heart at low pressure and have valves. Capillaries are one cell thick for fast exchange of substances.',
            },
          ],
          questions: [
            {
              id: 'bio-l5-q1', type: 'mcq', marks: 1,
              prompt: 'Which blood vessel carries blood AWAY from the heart?',
              options: ['Vein', 'Artery', 'Capillary', 'Ventricle'],
              answer: 1,
              solution: 'Arteries carry blood away from the heart; veins carry it back.',
            },
            {
              id: 'bio-l5-q2', type: 'short', marks: 1,
              prompt: 'Which chamber of the heart pumps oxygenated blood out to the body?',
              answer: ['left ventricle'],
              solution: 'The left ventricle has the thickest muscle wall to pump blood around the whole body.',
            },
            {
              id: 'bio-l5-q3', type: 'mcq', marks: 1,
              prompt: 'Why are capillary walls only one cell thick?',
              options: ['To carry blood quickly', 'To allow fast exchange of substances', 'To raise blood pressure', 'To store oxygen'],
              answer: 1,
              solution: 'A short diffusion distance lets oxygen and nutrients exchange rapidly with cells.',
            },
          ],
        },
      ],
    },
    {
      id: 'b-infection',
      title: 'Infection & Response',
      blurb: 'Pathogens, the body’s defences, the immune system and vaccination.',
      lessons: [
        {
          id: 'bio-l6',
          title: 'Pathogens & Disease',
          week: 6,
          minutes: 20,
          summary: 'Classify the four types of pathogen and describe how communicable diseases spread.',
          topics: [
            {
              heading: 'Types of pathogen',
              body: 'Pathogens are microorganisms that cause communicable disease. The four types are bacteria, viruses, fungi and protists. Bacteria and viruses reproduce rapidly inside the body; viruses live and reproduce inside cells, damaging them.',
            },
            {
              heading: 'Spread and prevention',
              body: 'Disease spreads by direct contact, water, air (droplets) or vectors. Spread can be reduced by hygiene, destroying vectors, isolation and vaccination.',
            },
          ],
          questions: [
            {
              id: 'bio-l6-q1', type: 'mcq', marks: 1,
              prompt: 'Which of these is NOT a type of pathogen?',
              options: ['Bacterium', 'Virus', 'Mineral ion', 'Fungus'],
              answer: 2,
              solution: 'Mineral ions are nutrients, not pathogens. Pathogens are bacteria, viruses, fungi and protists.',
            },
            {
              id: 'bio-l6-q2', type: 'short', marks: 1,
              prompt: 'What general name is given to a microorganism that causes disease?',
              answer: ['pathogen'],
              solution: 'A pathogen is any disease-causing microorganism.',
            },
            {
              id: 'bio-l6-q3', type: 'mcq', marks: 1,
              prompt: 'Measles is caused by a virus. Where do viruses reproduce?',
              options: ['In the blood plasma only', 'Inside host cells', 'In the stomach acid', 'On the skin surface'],
              answer: 1,
              solution: 'Viruses invade and reproduce inside host cells, damaging them as they burst out.',
            },
          ],
        },
        {
          id: 'bio-l7',
          title: 'White Blood Cells & Vaccination',
          week: 7,
          minutes: 25,
          summary: 'Explain how white blood cells defend the body and how vaccines give immunity.',
          topics: [
            {
              heading: 'The immune response',
              body: 'White blood cells defend the body by phagocytosis (engulfing pathogens), producing antibodies that target specific pathogens, and producing antitoxins to neutralise toxins.',
            },
            {
              heading: 'How vaccines work',
              body: 'A vaccine introduces small quantities of dead or inactive pathogen. White blood cells respond by making antibodies. If the real pathogen later enters, the body produces the correct antibodies quickly enough to prevent illness.',
            },
          ],
          questions: [
            {
              id: 'bio-l7-q1', type: 'mcq', marks: 1,
              prompt: 'Which process describes a white blood cell engulfing a pathogen?',
              options: ['Phagocytosis', 'Photosynthesis', 'Osmosis', 'Respiration'],
              answer: 0,
              solution: 'Phagocytosis is when a white blood cell surrounds and digests a pathogen.',
            },
            {
              id: 'bio-l7-q2', type: 'short', marks: 1,
              prompt: 'What protein, produced by white blood cells, targets a specific pathogen?',
              answer: ['antibody', 'antibodies'],
              solution: 'Antibodies lock onto specific antigens on a pathogen.',
            },
            {
              id: 'bio-l7-q3', type: 'mcq', marks: 1,
              prompt: 'A vaccine contains dead or inactive pathogen. Why does this make a person immune?',
              options: [
                'It kills all bacteria in the body',
                'It triggers antibody production so a second response is fast',
                'It removes the need to eat well',
                'It replaces white blood cells',
              ],
              answer: 1,
              solution: 'The body “remembers” how to make the right antibody, so a real infection is dealt with quickly.',
            },
          ],
        },
      ],
    },
    {
      id: 'b-bioenergetics',
      title: 'Bioenergetics',
      blurb: 'Photosynthesis and respiration — how organisms transfer energy.',
      lessons: [
        {
          id: 'bio-l8',
          title: 'Photosynthesis',
          week: 8,
          minutes: 25,
          summary: 'Recall the photosynthesis equation and the factors that limit the rate of photosynthesis.',
          topics: [
            {
              heading: 'The reaction',
              body: 'Photosynthesis is endothermic — it transfers energy from light into the plant. Word equation: carbon dioxide + water → glucose + oxygen (using light energy, in the chloroplasts).',
            },
            {
              heading: 'Limiting factors',
              body: 'The rate is limited by light intensity, carbon dioxide concentration and temperature. Increasing a limiting factor speeds up the rate until another factor becomes limiting.',
            },
          ],
          questions: [
            {
              id: 'bio-l8-q1', type: 'mcq', marks: 1,
              prompt: 'Which gas is produced by photosynthesis?',
              options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
              answer: 2,
              solution: 'Photosynthesis releases oxygen as a by-product: CO₂ + water → glucose + oxygen.',
            },
            {
              id: 'bio-l8-q2', type: 'short', marks: 1,
              prompt: 'Name the green pigment that absorbs light for photosynthesis.',
              answer: ['chlorophyll'],
              solution: 'Chlorophyll, found in chloroplasts, absorbs light energy.',
            },
            {
              id: 'bio-l8-q3', type: 'mcq', marks: 1,
              prompt: 'On a warm, bright day, which factor is most likely limiting photosynthesis in a greenhouse?',
              options: ['Light intensity', 'Temperature', 'Carbon dioxide concentration', 'Water depth'],
              answer: 2,
              solution: 'With plenty of light and warmth, CO₂ concentration is usually the limiting factor.',
            },
          ],
        },
      ],
    },
  ],
}
