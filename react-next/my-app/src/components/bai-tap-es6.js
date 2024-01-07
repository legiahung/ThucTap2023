console.log("Câu 1: Let and const ");
let myVariable = 5;
const myConstant = 10;
myVariable = 8;

console.log(myVariable);
console.log("Câu 2: Arrow Functions");
const sum = (a, b) => a + b;
const check = num => num % 2 === 0;

console.log("Tổng: ", sum(5, 5));

console.log("Số chẵn? ", check(2));

console.log("Câu 3: ...Operator");
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2];

console.log(combinedArray);
console.log("Truyền một số lượng biến động tham số vào một hàm và in chúng ra màn hình.");
const printParameters = (...args) => {
    args.forEach(arg => {
      console.log(arg);
    });
  };
  
  printParameters('Hello', 123, true, [1, 2, 3]);

console.log("Câu 4: For/of");
const myArray = ['apple', 'banana', 'orange', 'pear'];
for (const element of myArray) {
  console.log(element);
}

const myString = 'Pearh!';
for (const character of myString) {
  console.log(character);
}

console.log("Câu 5: Map Objects và Set Objects");
const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
myMap.set('key3', 'value3');
console.log(myMap);

// Tạo một Set mới
const mySet = new Set();
mySet.add('apple');
mySet.add('banana');
mySet.add('orange');
console.log(mySet);

console.log("Câu 6: Map Objects và Set Objects");
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    printInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}   
const person1 = new Person('Hưng', 21);
person1.printInfo();

class Student extends Person {
    constructor(name, age,grade){
        super(name,age);
        this.grade = grade;
    }
    printInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}
const student1 = new Student('Hưng', 21, '62.CNTT-2');
student1.printInfo();

console.log("Câu 8: Symbol");
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
  };
  
let id = Symbol('id');
person[id] = 140353;
console.log(person);

console.log("Câu 9: Default Parameters và Function Rest Parameter");
//Default Parameters 
function greet(name = 'Người dùng') {
    console.log(`Chào mừng ${name}!`);
  }
  greet();
  greet('John');
// Function Rest Parameter
function sum1(...numbers) {
    let total = 0;
    for (let number of numbers) {
      total += number;
    }
    return total;
  }
console.log(sum1(1, 2)); 
console.log(sum1(1, 2, 3, 4));
console.log(sum1(5, 10, 15, 20, 25));

console.log("Câu 10: String Methods");
let String = 'Xin chào, đây là một chuỗi mẫu';

console.log(String.includes('ủa'));
console.log(String.startsWith('Xin'));
console.log(String.endsWith('mẫu'));

console.log("Câu 11: Array Methods");
let chuoi = 'xin chào';
// Chuyển đổi chuỗi thành một mảng các ký tự
let mang = Array.from(chuoi);
console.log(mang);
//Sử dụng Array.keys() để lấy danh sách các index của một mảng.
let Array11 = ['a', 'b', 'c', 'd'];
let keys = Array11.keys();
let indexes = Array.from(keys);
console.log(indexes);

console.log("Câu 12: Math, Number, và Global Methods");
//Math
//Math.trunc()
let numberMath = 12.34;
let truncatedNumber = Math.trunc(numberMath);
console.log(truncatedNumber);
//Math.sign()
console.log(Math.sign(10));
console.log(Math.sign(-5));
console.log(Math.sign(0));
console.log(Math.sign('hello'));
//Math.cbrt()
let cubeRoot = Math.cbrt(27);
console.log(cubeRoot);
//Math.log2()
let logBase2 = Math.log2(8);
console.log(logBase2);
//Math.log10()
let logBase10 = Math.log10(100);
console.log(logBase10)

//Number
//Number.EPSILON
console.log(Number.EPSILON);
//Number.MIN_SAFE_INTEGER
console.log(Number.MIN_SAFE_INTEGER);
//Number.MAX_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER);
//Number.isInteger()
console.log(Number.isInteger(5));
console.log(Number.isInteger(5.5));
//Number.isSafeInteger() 
console.log(Number.isSafeInteger(500));
console.log(Number.isSafeInteger(9007199254740992));

//New Global Methods
//isFinite()
console.log(isFinite(5)); 
console.log(isFinite(Infinity));
console.log(isFinite(-Infinity));
console.log(isFinite(NaN));
//isNaN()
console.log(isNaN(5));
console.log(isNaN('hello'));
console.log(isNaN(NaN));

console.log("Câu 13: Object.entries");
let myObject = {
    name: 'John',
    age: 30,
    city: 'New York'
  };
let entries = Object.entries(myObject);
console.log(entries);

console.log("Câu 7: Promises");
function getImageURL(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Không thể đọc được địa chỉ hình ảnh');
          }
          return response.url;
        })
        .then(imageURL => {
          resolve(imageURL);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // Sử dụng Promise để đọc địa chỉ hình ảnh từ URL
const imageURL = 'https://nekos.best/api/v2/neko/db4b62c4-b9cc-4c18-938d-ed9cf531d84b.png';

getImageURL(imageURL)
.then(url => {
    console.log('Địa chỉ hình ảnh:', url);
})
.catch(error => {
    console.error('Đã xảy ra lỗi:', error);
});


function stepOne() {
    return new Promise((resolve, reject) => {
        // Đây là công việc của bước 1
        setTimeout(() => {
        console.log('Bước 1 đã hoàn thành');
        resolve('Kết quả của bước 1');
        }, 1000);
    });
    }
    
    function stepTwo(previousResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        // Simulate an error
        const errorOccurred = true;
        if (errorOccurred) {
            reject('Lỗi xảy ra trong bước 2');
        } else {
            console.log('Bước 2 đã hoàn thành với kết quả từ bước 1:', previousResult);
            resolve('Kết quả của bước 2');
        }
        }, 1000);
    });
    }
    
    // Sử dụng promise chaining để thực hiện nhiều công việc tuần tự
    stepOne()
    .then(resultStepOne => {
        return stepTwo(resultStepOne);
    })
    .then(resultStepTwo => {
        console.log('Tất cả các bước đã hoàn thành');
        console.log('Kết quả cuối cùng:', resultStepTwo);
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
    });
    
