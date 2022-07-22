const baseDigits = '0123456789';

const getRandomDigit = (): string => baseDigits.charAt(Math.floor(Math.random() * baseDigits.length));

const generateRandomDigits = (numberOfDigits: number): string => {
  const digits: string[] = [];
  for (let i = 0; i < numberOfDigits; i += 1) {
    const digit = getRandomDigit();
    digits.push(digit);
  }
  return digits.join('');
};

export default generateRandomDigits;
