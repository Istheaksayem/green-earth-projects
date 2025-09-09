1) What is the difference between var, let, and const?
   
var → function scope, re-declare করা যায়, hoisting হয়।
let → block scope, re-declare হয় না, hoisting হয় না।
const → block scope, মান বদলানো যায় না (immutable)।

2) What is the difference between map(), forEach(), and filter()?

 map() → নতুন array রিটার্ন করে।
forEach() → কিছু রিটার্ন করে না, শুধু কাজ চালায়।
filter() → শর্ত মেনে নতুন array রিটার্ন করে।

3) What are arrow functions in ES6?

 ছোট syntax দিয়ে ফাংশন লেখা যায়।
this parent scope থেকে নেয়।
example:
const add = (a, b) => a + b;

4) How does destructuring assignment work in ES6?

   Array/Object থেকে আলাদা করে ভ্যারিয়েবল এ মান নেওয়া।
example:
   const [a, b] = [10, 20];  
const {name, age} = {name: "Rahim", age: 25};

5) Explain template literals in ES6. How are they different from string concatenation?
Backtick (``) দিয়ে লেখা হয়।

${} দিয়ে variable/expr বসানো যায়।

Multi-line সাপোর্ট করে।

const name = "Rahim";
const msg = `hello,${name}`

