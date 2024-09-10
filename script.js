function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.add('input-error');
}

function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.remove('input-error');
}

function displayErrors(errorMessages) {
    const errorDiv = document.getElementById('errorMessages');
    
    if (errorMessages.length > 0) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = errorMessages.join('<br>');
    } else {
        errorDiv.style.display = 'none';
        errorDiv.innerHTML = '';
    }
}

function validateInputs() {
    let isValid = true;
    let errorMessages = [];
    
    const mantWidth = parseFloat(document.getElementById('mantWidth').value);
    const mantHeight = parseFloat(document.getElementById('mantHeight').value);
    const cutWidth = parseFloat(document.getElementById('cutWidth').value);
    const cutHeight = parseFloat(document.getElementById('cutHeight').value);
    
    // Validações individuais
    if (isNaN(mantWidth) || mantWidth <= 0) {
        showError('mantWidth', 'Insira um valor numérico válido para a largura da manta.');
        errorMessages.push('Insira um valor numérico válido para a largura da manta.');
        isValid = false;
    } else {
        clearError('mantWidth');
    }

    if (isNaN(mantHeight) || mantHeight <= 0) {
        showError('mantHeight', 'Insira um valor numérico válido para a altura da manta.');
        errorMessages.push('Insira um valor numérico válido para a altura da manta.');
        isValid = false;
    } else {
        clearError('mantHeight');
    }

    if (isNaN(cutWidth) || cutWidth <= 0) {
        showError('cutWidth', 'Insira um valor numérico válido para a largura do corte.');
        errorMessages.push('Insira um valor numérico válido para a largura do corte.');
        isValid = false;
    } else {
        clearError('cutWidth');
    }

    if (isNaN(cutHeight) || cutHeight <= 0) {
        showError('cutHeight', 'Insira um valor numérico válido para a altura do corte.');
        errorMessages.push('Insira um valor numérico válido para a altura do corte.');
        isValid = false;
    } else {
        clearError('cutHeight');
    }

    if (cutWidth > mantWidth) {
        showError('cutWidth', 'A largura do corte não pode ser maior que a largura da manta.');
        errorMessages.push('A largura do corte não pode ser maior que a largura da manta.');
        isValid = false;
    }

    if (cutHeight > mantHeight) {
        showError('cutHeight', 'A altura do corte não pode ser maior que a altura da manta.');
        errorMessages.push('A altura do corte não pode ser maior que a altura da manta.');
        isValid = false;
    }

    displayErrors(errorMessages);
    
    return isValid;
}

function optimizeCuts() {
    // Validação dos inputs
    if (!validateInputs()) {
        return;
    }

    // Pegando os valores do formulário
    const mantWidth = parseFloat(document.getElementById('mantWidth').value);
    const mantHeight = parseFloat(document.getElementById('mantHeight').value);
    const cutWidth = parseFloat(document.getElementById('cutWidth').value);
    const cutHeight = parseFloat(document.getElementById('cutHeight').value);

    // Definindo o canvas e o contexto
    const canvas = document.getElementById('mantCanvas');
    const ctx = canvas.getContext('2d');
    
    // Definindo o tamanho do canvas de acordo com o tamanho da manta
    canvas.width = mantWidth;
    canvas.height = mantHeight;
    
    // Limpando o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculando quantos cortes cabem na largura e altura da manta
    const cutsX = Math.floor(mantWidth / cutWidth);
    const cutsY = Math.floor(mantHeight / cutHeight);
    
    // Desenhando os cortes no canvas
    for (let y = 0; y < cutsY; y++) {
        for (let x = 0; x < cutsX; x++) {
            ctx.strokeRect(x * cutWidth, y * cutHeight, cutWidth, cutHeight);
        }
    }
    
    // Calculando o desperdício
    const usedArea = (cutsX * cutWidth) * (cutsY * cutHeight);
    const totalArea = mantWidth * mantHeight;
    const waste = totalArea - usedArea;
    const totalCuts = cutsX * cutsY;
    
    // Exibindo resultados na tela
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Área total utilizada:</strong> ${usedArea} cm²</p>
        <p><strong>Área desperdiçada:</strong> ${waste} cm²</p>
        <p><strong>Total de cortes possíveis:</strong> ${totalCuts}</p>
    `;
    
    // Mostrando um pop-up com os mesmos resultados
    alert(`Área total usada: ${usedArea} cm²\nÁrea desperdiçada: ${waste} cm²\nTotal de cortes: ${totalCuts}`);
}
