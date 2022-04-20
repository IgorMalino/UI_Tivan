const quotes = [
  ["01", "There is a time for many words, and there is also a time for sleep."],
  ["153", "I can resist anything but temptation."],
  ["181", "No act of kindness, no matter how small, is ever wasted"],
  ["182", "An honest answer is the sign of true friendship."],
  [
    "231",
    "Two things are infinite: the universe and human stupidity; and I’m not sure about the universe.",
  ],
  ["240", "If you want to be somebody, somebody really special, be yourself!"],
  [
    "289",
    "Advice is like snow; the softer it falls the longer it dwells upon, and the deeper it sinks into the mind.",
  ],
  ["07", "One who looks for a friend without faults will have none."],
  ["25", "All would live long, but none would be old."],
  [
    "221",
    "Formal education will make you a living. Self-education will make you a fortune.",
  ],
  ["222", "Childhood sometimes does pay a second visit to man; youth never."],
  ["284", "Keep cool; anger is not an argument."],
  ["19", "Facts are stubborn things, but statistics are more pliable."],
  ["14", "Poverty wants some things, luxury many, avarice all things."],
];

export const getQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);

  return quotes[index];
};
