const API_KEY = "";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function chamarGemini(prompt) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro:", data.error);
      return "Ocorreu um erro ao gerar a resposta.";
    }

    const resposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(resposta);
    return resposta;

  } catch (error) {
    console.error("Erro na requisição:", error);
    return "Erro na comunicação com a API.";
  }
}

function criarTemplate(dados){
    return `
        Assuma o papel de um profissional altamente experiente nas áreas de educação física, nutrição e treinamento esportivo.
        Com base nas informações abaixo, elabore uma sugestão de treino personalizado, considerando objetivos, limitações físicas e preferências individuais:

        - Objetivo principal: ${dados.objetivo}
        - Meta específica: ${dados.meta}
        - Lesão atual: ${dados.temLesao} (não ignore esse fator na recomendação, se existir considere essa lesão: ${dados.qualLesao})
        - Condição de Saúde: ${dados.temCondicao} (não ignore esse fator na recomendação, se existir considere essa condição: ${dados.qualCondicao})
        - Disponibilidade para treinos: ${dados.diasTreino} dias por semana, no período de(a) ${dados.horarioTreino}
        - Atividade favorita: ${dados.atividade}
        - Preferência de tipo de treino: ${dados.tipoTreino}
        - Principal fator de desmotivação: ${dados.desmotivacao}
        - Hábitos alimentares: ${dados.alimentacao}
        - Qualidade e rotina de sono: ${dados.sono}

        Estruture sua resposta com:
        1. Resumo do perfil (interpretação das informações);
        2. Plano de treino semanal adaptado;
        3. Dicas complementares de alimentação, recuperação e motivação.
        4. *Me responda numa estrutura de código HTML, somente o conteúdo da tag body*

        Critérios de Aceite:
        - Apenas responda se as informações que forem informadas fizerem sentido, em caso de não parecerem informações boas ou suficientes para criar a sugestão, devolva que não pode fornecer um plano por conta das informações fornecidas.
    `
}

document.querySelector('#btnEnviar').onclick = async function (event) {
    event.preventDefault();
    let valid = true;
    let mensagemErro = "";

    const requiredInputs = [
        "objetivo", "meta", "dias por semana", "horário", "atividade", "desmotiva", "alimentação", "dorme"
    ];
    
    requiredInputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
        valid = false;
        mensagemErro += `- Preencha o campo: ${id}\n`;
        }
    });

    const radios = ["lesão", "condição de saúde", "Prefere treinos"];
    radios.forEach(name => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
        valid = false;
        mensagemErro += `- Selecione uma opção para: ${name}\n`;
        }
    });

    if (!valid) {
        alert("Por favor, preencha todos os campos obrigatórios:\n\n" + mensagemErro);
    } else {
        alert("Todos os campos estão preenchidos. Aguarde enquanto geramos sua planilha de exercícios...");
        const dados = pegarDadosForms()
        const template = criarTemplate(dados)
        console.log(template)
        const resposta = await chamarGemini(template)
        adicionarResposta(resposta.replace(/`/g, '').replace(/^\s*html\s*\n?/, ''))
    }
}

function pegarDadosForms(){
    const objetivo = document.getElementById("objetivo").value;
    const meta = document.getElementById("meta").value;

    const temLesao = document.querySelector('input[name="lesão"]:checked')?.value;
    const qualLesao = temLesao == "sim" ? document.getElementById("lesaoDescricao").value : "Nenhuma";

    const temCondicao = document.querySelector('input[name="condição de saúde"]:checked')?.value;
    const qualCondicao = temCondicao == "sim" ? document.getElementById("condicaoSaudeDescricao").value: "Nenhuma";

    const diasTreino = document.getElementById("dias por semana").value;
    const horarioTreino = document.getElementById("horário").value;

    const atividade = document.getElementById("atividade").value;

    const tipoTreino = document.querySelector('input[name="Prefere treinos"]:checked')?.value;

    const desmotivacao = document.getElementById("desmotiva").value;
    const alimentacao = document.getElementById("alimentação").value;
    const sono = document.getElementById("dorme").value;

    return {
        objetivo,
        meta,
        temLesao,
        qualLesao,
        temCondicao,
        qualCondicao,
        diasTreino,
        horarioTreino,
        atividade,
        tipoTreino,
        desmotivacao,
        alimentacao,
        sono
    };
}

function adicionarResposta (resposta) {
    document.getElementById("resposta").classList.remove("esconder")
    document.getElementById("resposta").classList.add("conteudo")
    document.querySelector('#resposta').innerHTML 
        = `<p>${resposta}</p>`;
}

document.querySelectorAll('input[name="lesão"]').forEach(input => {
  input.addEventListener("change", function () {
    const temLesao = document.querySelector('input[name="lesão"]:checked')?.value;
    exibirDescricao(temLesao, "lesaoDescricao")
  });
});

document.querySelectorAll('input[name="condição de saúde"]').forEach(input => { 
  input.addEventListener("change", function () {
    const temCondicao = document.querySelector('input[name="condição de saúde"]:checked')?.value
    exibirDescricao(temCondicao, "condicaoSaudeDescricao")
  })
});

function exibirDescricao(valor, id) {
  if (valor == "sim") {
    document.getElementById(id).classList.remove("esconder")
    document.getElementById(id).classList.add("exibirDescricao")
  }else {
    document.getElementById(id).classList.remove("exibirDescricao")
    document.getElementById(id).classList.add("esconder")
  }
}