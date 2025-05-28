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
        - Condição de Saúde: ${dados.temCondicao} (não ignore esse fator na recomendação, se existir considere essa consição: ${dados.qualCondicao})
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
    `
}

document.querySelector('#btnEnviar').onclick = async function (event) {
    console.log("Entrei")
    event.preventDefault();
    let valid = true;
    let mensagemErro = "";

    const requiredInputs = [
        "p1", "p2", "p5", "p6", "p7", "p9", "p10", "p11"
    ];
    
    requiredInputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
        valid = false;
        mensagemErro += `- Preencha o campo: ${id}\n`;
        }
    });

    const radios = ["p3", "p4", "p8"];
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
        alert("Todos os campos estão preenchidos. Enviando...");
        const dados = pegarDadosForms()
        const template = criarTemplate(dados)
        console.log(template)
        const resposta = await chamarGemini(template)
        adicionarResposta(resposta)
    }
}

function pegarDadosForms(){
    const objetivo = document.getElementById("p1").value;
    const meta = document.getElementById("p2").value;

    const temLesao = document.querySelector('input[name="p3"]:checked')?.value;
    const qualLesao = document.getElementById("p3sim").value;

    const temCondicao = document.querySelector('input[name="p4s"]:checked')?.value || document.querySelector('input[name="p4n"]:checked')?.value;
    const qualCondicao = document.getElementById("p4sim").value;

    const diasTreino = document.getElementById("p5").value;
    const horarioTreino = document.getElementById("p6").value;

    const atividade = document.getElementById("p7").value;

    const tipoTreino = document.querySelector('input[name="p8"]:checked')?.value;

    const desmotivacao = document.getElementById("p9").value;
    const alimentacao = document.getElementById("p10").value;
    const sono = document.getElementById("p11").value;

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
    document.querySelector('#resposta').innerHTML 
        = `<p>${resposta}</p>`;
}