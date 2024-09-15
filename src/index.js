import { select, input, checkbox } from "@inquirer/prompts";

// let meta = {};
let metas = [];

const cadastrarMeta = async () => {
  const meta = await input({
    message: "Digite a sua meta:",
  });
  // Faz com que o usuário digite algo
  if (meta.length == 0) {
    console.warn("Por favor, a meta não pode ser vazia !");
    return cadastrarMeta();
  }

  // Utilizado para enviar a meta para o array
  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  if (metas.length == 0) {
    console.warn("Não há metas a serem selecionadas");
    return;
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o 'Space' para marcar/desmarcar e o 'Enter' para finalizar essa etapa",
    // Uma forma de copiar todos os items que há no array de metas
    instructions: false,
    choices: [...metas],
  });

  if (respostas.length == 0) {
    console.warn("Não houve nenhuma meta selecionada...");
    return;
  }

  metas.forEach((m) => {
    m.checked = false;
  });
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

  console.warn("Meta(s) marcadas como concluída(s) !");
};

const metasRealizadas = async () => {
  // Higher order funcitons
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    console.warn("Não existem metas realizadas 😢");
    return;
  }
  await select({
    message: "Metas Realizadas",
    choices: [...realizadas],
  });
  console.warn(realizadas);
};

const start = async () => {
  while (true) {
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
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (option) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "Listar":
        await listarMetas();
        break;
      case "Realizadas":
        await metasRealizadas();
      case "Sair":
        console.log("Volte sempre ! ");
        return;
    }
  }
};

start();
