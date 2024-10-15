let selectedItem = ''; // Armazena o item selecionado
let selectedPrice = 0; // Armazena o preço do item selecionado

// Função para abrir o modal de adicionais
function openExtrasModal(item, price) {
    selectedItem = item; // Define o item selecionado
    selectedPrice = price; // Define o preço do item
    document.getElementById('extras-modal').style.display = 'flex'; // Exibe o modal
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

    // Monta a mensagem com os adicionais, item selecionado e endereço
    let adicionaisSelecionados = extras.length > 0 ? extras.join(', ') : 'Nenhum adicional';
    let mensagem = "Olá, gostaria de pedir uma " + selectedItem + 
                   " no valor de R$" + selectedPrice + 
                   ",00 ; com os seguintes adicionais: " + adicionaisSelecionados + 
                   ". Endereço de entrega: " + endereco + ".";

    // Redirecionar para o WhatsApp com a mensagem
    const whatsappUrl = "https://wa.me/5581981751725?text=" + encodeURIComponent(mensagem);
    window.location.href = whatsappUrl; // Redireciona para o WhatsApp com a mensagem

    // Fechar o modal
    document.getElementById('extras-modal').style.display = 'none';
}
