const person = {
    name: 'Alice',
    age: 25,
  };
  
  const { name, age, address = 'N/A' } = person;
  console.log(name, age, address);
  
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  
  const combinedArray = [...arr1, ...arr2];
  console.log(combinedArray);
  
  function calculate(a, b) {
    const add = a + b;
    const subtract = a - b;
    const multiply = a * b;
    const divide = a / b;
  
    return [add, subtract, multiply, divide];
  }
  
  const results = calculate(4, 7);
  const [add, subtract, multiply, divide] = results;
  
  console.log(add);
  console.log(subtract);
  console.log(multiply);
  console.log(divide);
