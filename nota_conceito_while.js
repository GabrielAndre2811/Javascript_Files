let nota , conceito;
let count = 1

while (count <= 10){
    nota = parseFloat(prompt("Digite a nota:"));
    if (nota){
        if ((nota <= 10) && (nota >= 8)){
            conceito = "ConceitoA";
            console.log(conceito)
        } 
        if ((nota <8) && (nota >= 5)){   
            conceito = "ConceitoB";
            console.log(conceito);
        }
    } else {console.log("Voce precisa se dedicar um pouco mais")}
    count++;
}