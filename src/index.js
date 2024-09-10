let meta = {
  value: "Ir para a acadêmia",
  checked: false,
  log: (info) => {
    console.log("Sou um método pois estou associado a um objeto");
    console.log(info);
  },
};

// metodo ou função
const criarMeta = () => {
  console.log("Sou uma função em arrow function usada para criar meta");
};
criarMeta();
// Sou um método pois estou associado a um objeto
meta.log(meta.value);
