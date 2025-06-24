/**
 * Represents one scheduled greeting job.
 */
export interface Schedule {
  name:      string;   // person’s name
  email:     string;   // recipient’s email
  birthdate: string;   // Earth‐date string (YYYY-MM-DD)
  planetId:  string;   // one of 'earth','mars','jupiter','saturn','pluto'
  code?:     string;   // optional custom or auto-gen code
  imageUrl?: string;   // optional URL for greeting image
}