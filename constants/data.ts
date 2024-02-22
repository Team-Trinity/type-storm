
export type HighScores = {
  id: number;
  fullName: string;
  typingSpeed: number;
  characters: number;
  position: number;
};
export const highScores: HighScores[] = [
  {
    id: 1,
    fullName: "Abs Shakil",
    typingSpeed: 10,
    characters: 121,
    position: 1
  },
  {
    id: 2,
    fullName: "John Doe",
    typingSpeed: 10,
    characters: 110,
    position: 2
  },
  {
    id: 3,
    fullName: "John Jhon",
    typingSpeed: 10,
    characters: 100,
    position: 3
  },
  {
    id: 4,
    fullName: "David Jhon",
    typingSpeed: 10,
    characters: 90,
    position: 4
  },
  {
    id: 5,
    fullName: "Jhon Wilson",
    typingSpeed: 10,
    characters: 80,
    position: 5
  }
];
// profile details
export type Profile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  top_speed: number;
  average_speed: number;
  words_typed: number;
  lessions: number;
  accuracy: number;
  profile_picture?: string | null; 
};

