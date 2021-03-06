import Expression from './Expression.js';
import State from './State.js';

// A QualitySet is a Set of Expressions
export default class QualitySet {
  constructor (state = new State()) {
    // Check that state is a State
    if (!(state instanceof State)) {
      throw new Error('state must be an instance of State!');
    }

    this.state = state;

    // Each expression has to be unique, so a Set is used to enforce this
    this.set = new Set();
  }

  // Add a new expression to the set
  add (expression = '') {
    // Based on a string, create a new Expression
    // Pass it the current state and string
    const e = new Expression(this.state, expression);
    // Add the new Expression to the internal set
    this.set.add(e);
  }

  find (s = '') {
    // Create default return value
    let result = null;

    // Look through all of the entries
    this.set.forEach((value) => {
      // If an existing expression has the same string format as requested,
      //  it exists in the Set.
      if (value.expression === s) {
        result = value;
      }
    });

    // Return either the entry found or null
    return result;
  }

  // Remove an expression from the Set
  remove (s = '') {
    // Look for the expression in the Set
    const result = this.find(s);

    // Does this expression exist in the Set?
    if (result !== null) {
      // It does, so delete it
      this.set.delete(result);
    }

    // Return the removed expression or null
    return result;
  }

  check () {
    // Create default return value
    let result = true;

    // Create iterator based on Set
    const setIterator = this.set.values();

    // Iterate on set
    for (const expression of setIterator) {
      // Check each expression
      if (!expression.check()) {
        // If any expression is false, flip result
        result = false;
      }
    }

    // Return the result of checking the set
    return result;
  }

  // Show all of the qualities and current values
  print () {
    // Create default value
    let result = 'Qualities:\n';

    // Create iterator based on Set
    const setIterator = this.set.values();

    // Iterate on set
    for (const expression of setIterator) {
      // Combine template literals of expression and check()
      result += `Expression: ${expression.expression}; Value: ${expression.check()}\n`;
    }

    // Result text of Set
    return result;
  }
}
