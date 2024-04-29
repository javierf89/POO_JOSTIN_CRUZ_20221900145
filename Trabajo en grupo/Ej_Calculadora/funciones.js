function addToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    var expression = document.getElementById('display').value;
    var result = eval(expression);
    document.getElementById('display').value = result;
    
    // Guardar el historial en localStorage
    var history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    history.push({ expression: expression, result: result });
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    
    // Mostrar historial en el HTML
    var historyList = document.getElementById('historial-list');
    historyList.innerHTML = '';
    history.forEach(function(item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.expression + ' = ' + item.result;
        historyList.appendChild(listItem);
    });
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

// Mostrar historial almacenado en localStorage al cargar la página
window.onload = function() {
    var history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    var historyList = document.getElementById('historial-list');
    history.forEach(function(item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.expression + ' = ' + item.result;
        historyList.appendChild(listItem);
    });
};