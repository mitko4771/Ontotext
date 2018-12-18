window.onload = () => {
  function memoize(functionOne, depsFunction) {
    let cache = {};
    return function() {
      let key = JSON.stringify([depsFunction(), arguments]);
      if (cache[key]) {
        return cache[key];
      } else {
        let value = functionOne.apply(this, arguments);
        cache[key] = value;
        return value;
      }
    };
  }

  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.fullName = memoize(
      function(title) {
        return title + " " + this.firstName + " " + this.lastName;
      },
      function() {
        return [this.firstName, this.lastName];
      }.bind(this)
    );
  }

  let person = new Person("Mitko", "Dimitrov");

  console.log(person.fullName("Mr."));

  person.firstName = "Dimitar";

  console.log(person.fullName("Mister"));
};
