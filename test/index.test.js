import { 
  objectWithKeys, 
  objectWithoutKeys, 
  objectWithoutNullOrEmpty,
  combineArrays
} from '../src/index';

let animal = {
  name: 'Monkey',
  gender: 'Male',
  location: 'Africa',
  canWalk: true,
  canFly: false
};

Object.freeze(animal);

test('object returns with only keys specified', () => {
  expect(objectWithKeys(animal, ['name', 'gender', 'location'])).toEqual({
    name: 'Monkey',
    gender: 'Male',
    location: 'Africa'
  })  
});

test('object returns without keys specified', () => {
  expect(objectWithoutKeys(animal, ['canFly', 'canWalk'])).toEqual({
    name: 'Monkey',
    gender: 'Male',
    location: 'Africa'
  })
});

test('object returns without null or empties', () => {
  let animalWithZoo = {
    ...animal,
    languageSpoken: undefined,
    zoo: {
      name: 'The Philadelphia Zoo',
      nickname: null,
      price: ''
    }
  };
  expect(objectWithoutNullOrEmpty(animalWithZoo)).toEqual({
    ...animal,
    zoo: {
      name: 'The Philadelphia Zoo'
    }
  })
});

test('Two arrays combined into one', () => {
  let arrayOne = ['red', 'white', 'blue'];
  let arrayTwo = ['blue', 'green', 'black'];
  expect(combineArrays(arrayOne, arrayTwo)).toEqual([
    'red', 'white', 'blue', 'blue', 'green', 'black'
  ])  
})

test('Two arrays combined without duplicates', () => {
  let arrayOne = ['red', 'white', 'blue'];
  let arrayTwo = ['blue', 'green', 'black'];
  expect(combineArrays(arrayOne, arrayTwo, true)).toEqual([
    'red', 'white', 'blue', 'green', 'black'
  ])
})