// Definindo os recintos e os animais
const recintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: ["MACACO", "MACACO", "MACACO"] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: ["GAZELA"] },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: ["LEAO"] }
  ];
  
  const animais = {
    LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
    LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
    CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
    MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
    GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
    HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
};

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
      // Verificar se o animal é válido
      if (!animais[animal]) {
        return { erro: "Animal inválido" };
      }
  
      // Verificar se a quantidade é válida
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = animais[animal];
      const recintosViaveis = [];
  
      // Verificar cada recinto
      for (const recinto of recintos) {
        // Verificar se o bioma é adequado para o animal
        if (!animalInfo.biomas.includes(recinto.bioma) && !(animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio')) {
          continue;
        }
  
        // Calcular o espaço ocupado pelos animais existentes
        const ocupacaoExistente = recinto.animaisExistentes.reduce((total, existente) => total + animais[existente].tamanho, 0);
        let espacoNecessario = animalInfo.tamanho * quantidade;
  
        // Adicionar espaço extra se houver mais de uma espécie no recinto
        const diferentesEspecies = new Set(recinto.animaisExistentes).size > 1 || (recinto.animaisExistentes.length > 0 && animal !== recinto.animaisExistentes[0]);
        if (diferentesEspecies) {
          espacoNecessario += 1; // Espaço adicional para espécies diferentes
        }
  
        const espacoLivre = recinto.tamanhoTotal - ocupacaoExistente;
  
        // Verificar regra de convivência com carnívoros
        const contemCarnivoros = recinto.animaisExistentes.some(a => animais[a].carnivoro);
        if (animalInfo.carnivoro && recinto.animaisExistentes.length > 0 && !recinto.animaisExistentes.every(a => a === animal)) {
          continue; // Carnívoros não podem dividir o espaço com outras espécies
        }
  
        // Se já existem carnívoros no recinto, não permitir adicionar outras espécies
        if (contemCarnivoros && !animalInfo.carnivoro) {
          continue; // Não pode colocar herbívoros com carnívoros
        }
  
        // Verificar se o espaço necessário é menor ou igual ao espaço livre
        if (espacoNecessario <= espacoLivre) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      // Verificar se há recintos viáveis
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  