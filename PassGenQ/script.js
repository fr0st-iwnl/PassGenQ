document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('commandInput');
    const output = document.querySelector('.output');
    const initialOutput = output.innerHTML; 

    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command === 'generate') {
                const password = generatePassword();
                output.innerHTML += '> ' + password + '<br>';
                commandInput.value = '';
            } else if (command.startsWith('generate pass ')) {
                const args = command.split(' ');
                let length = parseInt(args[2]);
                const options = args.slice(3);
                if (length > 50) {
                    output.innerHTML += '> Max length is 50!<br>';
                    commandInput.value = '';
                    return;
                }

                if (!isNaN(length) && length > 0) {
                    const password = generateComplexPassword(length, options);
                    if (password) {
                        output.innerHTML += '> <div class="password-container"><span class="password">' + password + '</span></div><br>';
                    } else {
                        output.innerHTML += '> Invalid command syntax<br>';
                    }
                } else {
                    output.innerHTML += '> Invalid password length<br>';
                }
                commandInput.value = '';
            } else if (command === 'clear') {
                clearOutput();
                commandInput.value = '';
            } else if (command === 'passgenq') { // Secret command
                secretAnimation();
                commandInput.value = '';
            } else {
                output.innerHTML += '> command not found<br>';
                commandInput.value = '';
            }
            output.scrollTop = output.scrollHeight;
        }
    });

    function generatePassword(length = 8) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return generateRandomString(charset, length);
    }

    function generateComplexPassword(length, options) {
        const charsets = {
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]\\:;?><,./-='
        };

        let charset = '';
        for (let option of options) {
            if (charsets[option]) {
                charset += charsets[option];
            }
        }

        if (length > 0 && charset !== '') {
            return generateRandomString(charset, length);
        } else {
            return null;
        }
    }

    function generateRandomString(charset, length) {
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    function clearOutput() {
        output.innerHTML = initialOutput;
    }

    function secretAnimation() {
        const secretText = document.createElement('p');
        secretText.textContent = '> u found a secret command :P';
        secretText.classList.add('secret-animation');
        output.appendChild(secretText);

        setTimeout(() => {
            output.removeChild(secretText);
        }, 5000);
    }
});

const commandInput = document.getElementById('commandInput');
const cursorLine = document.getElementById('cursorLine');

commandInput.addEventListener('input', function() {
    const inputValue = commandInput.value.trim();
    if (inputValue.length > 0) {
        cursorLine.style.opacity = '1';
    } else {
        cursorLine.style.opacity = '0';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dotAnimation = document.getElementById('dotAnimation');
    animateDots(dotAnimation);
});

function animateDots(element) {
    let count = 0;
    const interval = setInterval(() => {
        if (count < 3) {
            element.textContent += '.';
            count++;
        } else {
            element.textContent = ''; 
            clearInterval(interval);
            setTimeout(() => {
                animateDots(element); 
            }, 700); 
        }
    }, 700); 
}
