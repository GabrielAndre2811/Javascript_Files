function primeiraEtapa(acertoProva, semestresfaltantes) {
    const NumQuestoes = 20
    const notaMinAprov = 0.7
    const qtdSemestres = 3

    let nota = acertoProva / NumQuestoes
    console.log(nota);

    if((nota >= notaMinAprov) && (semestresfaltantes >= qtdSemestres)){

        return "Aprovado";
    } else {
        return "Reprovado";
    }
}

alert(primeiraEtapa(14, 2));