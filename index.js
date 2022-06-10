document.getElementById("xi").value =
  "62.43 66 58.16 50.52 22.74 25.27 35.33 41.15 43.3 45.28 40.95 37.46 47.59 51.8 55.88 66.13 63.54 67.25 69.32 75.13 76.33 72.99 78.52 84.38";
document.getElementById("yi").value =
  "108233 115645 113761 104172 73020 80506 87403 95056 102912 99399 94603 93952 108893 119017 115068 110035 116634 118989 126216 126802 121801 118780 110979 103501";

document.getElementById("botao").addEventListener("click", function (e) {
  //previne o comportamento padrao do botao
  e.preventDefault();

  //pegar o input com o id xi e yi e transformar em um array com o split
  let xi1 = document.getElementById("xi").value.split(" ");
  let yi1 = document.getElementById("yi").value.split(" ");

  //validar se o array tem o mesmo tamanho
  if (xi1.length != yi1.length) {
    alert("Os dois campos devem ter a mesma quantidade de valores");
    return;
  }

  //validar se os valores sao numericos
  for (let i = 0; i < xi1.length; i++) {
    if (isNaN(xi1[i]) || isNaN(yi1[i])) {
      alert("Os valores devem ser numericos");
      return;
    }
  }

  //transformar os arrays em numeros
  let xi = xi1.map(Number);
  let yi = yi1.map(Number);

  //colocar os valores de xi e yi em um array para usar no E-chart
  let xiEyi = [];
  for (let i = 0; i < xi.length; i++) {
    xiEyi.push([xi[i], yi[i]]);
  }

  ///AQUI COMEÇA AS CONTAS
  //fazer a media dos valores de xi e yi
  let Xmedia = 0;
  let Ymedia = 0;

  function media(xi, yi) {
    for (let i = 0; i < xi.length; i++) {
      Xmedia += xi[i];
      Ymedia += yi[i];
    }
    Xmedia = Xmedia / xi.length;
    Ymedia = Ymedia / yi.length;
  }

  media(xi, yi);

  //////////////////////////////////////////////////////
  //fazer o desvio padrao de xi e yi e so exibir no console
  function desvioPadrao(xi, yi) {
    let desvioX = 0;
    let desvioY = 0;
    for (let i = 0; i < xi.length; i++) {
      desvioX += Math.pow(xi[i] - Xmedia, 2);
      desvioY += Math.pow(yi[i] - Ymedia, 2);
    }
    desvioX = Math.sqrt(desvioX / xi.length);
    desvioY = Math.sqrt(desvioY / yi.length);
    return [desvioX, desvioY];
  }
  console.log("Desvio Padrao de X e Y:");
  console.log(desvioPadrao(xi, yi));
  //////////////////////////////////////////////////////

  // fazer todos os valores de xi e yi serem subtraídos do valor da media e colocar em um array
  let XiMXmedia = [];
  let YiMYmedia = [];

  function diferenca(xi, yi) {
    for (let i = 0; i < xi.length; i++) {
      XiMXmedia[i] = xi[i] - Xmedia;
      YiMYmedia[i] = yi[i] - Ymedia;
    }
  }

  diferenca(xi, yi);

  //fazer todos os items da lista XiMXmedia serem multiplicados pelos items da lista YiMYmedia e armazenar em um array
  let XiMXmediaVYiMYmedia = [];

  function multiplicar(XiMXmedia, YiMYmedia) {
    for (let i = 0; i < XiMXmedia.length; i++) {
      XiMXmediaVYiMYmedia[i] = XiMXmedia[i] * YiMYmedia[i];
    }
  }

  multiplicar(XiMXmedia, YiMYmedia);

  //fazer todos os items da lista XiMXmedia serem elevados ao quadrado e armazenar em um array
  let XiMXmedia2 = [];
  function elevar(XiMXmedia) {
    for (let i = 0; i < XiMXmedia.length; i++) {
      XiMXmedia2[i] = XiMXmedia[i] * XiMXmedia[i];
    }
  }

  elevar(XiMXmedia);

  //Somas dos itens de XiMXmediaVYiMYmedia e XiMXmedia2 e armazenar em uma variavel
  let somaXiMXmediaVYiMYmedia = 0;
  let somaXiMXmedia2 = 0;

  function somar(XiMXmediaVYiMYmedia, XiMXmedia2) {
    for (let i = 0; i < XiMXmediaVYiMYmedia.length; i++) {
      somaXiMXmediaVYiMYmedia += XiMXmediaVYiMYmedia[i];
      somaXiMXmedia2 += XiMXmedia2[i];
    }
  }

  somar(XiMXmediaVYiMYmedia, XiMXmedia2);

  //encontrar o valor de b
  let b = 0;

  function bx(somaXiMXmediaVYiMYmedia, somaXiMXmedia2) {
    b = somaXiMXmediaVYiMYmedia / somaXiMXmedia2;
  }

  //encontrar o valor de a
  let a = 0;

  function ax(Ymedia, b) {
    a = Ymedia - b * Xmedia;
  }

  bx(somaXiMXmediaVYiMYmedia, somaXiMXmedia2);
  ax(Ymedia, b);

  //fazer todos os items da reta usando a formula y = a + bx
  let y = [];

  function yi2(a, b, xi) {
    for (let i = 0; i < xi.length; i++) {
      y[i] = a + b * xi[i];
    }
  }

  yi2(a, b, xi);

  // fazer o array do SqRes
  let SqRes = [];

  function sqres(y, yi) {
    for (let i = 0; i < y.length; i++) {
      SqRes[i] = yi[i] - y[i];
    }
  }

  sqres(y, yi);

  // fazer todos os items de SqRes serrem elevados ao quadrado e armazenar em um array
  let SqRes2 = [];

  function sqres2(SqRes) {
    for (let i = 0; i < SqRes.length; i++) {
      SqRes2[i] = SqRes[i] * SqRes[i];
    }
  }

  sqres2(SqRes);

  // fazer o a soma de todos os items de SqRes2
  let somaSqRes = 0;

  function somasqres(SqRes) {
    for (let i = 0; i < SqRes.length; i++) {
      somaSqRes += SqRes[i];
    }
  }

  somasqres(SqRes2);

  //fazer o array do SqReg
  let SqReg = [];

  function sqreg(Ymedia, y) {
    for (let i = 0; i < yi.length; i++) {
      SqReg[i] = y[i] - Ymedia;
    }
  }

  sqreg(Ymedia, y);

  // fazer todos os items de SqReg serem elevados ao quadrado e armazenar em um array
  let SqReg2 = [];

  function sqreg2(SqReg) {
    for (let i = 0; i < SqReg.length; i++) {
      SqReg2[i] = SqReg[i] * SqReg[i];
    }
  }

  sqreg2(SqReg);

  // fazer o a soma de todos os items de SqReg2
  let somaSqReg = 0;

  function somasqreg(SqReg2) {
    for (let i = 0; i < SqReg2.length; i++) {
      somaSqReg += SqReg2[i];
    }
  }

  somasqreg(SqReg2);

  //fazer o SqTot
  let SqTot = [];

  function sqtot(yi, Ymedia) {
    for (let i = 0; i < yi.length; i++) {
      SqTot[i] = yi[i] - Ymedia;
    }
  }

  sqtot(yi, Ymedia);

  // fazer todos os items de SqTot serem elevados ao quadrado e armazenar em um array
  let SqTot2 = [];

  function sqtot2(SqTot) {
    for (let i = 0; i < SqTot.length; i++) {
      SqTot2[i] = SqTot[i] * SqTot[i];
    }
  }

  sqtot2(SqTot);

  // fazer o a soma de todos os items de SqTot2
  let somaSqTot = 0;

  function somasqtot(SqTot2) {
    for (let i = 0; i < SqTot2.length; i++) {
      somaSqTot += SqTot2[i];
    }
  }

  somasqtot(SqTot2);

  //calcular o valor de r²
  let r2 = 0;
  r2 = somaSqReg / somaSqTot;
  //calcular o valor de r
  let r = 0;
  r = Math.sqrt(r2);
  //se o beta for negativo, fazer o r ser negativo
  if (b < 0) {
    r = -r;
  }

  //Soma de X e Y faltou fazer
  let somaX = 0;
  let somaY = 0;

  for (let i = 0; i < xi.length; i++) {
    somaX += xi[i];
    somaY += yi[i];
  }

  //fazer todos os arrays serem tres casas depois da vírgula (0.000) e converter em numero
  for (let i = 0; i < xi.length; i++) {
    xi[i] = parseFloat(xi[i].toFixed(3));
    yi[i] = parseFloat(yi[i].toFixed(3));
    XiMXmedia[i] = parseFloat(XiMXmedia[i].toFixed(3));
    YiMYmedia[i] = parseFloat(YiMYmedia[i].toFixed(3));
    XiMXmediaVYiMYmedia[i] = parseFloat(XiMXmediaVYiMYmedia[i].toFixed(3));
    XiMXmedia2[i] = parseFloat(XiMXmedia2[i].toFixed(3));
    y[i] = parseFloat(y[i].toFixed(3));
    SqRes[i] = parseFloat(SqRes[i].toFixed(3));
    SqRes2[i] = parseFloat(SqRes2[i].toFixed(3));
    SqReg[i] = parseFloat(SqReg[i].toFixed(3));
    SqReg2[i] = parseFloat(SqReg2[i].toFixed(3));
    SqTot[i] = parseFloat(SqTot[i].toFixed(3));
    SqTot2[i] = parseFloat(SqTot2[i].toFixed(3));
  }

  //somaX, SomaY, Xmedia, Ymedia, b, a, somaSqRes, somaSqReg, somaSqTot, r2, r
  //serem tres casas depois da vírgula (0.000) e converter em numero
  somaX = parseFloat(somaX.toFixed(3));
  somaY = parseFloat(somaY.toFixed(3));
  Xmedia = Number(Xmedia.toFixed(3));
  Ymedia = Number(Ymedia.toFixed(3));
  a = parseFloat(a.toFixed(3));
  b = parseFloat(b.toFixed(3));
  somaSqRes = parseFloat(somaSqRes.toFixed(3));
  somaSqReg = parseFloat(somaSqReg.toFixed(3));
  somaSqTot = parseFloat(somaSqTot.toFixed(3));
  r2 = parseFloat(r2.toFixed(4));
  r = parseFloat(r.toFixed(4));

  // fazer todos os items de todas as listas serem exibidos no html com uma tabela do bootstrap5
  function exibirTabela(
    xi,
    yi,
    XiMXmedia,
    YiMYmedia,
    XiMXmediaVYiMYmedia,
    XiMXmedia2,
    y,
    SqRes,
    SqRes2,
    SqReg,
    SqReg2,
    SqTot,
    SqTot2
  ) {
    let tabela =
      "<div class='table-responsive'><table class='table table-bordered table-hover table-light table-striped table-sm'><thead class='table-dark'><tr><th scope='col'>Xi</th><th scope='col'>Yi</th><th scope='col'>Xi-x̅</th><th scope='col'>Yi-y̅</th><th scope='col'>(Xi-x̅) * (Yi-y̅)</th><th scope='col'>(Xi-x̅)²</th><th scope='col'>ŷi = α + β*xi</th><th scope='col'>(yi - ŷi)</th><th scope='col'>(yi - ŷi)²</th><th scope='col'>(ŷi - y̅)</th><th scope='col'>(ŷi - y̅)²</th><th scope='col'>(yi - y̅)</th><th scope='col'>(yi - y̅)²</th></tr></thead><tbody>";

    for (let i = 0; i < xi.length; i++) {
      tabela +=
        "<tr><td>" +
        xi[i] +
        "</td><td>" +
        yi[i] +
        "</td><td>" +
        XiMXmedia[i] +
        "</td><td>" +
        YiMYmedia[i] +
        "</td><td>" +
        XiMXmediaVYiMYmedia[i] +
        "</td><td>" +
        XiMXmedia2[i] +
        "</td><td>" +
        y[i] +
        "</td><td>" +
        SqRes[i] +
        "</td><td>" +
        SqRes2[i] +
        "</td><td>" +
        SqReg[i] +
        "</td><td>" +
        SqReg2[i] +
        "</td><td>" +
        SqTot[i] +
        "</td><td>" +
        SqTot2[i] +
        "</td></tr>";
    }
    tabela += "</tbody></table></div>";
    document.getElementById("tabela").innerHTML = tabela;
  }

  exibirTabela(
    xi,
    yi,
    XiMXmedia,
    YiMYmedia,
    XiMXmediaVYiMYmedia,
    XiMXmedia2,
    y,
    SqRes,
    SqRes2,
    SqReg,
    SqReg2,
    SqTot,
    SqTot2
  );

  //montar uma tabela com os dados de somaX, somaY, Xmedia, Ymedia, n
  let tabela3 =
    "<div class='table-responsive'><table class='table table-bordered table-hover table-light table-striped table-sm'><thead class='table-dark'><tr><th scope='col'>somaX</th><th scope='col'>somaY</th> <th scope='col'>Xmedia</th> <th scope='col'>Ymedia</th> <th scope='col'>n</th></tr></thead><tbody>";

  tabela3 +=
    "<tr><td>" +
    somaX +
    "</td><td>" +
    somaY +
    "</td><td>" +
    Xmedia +
    "</td><td>" +
    Ymedia +
    "</td><td>" +
    xi.length +
    "</td></tr>";
  tabela3 += "</tbody></table></div>";

  document.getElementById("tabela3").innerHTML = tabela3;

  //montar uma tabela com os dados de b, a, somaSqRes, somaSqReg, somaSqTot, r2, r
  let tabela2 =
    "<div class='table-responsive'><table class='table table-bordered table-hover table-light table-striped table-sm'><thead class='table-dark'><tr><th scope='col'>Beta</th> <th scope='col'>Alfa</th> <th scope='col'>SqRes</th> <th scope='col'>SqReg</th> <th scope='col'>SqTot</th> <th scope='col'>R²</th> <th scope='col'>R</th></tr></thead><tbody>";

  tabela2 +=
    "<tr><td>" +
    b +
    "</td><td>" +
    a +
    "</td><td>" +
    somaSqRes +
    "</td><td>" +
    somaSqReg +
    "</td><td>" +
    somaSqTot +
    "</td><td>" +
    r2 +
    "</td><td>" +
    r +
    "</td></tr>";

  tabela2 += "</tbody></table></div>";
  document.getElementById("tabela2").innerHTML = tabela2;

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  // Utilizando a bibioteca Chart.js para gerar um gráfico de linha

  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;

  // See https://github.com/ecomfe/echarts-stat
  echarts.registerTransform(ecStat.transform.regression);
  const data = xiEyi; //colocando todos os dados de xi e yi em um array
  option = {
    dataset: [
      {
        source: data,
      },
      {
        transform: {
          type: "ecStat:regression",
          // 'linear' by default.
          config: { method: "linear", formulaOn: "end" },
        },
      },
    ],
    title: {
      text: "Regressão Linear",
      subtext: "y = a + bx",
      /*sublink: "https://github.com/ecomfe/echarts-stat", */
      left: "center",
    },
    legend: {
      bottom: 5,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "Ponto",
        type: "scatter",
        color: "#00BFFF",
      },
      {
        name: "Linha",
        type: "line",
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
        color: "#ff0000",
      },
    ],
  };

  option && myChart.setOption(option);
});
