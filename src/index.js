import { select, input } from "@inquirer/prompts";

let meta = {
  value: "Fazer exercícios",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({
    message: "Digite a sua meta:",
  });
  // Faz com que o usuário digite algo
  if (meta.length == 0) {
    console.log("Por favor, a meta não pode ser vazia !");
    return cadastrarMeta();
  }

  // Utilizado para enviar a meta para o array
  metas.push({ value: meta, checked: false });
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
        console.log("Vamos listar");
        break;
      case "Sair":
        console.log("Volte sempre ! ");
        return;
    }
  }
};

start();
