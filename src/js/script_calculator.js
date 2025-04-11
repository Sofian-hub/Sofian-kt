function calculate(operator) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    let resultat = 0;
  
    if (isNaN(num1) || isNaN(num2)) {
      document.getElementById("calculator-result").textContent = "Veuillez entrer deux nombres valides.";
      return;
    }
  
    switch (operator) {
      case "+":
        resultat = num1 + num2;
        break;
      case "-":
        resultat = num1 - num2;
        break;
      case "*":
        resultat = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          document.getElementById("calculator-result").textContent = "Division par zéro impossible.";
          return;
        }
        resultat = num1 / num2;
        break;
      default:
        document.getElementById("calculator-result").textContent = "Opérateur non valide.";
        return;
    }
  
    document.getElementById("calculator-result").textContent = "Résultat: " + resultat;
  }
  