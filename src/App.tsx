import TodoList from "./components/TodoList";

function App() {

  // typing our variable as a string and assigning it a string value
  let myName: string = "name string";
  // if you don't need to assign your variables right away, you can still type them like so
  let count: number;
  let isLongestString: boolean;

  count = 7;
  isLongestString = true;
  //myName = count; - doesn't work, count is not a string
  myName = "7"

  // typescript is infering the type of myNumber without the type declaration.  it knows that myNumber is a number variable
  let myNumber = 10; 
  //myNumber = "string"; doesn't work, myNumber is a number
  myNumber = 11;

  // if the variable is created without assignment and no type declaration, then it will be considered the "any" type by default meaning that it functions like a regular JS variable
  // try to avoid this!  if you can give it a type, you should!  or else you're not getting any of the error checking/performance benefits of typescript!
  let anyType;
  anyType = "typescript!";
  anyType = 100;
  anyType = false;

  // Arrays
  let fruitsArray: string[] = ["apple", "blueberry", "strawberry"]
  let multiTypeArray: [number, string, ...string[]] = [10, "string", "string", "keep", "adding", "strings"]

  // Objects
  let fruit: { name: string, rating: number }

  fruit = {
    name: "peach",
    rating: 8,
  }

  let fruitObjectArray: { name: string, rating: number }[];
  fruitObjectArray = [fruit, fruit, fruit]

  // Type Alias
  // let's us create a custom type that will help streamline the process for creating objects in typescript
  // type aliases are reusable so we can create multiple instances of that type with ease
  type Fruit = {
    name: string;
    rating: number | string; // Union Type
  }

  let fruit2: Fruit = {
    name: "mango",
    rating: 8,
    // size: "small"
  }

  // Union Type in action, rating can also be a string
  let fruit3: Fruit = {
    name: "pineapple",
    rating: "9"
  }

  // utilizing Type Aliases for creating our arrays
  // we can add anything to this array that has the form of our Fruit type which in this case means our objects should all have a name: string and a rating: number
  let fruitTypeAliasArray: Fruit[];
  fruitTypeAliasArray = [fruit2, fruit3, fruit]

  // Functions
  // here we type our parameters as numbers
  const add = (a: number, b: number): number => {
    return a + b;
  }

  add(7,10)

  const sayHello = (name: string): void => {
    console.log("Hello " + name);
  }

  // ? makes it so the parameter is considered optional.  we can include it or not
  // | union - makes it so our parameter can be multiple types
  const fruitInventoryCalc = (fruit: Fruit | null, quantity?: number): void => {
    // if we got a Fruit type as a parameter 
    if (fruit) {
      // fruit is not null/undefined
      console.log(`Looks like you have a ${fruit.name}`)

      if(quantity) {
        console.log(`You have ${quantity} of your fruit!`)
      } else {
        console.log("You have only 1 of your fruit")
      }

    } else {
      // fruit is null/undefined
      console.log("No fruit :/")
    }
  }

  fruitInventoryCalc(fruit2, 5)
  fruitInventoryCalc(fruit3)
  fruitInventoryCalc(null)
  fruitInventoryCalc(null, 10)

  /* 
  BAD! Typescript doesn't warn us that any will result in undefined 
  const getFruitArraySize = (fruitList: any) => {
    console.log(`You have ${fruitList.length} fruit in your array`)
  }
  */

  // Unknown Type
  // Unknown type is like the any type, but in  enforces type guarding
  const getFruitArraySize = (fruitList: unknown) => {
    // we need to check if fruitList is an array or else TS will give us an error
    if (Array.isArray(fruitList)){
      console.log(`You have ${fruitList.length} fruit in your array`)
    } else {
      console.log("you did NOT pass in an array")
    }
  }
  getFruitArraySize(10)
  getFruitArraySize(fruitTypeAliasArray)


  return (
    <>
      <TodoList />
    </>
  )
}

export default App
