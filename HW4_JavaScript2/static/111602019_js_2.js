document.write('<font face="Arial" size="10"><b>計算機</b></font>');
document.write('<h1></h1>');

document.write('<input type="text" id="display">');

document.write('<table>');
for (let i = 0; i <= 9; i++) {
    document.write('<td><button onclick="displayNumber(\'' + i + '\')">' + i + '</button></td>');
    if (i % 3 == 2) {
        document.write('<tr></tr>');
    }
}
document.write('<td colspan="2"><button onclick="clearNumber()">Clear</button></td>');
document.write('</table>');

document.write('<table>');
document.write('<td><button onclick="displayNumber(\'+\')">+</button></td>');
document.write('<td><button onclick="displayNumber(\'-\')">-</button></td>');
document.write('<td><button onclick="displayNumber(\'*\')">x</button></td>');
document.write('<td><button onclick="displayNumber(\'/\')">/</button></td>');
document.write('<td><button onclick="displayNumber(\'(\')">(</button></td>');
document.write('<td><button onclick="displayNumber(\')\')">)</button></td>');
document.write('<td><button onclick="calculateResult()">=</button></td>');
document.write('</table>');

function displayNumber(value) {
    document.getElementById('display').value += value;
}

function clearNumber() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    let expression = document.getElementById('display').value;
    let result = eval(expression);
    document.getElementById('display').value = result;
    alert(expression + ' = ' + result); 
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

window.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        displayNumber(key);
    } else if (key == '+' || key == '-' || key == '*' || key == '/' || key == '(' || key == ')') {
        displayNumber(key);
    } else if (key == 'Enter' || key == '=') {
        calculateResult();
    } else if (key == 'Backspace') {
        backspace();
    } else {
        return; 
    }
});