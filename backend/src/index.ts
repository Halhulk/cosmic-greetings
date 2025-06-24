// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dayjs from 'dayjs';

const app = express();
app.use(cors());
app.use(express.json());

// A simple function to convert an Earth day difference (since birth)
// into a planetary "date" string based on the orbital period.
// We assume a planetary year is divided into 12 months of equal length (~30 days per month).
function convertToPlanetDate(diffDays: number, period: number): string {
  const planetYear = Math.floor(diffDays / period);
  const remainder = diffDays % period;
  const monthFraction = remainder / period;
  // Use 12 months per year.
  const month = Math.floor(monthFraction * 12) + 1;
  // Count days (approximately 30 per month)
  const day = Math.floor(((monthFraction * 12) - (month - 1)) * 30) + 1;
  return `Year ${planetYear}, Month ${month}, Day ${day}`;
}

app.get('/api/planet', (req: Request, res: Response) => {
  // Use query parameter "planet" (default: earth) and "birth" (in YYYY-MM-DD)
  const planet = ((req.query.planet as string) || 'earth').toLowerCase();
  const birth = req.query.birth as string;
  if (!birth) {
    return res.status(400).send("Birth date is required");
  }
  
  const birthDate = dayjs(birth, 'YYYY-MM-DD');
  if (!birthDate.isValid()) {
    return res.status(400).send("Invalid birth date");
  }
  
  const today = dayjs();

  // Define orbital periods (in Earth days) for each planet.
  const orbitalPeriods: { [key: string]: number } = {
    earth: 365.25,   // Earth’s orbital period
    mars: 687,       // Mars’ orbital period
    jupiter: 4332.59, // Jupiter’s orbital period
    saturn: 10759,   // Saturn’s orbital period
    pluto: 90560     // Pluto’s effective orbital period
  };
  const period = orbitalPeriods[planet] || orbitalPeriods.earth;
  
  // Calculate total elapsed Earth days since birth (can be fractional)
  const elapsedDays = today.diff(birthDate, 'day', true);
  
  // Planetary age: number of full planetary orbits since birth.
  const age = Math.floor(elapsedDays / period);
  
  // For next birthday on Earth: add (age+1) full orbital periods to the birth date.
  const nextBirthdayEarth = birthDate.add((age + 1) * period, 'day');
  
  // Remaining Earth days until the next birthday.
  const daysToNextBirthday = nextBirthdayEarth.diff(today, 'day');
  
  // Convert the base birth (difference = 0) into the planetary calendar.
  // For any planet, this will be "Year 0, Month 1, Day 1".
  const birthPlanet = convertToPlanetDate(0, period);
  
  // Next birthday (planet): Convert the full orbital period corresponding to (age+1) into the planetary calendar.
  const nextBirthdayPlanet = convertToPlanetDate((age + 1) * period, period);
  
  const result = {
    // The birth date in the planetary calendar (always the same for the user)
    planetBirthday: birthPlanet,
    // The next birthday in the planetary calendar (calculated relative to the user's birth)
    nextBirthdayPlanet: nextBirthdayPlanet,
    // The next birthday expressed as an Earth date (formatted as YYYY-MM-DD)
    nextBirthdayEarth: nextBirthdayEarth.format('YYYY-MM-DD'),
    // Planetary age (number of completed orbits)
    age: age,
    // Remaining Earth days until next birthday
    daysToNextBirthday: daysToNextBirthday
  };

  res.json(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});