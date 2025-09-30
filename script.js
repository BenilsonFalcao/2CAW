// ==================
// Carrinho
// ==================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Função para adicionar produto
function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Função para remover produto
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho(); // atualiza a tela
}

// Função para exibir carrinho
function exibirCarrinho() {
  let lista = document.getElementById("lista-carrinho");
  let totalSpan = document.getElementById("total");

  if (!lista) return; // só roda se estiver na página do carrinho

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} 
      <button onclick="removerDoCarrinho(${index})">Remover</button>`;
    lista.appendChild(li);
    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

// ==================
// Finalizar Compra
// ==================
function salvarFormulario(event) {
  event.preventDefault(); // evita refresh
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.querySelector("input[name='pagamento']:checked")?.value;
  
  let dados = { nome, email, endereco, pagamento, carrinho };

  localStorage.setItem("pedido", JSON.stringify(dados));

  alert("Pedido salvo com sucesso! Obrigado pela compra.");
  localStorage.removeItem("carrinho"); // esvazia carrinho
}
