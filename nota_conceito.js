let nota = 0
let conceito = '';

if ((nota <= 10) && (nota >= 8)){
    conceito = 'Aprovado';
    alert(conceito);
} else if ((nota < 8) && (nota >= 5)) {
    conceito = 'Recuperação';
    alert(conceito);
} else {
    conceito = 'Reprovado';
    alert(conceito);
}

