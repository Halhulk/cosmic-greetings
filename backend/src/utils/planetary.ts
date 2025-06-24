export interface Planet {
  name: string;
  yearLengthDays: number;   // Orbital period in Earth days
  dayLengthHours: number;   // Rotation period in hours
}

export const PLANETS: Record<string, Planet> = {
  earth:   { name: 'Earth',   yearLengthDays: 365.25,  dayLengthHours: 24 },
  mars:    { name: 'Mars',    yearLengthDays: 687.0,   dayLengthHours: 24.6 },
  jupiter: { name: 'Jupiter', yearLengthDays: 4331.0,  dayLengthHours: 9.9 },
  saturn:  { name: 'Saturn',  yearLengthDays: 10759.0, dayLengthHours: 10.7 },
  pluto:   { name: 'Pluto',   yearLengthDays: 90560.0, dayLengthHours: 153.3 },
}