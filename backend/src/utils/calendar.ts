// Defines month lengths (in “planet days”) for each supported planet.
// Index 0 = January, 1 = February, … 11 = December.

export const PLANET_CALENDAR: Record<string, number[]> = {
  earth:   [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  mars:    [57, 52, 57, 54, 57, 54, 57, 57, 54, 57, 54, 57],
  jupiter: [891, 806, 891, 864, 891, 864, 891, 891, 864, 891, 864, 891],
  saturn:  [2047, 1848, 2047, 1982, 2047, 1982, 2047, 2047, 1982, 2047, 1982, 2047],
  pluto:   [1204, 1089, 1204, 1165, 1204, 1165, 1204, 1204, 1165, 1204, 1165, 1204]
}