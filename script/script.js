$.get(
  "https://dfcanuto.com/cors?apiurl=https://www.worten.pt/i/da444d6be0bb56cad9db2df422a0f0299abb090e",
  function (data) {
    var eachData = data.split("|");
    var dividirCadaModelo = eachData[0].split(",");
    console.log(eachData.length);
    // console.log(dividirCadaModelo);

    // var goDeeper = dividirCadaModelo[1];

    // console.log(goDeeper);
    // Criar Placeholders para a informação
    var criarDivsPlaceHolder =
      "<div class='categoria'></div>" +
      "<div class='marca'></div>" +
      "<div class='modelo'></div>" +
      "<div class='preco'></div>";
    // Fazer o split a cada coluna de informação
    for (let i = 0; i < eachData.length; i++) {
      var dividirCadaModelo = eachData[i].split(",");
      var getCategoria = dividirCadaModelo[0];
      getCategoria = getCategoria.trim();

      var getMarca = dividirCadaModelo[1];
      // getMarca = getMarca.trim();
      var getModelo = dividirCadaModelo[2];
      // getModelo = getModelo.trim();
      var getPrice = dividirCadaModelo[3];
      // getPrice = getPrice.trim();
      $(".mainContainer").append("<div class='eachModelo'></div>");

      $(".eachModelo")
        .eq(i)
        .append(criarDivsPlaceHolder)
        .attr("marca", getMarca);

      $(".eachModelo")
        .eq(i)
        .find(".categoria")
        .html(getCategoria)
        .attr("id", getCategoria);

      $(".eachModelo").eq(i).find(".marca").html(getMarca).attr("id", getMarca);
      $(".eachModelo")
        .eq(i)
        .find(".modelo")
        .html(getModelo)
        .attr("id", getModelo);
      $(".eachModelo").eq(i).find(".preco").html(getPrice).attr("id", getPrice);

      // console.log(dividirCadaModelo);
    }

    $(".preco").append("€");

    /* Para as categorias */
    var testeCategorias = $(".categoria");
    var arrCategorias = [];
    for (let i = 0; i < testeCategorias.length; i++) {
      var checkRepeats = $(".categoria").text();
      var textoBtns = testeCategorias.eq(i).text().trim();

      arrCategorias.push(textoBtns);
    }

    // Limpar duplicados das marcas para criação dos btns
    var uniqueCategorias = [];
    $.each(arrCategorias, function (i, el) {
      if ($.inArray(el, uniqueCategorias) === -1) uniqueCategorias.push(el);
    });

    var uniqueCategorias = uniqueCategorias.filter(function (v) {
      return v !== "";
    });

    console.log("categorias " + uniqueCategorias);

    // Criação dos btns: Categorias
    for (let i = 0; i < uniqueCategorias.length; i++) {
      $(".categoriasEquipamentos").append(
        "<div class='btnsCategorias' id='" +
          uniqueCategorias[i] +
          "'>" +
          uniqueCategorias[i] +
          "</div>"
      );
    }

    /* Para as marcas */

    $(document).on("click", ".btnsCategorias", function () {
      $(".modelo").removeClass("modelosAtivos");
      $(".subPerg").eq(1).hide();
      $(".subPerg").eq(2).hide();
      $(".mainContainer, .valorDaRetoma, .notaLegal").hide();
      $(".eachModelo").removeClass("categoriaAtiva");
      $(".btnsCategorias").removeClass("categoriaAtiva");

      $(".subPerg").eq(0).show();
      $(".containerMarcasRetoma").empty();
      var qualEquipamento = $(this).attr("id");
      console.log("categoria " + qualEquipamento);
      // var testeBtns = $(".marca");
      if (qualEquipamento.indexOf("Smartphones") > 0) {
        var testeBtns = $(".eachModelo").children(
          '[id*="' + qualEquipamento + '"]'
        );
      } else {
        var testeBtns = $(".eachModelo").children("#" + qualEquipamento);
      }
      testeBtns.parent().addClass("categoriaAtiva");
      // testeBtns = testeBtns.find(".marca").text();
      // console.log(testeBtns);
      var arrMarcas = [];
      for (let i = 0; i < testeBtns.length; i++) {
        var checkRepeats = $(qualEquipamento).find(".btnsMarcas").text();
        var textoBtns = testeBtns.eq(i).next().text().trim();
        console.log(textoBtns);
        // console.log(textoBtns);
        // $(".containerMarcasRetoma").append(
        //   "<div class='btnsMarcas'>" + textoBtns + "</div>"
        // );

        arrMarcas.push(textoBtns);
      }

      console.log("modos " + arrMarcas);

      // Limpar duplicados das marcas para criação dos btns
      var uniqueNames = [];
      $.each(arrMarcas, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
      });

      var uniqueNames = uniqueNames.filter(function (v) {
        return v !== "";
      });

      console.log(uniqueNames);

      // Criação dos btns: marcas
      for (let i = 0; i < uniqueNames.length; i++) {
        $(".containerMarcasRetoma").append(
          "<div class='btnsMarcas' id='" + uniqueNames[i] + "'></div>"
        );
      }
    });
  }
);

$(document).on("click", ".btnsMarcas", function () {
  $(".valorDaRetoma").empty();
  $(".subPerg").eq(1).show();
  $(".mainContainer").show();
  $(".modelo").removeClass("finalPick");

  $("#myInput").css("display", "block");

  $(".modelo").removeClass("modelosAtivos");
  var marcaClicada = $(this).attr("id");

  console.log(marcaClicada);
  // $('[marca=" ' + marcaClicada + '"] .modelo').show();
  $('.categoriaAtiva[marca=" ' + marcaClicada + '"] .modelo').addClass(
    "modelosAtivos"
  );

  $("#myInput").attr(
    "placeholder",
    "Pesquisa o teu equipamento da " + marcaClicada
  );

  $("#myInput").val("");

  // $('[marca=" ' + marcaClicada + '"] .preco').show();
  // $(".eachModelo .marca").fadeToggle();
});

$(document).on("click", ".modelo", function () {
  $(".valorDaRetoma").empty();
  $(".subPerg").eq(2).show();
  $(".modelo").removeClass("finalPick");

  $(this).addClass("finalPick");

  var modeloEscolhido = $(".finalPick").text();
  $("#myInput").val(modeloEscolhido);
  // $(".modelo").removeClass("modelosAtivos");

  $(".mainContainer").hide();
  var precoRetoma = $(this).next().text();

  $(".valorDaRetoma").text(precoRetoma);
  $(".valorDaRetoma, .notaLegal").show();
});

// $(document).on("click", ".selecionarCategoria", function () {
//   $(".eachModelo .marca").fadeToggle();
// });

// $(document).on("click", ".marca", function () {
//   $(".eachModelo .modelo").fadeToggle();
// });

$(document).on("keyup", "#myInput", function () {
  $(".valorDaRetoma").empty();

  var value = $(this).val().toLowerCase();
  console.log(value);
  $(".mainContainer .eachModelo").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

$(document).on("click", ".resetAll", function () {
  $(".containerMarcasRetoma").empty();
  $(".subPerg, .mainContainer, .valorDaRetoma, #myInput, .notaLegal").hide();
  $(".eachModelo div").removeClass("modelosAtivos");
});
