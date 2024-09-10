import { select } from "@inquirer/prompts";

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
        console.log("Vamos cadastrar");
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
