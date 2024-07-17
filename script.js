function convertToRoman(num) {
    const numerals = {
      1: 'I',
      4: 'IV',
      5: 'V',
      9: 'IX',
      10: 'X',
      40: 'XL',
      50: 'L',
      90: 'XC',
      100: 'C',
      400: 'CD',
      500: 'D',
      900: 'CM',
      1000: 'M',
    };
  
    let roman = "";
    const decimalkeys = Object.keys(numerals).reverse();
    
    decimalkeys.forEach(key => {
      while (key <= num) {
        roman += numerals[key];
        num -= key;
      }
    });
    return roman;
  };
  
  document.getElementById('convert-btn').addEventListener('click', () => {
      const valor = document.getElementById('number').value;
      const saida = document.getElementById('output');
      const numero = parseInt(valor);
  
      if (valor === "") {
          saida.textContent = "Por favor insira um número válido";
      } else if (numero < 1) {
          saida.textContent = "Por favor insira um número maior ou igual a 1";
      } else if (numero >= 4000) {
          saida.textContent = "Insira um número menor ou igual a 3999";
      } else {
          saida.textContent = convertToRoman(numero);
      }
  });
  
  
  
  
  