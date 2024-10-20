let selectedItem = ''; // Armazena o item selecionado
let selectedPrice = 0; // Armazena o preço do item selecionado
let isSecondCard = false; // Verifica se o segundo card foi selecionado

// Função para abrir o modal de adicionais
function openExtrasModal(item, price, secondCard = false) {
    selectedItem = item; // Define o item selecionado
    selectedPrice = price; // Define o preço do item
    isSecondCard = secondCard; // Verifica se é o segundo card

    // Atualiza os valores dos adicionais
    updateExtrasPrices(secondCard);

    document.getElementById('extras-modal').style.display = 'flex'; // Exibe o modal
}

// Função para atualizar os preços dos adicionais
function updateExtrasPrices(secondCard) {
    const extrasForm = document.getElementById('extras-form');

    extrasForm.querySelectorAll('label').forEach((label) => {
        const checkbox = label.querySelector('input');

        if (checkbox) { // Certifique-se de que o checkbox existe
            if (secondCard) {
                // Se for o segundo card, todos os adicionais são gratuitos
                label.innerHTML = `${checkbox.outerHTML} ${checkbox.value} ------------------------- Grátis`;
            } else {
                // Se for o primeiro card, mantém os valores originais
                switch (checkbox.value) {
                    case "Cheddar ":
                        label.innerHTML = `${checkbox.outerHTML} Cheddar ------------------------- R$ 2,00`;
                        break;
                    case "Catupiry ":
                        label.innerHTML = `${checkbox.outerHTML} Catupiry ------------------------- R$ 2,00`;
                        break;
                    case "Molho 4 Queijos ":
                        label.innerHTML = `${checkbox.outerHTML} Molho 4 Queijos ---------------- R$ 4,00`;
                        break;
                }
            }
        }
    });
}

// Função para fechar o modal e enviar o pedido via WhatsApp
function submitOrder() {
    const form = document.getElementById('extras-form'); // Formulário de adicionais
    const extras = []; // Array para armazenar os adicionais

    // Itera sobre os checkboxes de adicionais marcados
    form.querySelectorAll('input[name="adicional"]:checked').forEach((item) => {
        extras.push(item.value); // Adiciona os adicionais selecionados à lista
    });

    // Obtém o valor do endereço
    const endereco = document.getElementById('endereco').value;
    const referencia = document.getElementById('referencia').value;

    // Monta a mensagem com os adicionais, item selecionado e endereço
    let adicionaisSelecionados = extras.length > 0 ? extras.join(', ') : 'Nenhum adicional';
    let mensagem = "Olá, gostaria de pedir uma " + selectedItem + 
                   " no valor de R$" + selectedPrice + 
                   ",00 ; com os seguintes adicionais: " + adicionaisSelecionados + 
                   ". Endereço de entrega: " + endereco +  " Ponto de referência: " + referencia;
    // Redirecionar para o WhatsApp com a mensagem
    const whatsappUrl = "https://wa.me/5581986171603?text=" + encodeURIComponent(mensagem);
    window.location.href = whatsappUrl; // Redireciona para o WhatsApp com a mensagem

    // Fechar o modal
    document.getElementById('extras-modal').style.display = 'none';
}