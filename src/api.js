// /src/api.js

export async function fetchPlanetAge(planetId, birth) {
  const birthDate = new Date(birth);
  const now = new Date();
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const diffMs = now - birthDate;
  // Earth age in years (as a floating-point number)
  const earthAge = diffMs / msPerYear;

  if (planetId === 'moon') {
    // For the Moon: calculate age in lunar cycles (using ~29.53 days per cycle).
    const msPerDay = 24 * 60 * 60 * 1000;
    const ageInDays = diffMs / msPerDay;
    const lunarCycle = 29.53; // days per lunar cycle
    const lunarCycles = ageInDays / lunarCycle;
    // Next lunar birthday: next full cycle (using floor + 1)
    const nextCycle = Math.floor(lunarCycles) + 1;
    const nextBirthdayDate = new Date(birthDate.getTime() + nextCycle * lunarCycle * msPerDay);
    const daysToNext = Math.ceil((nextBirthdayDate - now) / msPerDay);
    
    return {
      age: lunarCycles.toFixed(2),
      nextBirthdayEarth: nextBirthdayDate,
      daysToNextBirthday: daysToNext
    };
  } else {
    // For non-moon bodies, set conversion factors based on the planet/dwarf planet.
    // Conversion factor: number of Earth years per planet year.
    let conversionFactor;
    switch (planetId) {
      case 'mars':
        conversionFactor = 1.8808;
        break;
      case 'jupiter':
        conversionFactor = 11.862;
        break;
      case 'ceres':
        conversionFactor = 4.6; // Approximate orbital period of Ceres in Earth years.
        break;
      default:
        conversionFactor = 1; // Earth
    }
    
    // Calculate the planet's age in its own years.
    const planetAge = earthAge / conversionFactor;
    // Determine the next birthday milestone for that planet.
    const nextPlanetCycle = Math.ceil(planetAge);
    // Calculate the corresponding Earth date for that next planetary birthday.
    const nextBirthdayDate = new Date(birthDate.getTime() + nextPlanetCycle * conversionFactor * msPerYear);
    const daysToNext = Math.ceil((nextBirthdayDate - now) / (24 * 60 * 60 * 1000));
    
    return {
      age: planetAge.toFixed(2),
      nextBirthdayEarth: nextBirthdayDate,
      daysToNextBirthday: daysToNext
    };
  }
}