// ============================================================
// AQA GCSE Mathematics (8300) — fully-populated curriculum.
// Structure: unit → lesson → (topics + questions).
// Progress is tracked per question and persisted per user.
//
// Freemium model: lessons in weeks 1–3 are free; weeks 4+ are premium.
// (The free-week threshold itself lives in curriculum.js.)
// ============================================================

// Question shapes:
//   { type: 'mcq', options: [...], answer: <index> }
//   { type: 'numeric', answer: <number>, tolerance?: <number> }
//   { type: 'short', answer: <string|string[]> }   (case/space-insensitive match)

export const MATHS = {
  slug: 'maths',
  name: 'Mathematics',
  spec: 'AQA 8300',
  tiers: 'Foundation & Higher',
  units: [
    {
      id: 'u-number',
      title: 'Number',
      blurb: 'Place value, the four operations, factors, indices and standard form.',
      lessons: [
        {
          id: 'm-l1',
          title: 'Factors, Multiples & Primes',
          week: 1,
          minutes: 20,
          summary: 'Build fluency with prime factorisation, HCF and LCM — the backbone of fraction and algebra work.',
          topics: [
            {
              heading: 'Prime factor decomposition',
              body: 'Every integer greater than 1 is either prime or can be written as a unique product of primes. Use a factor tree, then write repeated factors using index notation. Example: 360 = 2³ × 3² × 5.',
            },
            {
              heading: 'HCF and LCM from prime factors',
              body: 'List each number as a product of primes. The HCF takes the lowest power of each shared prime; the LCM takes the highest power of every prime that appears. A Venn diagram of prime factors makes both easy to read off.',
            },
          ],
          questions: [
            {
              id: 'm-l1-q1', type: 'mcq', marks: 1,
              prompt: 'Write 84 as a product of its prime factors.',
              options: ['2² × 3 × 7', '2 × 3² × 7', '2² × 21', '4 × 3 × 7'],
              answer: 0,
              solution: '84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7.',
            },
            {
              id: 'm-l1-q2', type: 'numeric', marks: 2,
              prompt: 'Find the HCF of 24 and 60.',
              answer: 12,
              solution: '24 = 2³ × 3 and 60 = 2² × 3 × 5. Lowest shared powers: 2² × 3 = 12.',
            },
            {
              id: 'm-l1-q3', type: 'numeric', marks: 2,
              prompt: 'Find the LCM of 8 and 12.',
              answer: 24,
              solution: '8 = 2³, 12 = 2² × 3. Highest powers: 2³ × 3 = 24.',
            },
            {
              id: 'm-l1-q4', type: 'mcq', marks: 1,
              prompt: 'Which of these numbers is prime?',
              options: ['51', '57', '61', '63'],
              answer: 2,
              solution: '51 = 3×17, 57 = 3×19, 63 = 7×9, but 61 has no factors other than 1 and itself.',
            },
          ],
        },
        {
          id: 'm-l2',
          title: 'Indices & Standard Form',
          week: 2,
          minutes: 25,
          summary: 'Apply the laws of indices and convert confidently between ordinary numbers and standard form.',
          topics: [
            {
              heading: 'Laws of indices',
              body: 'aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ. Also a⁰ = 1 and a⁻ⁿ = 1/aⁿ. Keep the base the same before combining powers.',
            },
            {
              heading: 'Standard form',
              body: 'Numbers are written as A × 10ⁿ where 1 ≤ A < 10. A positive n shifts the decimal point right (large numbers); a negative n shifts it left (small numbers).',
            },
          ],
          questions: [
            {
              id: 'm-l2-q1', type: 'mcq', marks: 1,
              prompt: 'Simplify 5⁴ × 5³.',
              options: ['5⁷', '5¹²', '25⁷', '10⁷'],
              answer: 0,
              solution: 'Add the powers when multiplying with a common base: 5⁴⁺³ = 5⁷.',
            },
            {
              id: 'm-l2-q2', type: 'short', marks: 1,
              prompt: 'Write 0.00042 in standard form.',
              answer: ['4.2 × 10^-4', '4.2x10^-4', '4.2e-4'],
              solution: 'Move the point 4 places right to get 4.2, so the power is −4: 4.2 × 10⁻⁴.',
            },
            {
              id: 'm-l2-q3', type: 'numeric', marks: 1,
              prompt: 'Evaluate 2⁻³ as a decimal.',
              answer: 0.125,
              solution: '2⁻³ = 1/2³ = 1/8 = 0.125.',
            },
            {
              id: 'm-l2-q4', type: 'mcq', marks: 2,
              prompt: 'Work out (3 × 10⁵) × (2 × 10³), giving your answer in standard form.',
              options: ['6 × 10⁸', '6 × 10¹⁵', '5 × 10⁸', '6 × 10⁵'],
              answer: 0,
              solution: 'Multiply the numbers (3×2=6) and add the powers (5+3=8): 6 × 10⁸.',
            },
          ],
        },
      ],
    },
    {
      id: 'u-algebra',
      title: 'Algebra',
      blurb: 'Expressions, equations, sequences and the foundations of graphing.',
      lessons: [
        {
          id: 'm-l3',
          title: 'Expanding & Factorising',
          week: 2,
          minutes: 25,
          summary: 'Multiply out single and double brackets, and reverse the process by factorising.',
          topics: [
            {
              heading: 'Expanding double brackets',
              body: 'Use FOIL (First, Outer, Inner, Last). (x + 3)(x + 5) = x² + 5x + 3x + 15 = x² + 8x + 15. Collect like terms at the end.',
            },
            {
              heading: 'Factorising quadratics',
              body: 'For x² + bx + c, find two numbers that multiply to c and add to b. For x² + 7x + 12 the pair is 3 and 4, so it factorises to (x + 3)(x + 4).',
            },
          ],
          questions: [
            {
              id: 'm-l3-q1', type: 'mcq', marks: 2,
              prompt: 'Expand and simplify (x + 4)(x + 2).',
              options: ['x² + 6x + 8', 'x² + 8x + 6', 'x² + 6x + 6', 'x² + 2x + 8'],
              answer: 0,
              solution: 'x² + 2x + 4x + 8 = x² + 6x + 8.',
            },
            {
              id: 'm-l3-q2', type: 'short', marks: 2,
              prompt: 'Factorise x² + 9x + 20. Write your answer like (x+a)(x+b).',
              answer: ['(x+4)(x+5)', '(x+5)(x+4)'],
              solution: '4 × 5 = 20 and 4 + 5 = 9, so x² + 9x + 20 = (x + 4)(x + 5).',
            },
            {
              id: 'm-l3-q3', type: 'short', marks: 1,
              prompt: 'Factorise fully 6x + 9.',
              answer: ['3(2x+3)'],
              solution: 'The HCF of 6 and 9 is 3: 6x + 9 = 3(2x + 3).',
            },
          ],
        },
        {
          id: 'm-l4',
          title: 'Linear Equations',
          week: 3,
          minutes: 20,
          summary: 'Solve equations with the unknown on one or both sides, including brackets and fractions.',
          topics: [
            {
              heading: 'Balancing method',
              body: 'Whatever you do to one side you must do to the other. Undo operations in reverse order: deal with + and − first, then × and ÷.',
            },
            {
              heading: 'Unknown on both sides',
              body: 'Collect the variable terms on the side with the larger coefficient to keep it positive, then isolate the unknown. Always substitute back to check.',
            },
          ],
          questions: [
            {
              id: 'm-l4-q1', type: 'numeric', marks: 2,
              prompt: 'Solve 3x + 7 = 22. Give the value of x.',
              answer: 5,
              solution: '3x = 22 − 7 = 15, so x = 15 ÷ 3 = 5.',
            },
            {
              id: 'm-l4-q2', type: 'numeric', marks: 3,
              prompt: 'Solve 5x − 4 = 2x + 11. Give the value of x.',
              answer: 5,
              solution: '5x − 2x = 11 + 4 → 3x = 15 → x = 5.',
            },
            {
              id: 'm-l4-q3', type: 'numeric', marks: 3,
              prompt: 'Solve 2(x + 3) = 16. Give the value of x.',
              answer: 5,
              solution: 'Expand: 2x + 6 = 16 → 2x = 10 → x = 5.',
            },
          ],
        },
        {
          id: 'm-l5',
          title: 'Sequences & nth Term',
          week: 4,
          minutes: 25,
          summary: 'Find and use the nth term of linear sequences, and recognise special sequences.',
          topics: [
            {
              heading: 'nth term of a linear sequence',
              body: 'The common difference d gives the coefficient of n. Then adjust the constant: nth term = dn + (first term − d). For 5, 8, 11, 14… d = 3 and the rule is 3n + 2.',
            },
            {
              heading: 'Special sequences',
              body: 'Recognise square numbers (1, 4, 9, 16…), cube numbers (1, 8, 27…), triangular numbers (1, 3, 6, 10…) and the Fibonacci pattern where each term is the sum of the previous two.',
            },
          ],
          questions: [
            {
              id: 'm-l5-q1', type: 'short', marks: 2,
              prompt: 'Find the nth term of 7, 10, 13, 16, … (write like 3n+4).',
              answer: ['3n+4'],
              solution: 'Common difference 3, so 3n + (7 − 3) = 3n + 4.',
            },
            {
              id: 'm-l5-q2', type: 'numeric', marks: 2,
              prompt: 'For the sequence with nth term 4n − 1, what is the 10th term?',
              answer: 39,
              solution: '4 × 10 − 1 = 40 − 1 = 39.',
            },
            {
              id: 'm-l5-q3', type: 'mcq', marks: 1,
              prompt: 'Which sequence is the triangular numbers?',
              options: ['1, 3, 6, 10, 15', '1, 4, 9, 16, 25', '2, 4, 8, 16, 32', '1, 1, 2, 3, 5'],
              answer: 0,
              solution: 'Triangular numbers add 2, 3, 4, 5… each time: 1, 3, 6, 10, 15.',
            },
          ],
        },
      ],
    },
    {
      id: 'u-ratio',
      title: 'Ratio, Proportion & Rates of Change',
      blurb: 'Share quantities, scale recipes, and work with percentages and speed.',
      lessons: [
        {
          id: 'm-l6',
          title: 'Sharing in a Ratio',
          week: 3,
          minutes: 20,
          summary: 'Divide quantities in a given ratio and solve "one part" problems.',
          topics: [
            {
              heading: 'The "one part" method',
              body: 'Add the ratio parts to find the total number of parts, divide the quantity by that total to get the value of one part, then multiply up for each share.',
            },
          ],
          questions: [
            {
              id: 'm-l6-q1', type: 'numeric', marks: 3,
              prompt: '£60 is shared in the ratio 2 : 3. How much is the larger share (in £)?',
              answer: 36,
              solution: '5 parts = £60, so 1 part = £12. The larger share is 3 × £12 = £36.',
            },
            {
              id: 'm-l6-q2', type: 'numeric', marks: 3,
              prompt: 'A recipe for 4 people needs 600 g of flour. How many grams are needed for 6 people?',
              answer: 900,
              solution: '600 ÷ 4 = 150 g per person; 150 × 6 = 900 g.',
            },
          ],
        },
        {
          id: 'm-l7',
          title: 'Percentages & Multipliers',
          week: 5,
          minutes: 25,
          summary: 'Use decimal multipliers for increase, decrease, reverse percentages and compound interest.',
          topics: [
            {
              heading: 'Decimal multipliers',
              body: 'A 15% increase multiplies by 1.15; a 15% decrease multiplies by 0.85. Reverse percentage problems divide by the multiplier to find the original amount.',
            },
            {
              heading: 'Compound interest',
              body: 'After n years at rate r%, the amount is P × (1 + r/100)ⁿ. Compounding applies the multiplier repeatedly rather than once.',
            },
          ],
          questions: [
            {
              id: 'm-l7-q1', type: 'numeric', marks: 2,
              prompt: 'Increase £80 by 25%. Give the answer in £.',
              answer: 100,
              solution: '£80 × 1.25 = £100.',
            },
            {
              id: 'm-l7-q2', type: 'numeric', marks: 3,
              prompt: 'A coat costs £63 after a 10% discount. What was the original price in £?',
              answer: 70,
              solution: '£63 ÷ 0.9 = £70.',
            },
            {
              id: 'm-l7-q3', type: 'numeric', marks: 3, tolerance: 0.5,
              prompt: '£500 is invested at 4% compound interest per year. What is it worth after 2 years (to the nearest £)?',
              answer: 541,
              solution: '500 × 1.04² = 500 × 1.0816 = £540.80 ≈ £541.',
            },
          ],
        },
      ],
    },
    {
      id: 'u-geometry',
      title: 'Geometry & Measures',
      blurb: 'Angles, Pythagoras, trigonometry, area and volume.',
      lessons: [
        {
          id: 'm-l8',
          title: 'Angles & Polygons',
          week: 4,
          minutes: 20,
          summary: 'Apply angle facts in parallel lines and find interior and exterior angles of polygons.',
          topics: [
            {
              heading: 'Angle rules',
              body: 'Angles on a straight line sum to 180°, around a point to 360°. With parallel lines: alternate angles are equal, co-interior angles sum to 180°.',
            },
            {
              heading: 'Polygon angles',
              body: 'Sum of interior angles of an n-sided polygon = (n − 2) × 180°. Each exterior angle of a regular polygon = 360° ÷ n.',
            },
          ],
          questions: [
            {
              id: 'm-l8-q1', type: 'numeric', marks: 2,
              prompt: 'What is the sum of the interior angles of a hexagon (in degrees)?',
              answer: 720,
              solution: '(6 − 2) × 180° = 4 × 180° = 720°.',
            },
            {
              id: 'm-l8-q2', type: 'numeric', marks: 2,
              prompt: 'Each exterior angle of a regular polygon is 40°. How many sides does it have?',
              answer: 9,
              solution: '360° ÷ 40° = 9 sides.',
            },
          ],
        },
        {
          id: 'm-l9',
          title: 'Pythagoras & Trigonometry',
          week: 6,
          minutes: 30,
          summary: 'Find missing sides and angles in right-angled triangles.',
          topics: [
            {
              heading: 'Pythagoras’ theorem',
              body: 'In a right-angled triangle, a² + b² = c² where c is the hypotenuse (the longest side, opposite the right angle).',
            },
            {
              heading: 'SOH CAH TOA',
              body: 'sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj. Choose the ratio that links the side you know with the side or angle you want.',
            },
          ],
          questions: [
            {
              id: 'm-l9-q1', type: 'numeric', marks: 3,
              prompt: 'A right-angled triangle has legs 6 cm and 8 cm. Find the hypotenuse (cm).',
              answer: 10,
              solution: '6² + 8² = 36 + 64 = 100, so the hypotenuse = √100 = 10 cm.',
            },
            {
              id: 'm-l9-q2', type: 'numeric', marks: 3, tolerance: 0.2,
              prompt: 'In a right-angled triangle the side opposite a 30° angle is 5 cm. Find the hypotenuse (cm).',
              answer: 10,
              solution: 'sin 30° = opp/hyp → hyp = 5 ÷ sin 30° = 5 ÷ 0.5 = 10 cm.',
            },
          ],
        },
      ],
    },
    {
      id: 'u-prob',
      title: 'Probability',
      blurb: 'Single and combined events, tree diagrams and expected frequency.',
      lessons: [
        {
          id: 'm-l10',
          title: 'Probability Basics',
          week: 5,
          minutes: 20,
          summary: 'Use the probability scale, the "sum to 1" rule and expected frequency.',
          topics: [
            {
              heading: 'The probability scale',
              body: 'Probabilities run from 0 (impossible) to 1 (certain). For mutually exclusive outcomes that cover everything, the probabilities add to 1, so P(not A) = 1 − P(A).',
            },
            {
              heading: 'Expected frequency',
              body: 'Expected number of occurrences = probability × number of trials.',
            },
          ],
          questions: [
            {
              id: 'm-l10-q1', type: 'numeric', marks: 2,
              prompt: 'The probability it rains is 0.3. What is the probability it does NOT rain?',
              answer: 0.7,
              solution: '1 − 0.3 = 0.7.',
            },
            {
              id: 'm-l10-q2', type: 'numeric', marks: 2,
              prompt: 'A fair dice is rolled 60 times. How many sixes are expected?',
              answer: 10,
              solution: 'P(six) = 1/6, so 1/6 × 60 = 10.',
            },
          ],
        },
        {
          id: 'm-l11',
          title: 'Tree Diagrams',
          week: 7,
          minutes: 30,
          summary: 'Calculate probabilities of combined events using tree diagrams.',
          topics: [
            {
              heading: 'Multiplying along branches',
              body: 'Multiply probabilities along the branches for "and", and add the results of separate paths for "or". The probabilities on each set of branches sum to 1.',
            },
          ],
          questions: [
            {
              id: 'm-l11-q1', type: 'numeric', marks: 2, tolerance: 0.001,
              prompt: 'A coin is flipped twice. What is the probability of two heads? (decimal)',
              answer: 0.25,
              solution: '½ × ½ = ¼ = 0.25.',
            },
            {
              id: 'm-l11-q2', type: 'numeric', marks: 3, tolerance: 0.001,
              prompt: 'A bag has 3 red and 2 blue counters. One is taken and replaced, then another is taken. P(both red)?',
              answer: 0.36,
              solution: '3/5 × 3/5 = 9/25 = 0.36.',
            },
          ],
        },
      ],
    },
    {
      id: 'u-stats',
      title: 'Statistics',
      blurb: 'Averages, spread, and interpreting charts and scatter graphs.',
      lessons: [
        {
          id: 'm-l12',
          title: 'Averages & Range',
          week: 6,
          minutes: 20,
          summary: 'Calculate and compare the mean, median, mode and range.',
          topics: [
            {
              heading: 'The four measures',
              body: 'Mean = total ÷ count. Median = middle value when ordered. Mode = most frequent. Range = largest − smallest (a measure of spread, not an average).',
            },
          ],
          questions: [
            {
              id: 'm-l12-q1', type: 'numeric', marks: 2,
              prompt: 'Find the mean of 4, 8, 9, 9, 10.',
              answer: 8,
              solution: '(4 + 8 + 9 + 9 + 10) ÷ 5 = 40 ÷ 5 = 8.',
            },
            {
              id: 'm-l12-q2', type: 'numeric', marks: 1,
              prompt: 'Find the median of 3, 7, 2, 9, 5.',
              answer: 5,
              solution: 'Ordered: 2, 3, 5, 7, 9. The middle value is 5.',
            },
            {
              id: 'm-l12-q3', type: 'numeric', marks: 1,
              prompt: 'Find the range of 12, 5, 18, 7, 20.',
              answer: 15,
              solution: '20 − 5 = 15.',
            },
          ],
        },
        {
          id: 'm-l13',
          title: 'Scatter Graphs & Correlation',
          week: 8,
          minutes: 25,
          summary: 'Describe correlation and use a line of best fit to estimate values.',
          topics: [
            {
              heading: 'Correlation',
              body: 'Positive correlation: both quantities increase together. Negative: one rises as the other falls. A line of best fit follows the trend with roughly equal points either side; reading off it estimates unknown values.',
            },
          ],
          questions: [
            {
              id: 'm-l13-q1', type: 'mcq', marks: 1,
              prompt: 'As temperature rises, ice-cream sales rise. This is an example of…',
              options: ['Positive correlation', 'Negative correlation', 'No correlation', 'Inverse proportion'],
              answer: 0,
              solution: 'Both variables increase together, so the correlation is positive.',
            },
            {
              id: 'm-l13-q2', type: 'mcq', marks: 1,
              prompt: 'Which point is most likely an outlier if all others lie on a clear upward line?',
              options: ['A point far below the trend', 'A point on the line', 'The first point', 'The mean point'],
              answer: 0,
              solution: 'An outlier sits well away from the overall trend of the data.',
            },
          ],
        },
      ],
    },
  ],
}

// Shared helpers (allLessons, lessonById, isFreeLesson, totals, …) now live in
// ./curriculum.js so they can span every live subject, not just Maths.
