import { select, input, checkbox } from "@inquirer/prompts";
// Para utilizar o arquivo JSON do projeto

import fs from "fs/promises";

let mensagem = "Olá, bem-vindo(a) ao app de gerenciamento de metas ! ❤";

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    metas = JSON.parse(dados);
  } catch (error) {
    metas = [];
  }
};

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({
    message: "Digite a sua meta:",
  });
  // Faz com que o usuário digite algo
  if (meta.length == 0) {
    mensagem = "Por favor, a meta não pode ser vazia !";
    return cadastrarMeta();
  }

  // Utilizado para enviar a meta para o array
  metas.push({ value: meta, checked: false });
  mensagem = "Oba! Você criou uma nova meta! ✨";
};

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não há metas a serem selecionadas";
    return;
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o 'Space' para marcar/desmarcar e o 'Enter' para finalizar essa etapa",
    // Uma forma de copiar todos os items que há no array de metas
    instructions: false,
    choices: [...metas],
  });

  // Faz com que as metas fiquem desmarcadas de ínicio
  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Não houve nenhuma meta selecionada...";
    return;
  }

  // Selecionar para qual das metas é certa a ser encontrada
  // O m é uma varáivel a parte
  //  A função tem que voltar um trua ou false
  // O m.value seria para que seja buscado o valor exato para que entregue um TRUE no caso será percorrido em cada meta criada
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });

  mensagem = "Meta(s) marcadas como concluída(s) !";
};

const metasRealizadas = async () => {
  // Higher order funcitons
  if (metas.length == 0) {
    mensagem = "Nenhuma meta realizada..";
    return;
  }
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    console.warn("Não existem metas realizadas 😢");
    return;
  }
  await select({
    message: "Metas Realizadas: " + realizadas.length,
    choices: [...realizadas],
  });
  console.warn(realizadas);
};

const metasAbertas = async () => {
  // Higher order funcitons
  if (metas.length == 0) {
    mensagem = "Não existem metas abertas..";
    return;
  }
  const abertas = metas.filter((meta) => {
    // Diferente o inverso do true da meta.checked
    return !meta.checked;
  });

  if (abertas.length == 0) {
    console.warn("Não existem metas abertas! 😊");
    return;
  }
  await select({
    message: "Metas Abertas: " + metas.length,
    choices: [...abertas],
  });
  console.warn(abertas);
};

const deletarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Nenhum item para deletar...";
    return;
  }
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });
  const itemsADeletar = await checkbox({
    message: "Selecione um item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itemsADeletar.length == 0) {
    mensagem = "Nenhum item para deletar...";
    return;
  }
  itemsADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem =
    "Meta(s) deletada(s) 🗑. " +
    "Você excluiu " +
    itemsADeletar.length +
    " meta(s)";
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  await carregarMetas();
  while (true) {
    mostrarMensagem();
    await salvarMetas();

    // Aguardar ( Espere que o usuário vai selecionar alguma coisa)
    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "Cadastrar",
        },
        {
          name: "Listar Metas",
          value: "Listar",
        },
        {
          name: "Metas Realizadas",
          value: "Realizadas",
        },
        {
          name: "Metas Abertas",
          value: "Abertas",
        },
        {
          name: "Deletar Metas",
          value: "Deletadas",
        },
        {
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (option) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        await salvarMetas();
        break;
      case "Listar":
        await listarMetas();
        await salvarMetas();
        break;
      case "Realizadas":
        await metasRealizadas();
        break;
      case "Abertas":
        await metasAbertas();
        break;
      case "Deletadas":
        await deletarMetas();
        break;
      case "Sair":
        console.log("Volte sempre ! ");
        return;
    }
  }
};

start();
