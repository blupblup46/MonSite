
var op="";


    const un= document.getElementById("1");
    
    const deux= document.getElementById("2");
    const trois= document.getElementById("3");
    const quatre= document.getElementById("4");
    const cinq= document.getElementById("5");
    const six= document.getElementById("6");
    const sept= document.getElementById("7");
    const huit= document.getElementById("8");
    const neuf= document.getElementById("9");
    const zero= document.getElementById("0");

    const plus= document.getElementById("+");
    const moins= document.getElementById("-");
    const mult= document.getElementById("mult");
    const divi= document.getElementById("divi");
    const egal= document.getElementById("=");
    const ecran= document.getElementById("ecran");
    const raz= document.getElementById("raz");
    const suppr= document.getElementById("suppr");

    raz.addEventListener('click', function(){
        op="";
        ecran.innerHTML=op;
    });

    suppr.addEventListener('click', function(){
        op=op.substring(0, op.length-1);
        ecran.innerHTML=op;

    })

    un.addEventListener('click', function(){
        op = op + 1;
        ecran.innerHTML=op;
    });

    deux.addEventListener('click', function(){
        op = op + 2;
        ecran.innerHTML=op;
    });
    
    trois.addEventListener('click', function(){
        op = op + 3;
        ecran.innerHTML=op;
    });
    
    quatre.addEventListener('click', function(){
        op = op + 4;
        ecran.innerHTML=op;
    });
    
    cinq.addEventListener('click', function(){
        op = op + 5;
        ecran.innerHTML=op;
    });
    
    six.addEventListener('click', function(){
        op = op + 6;
        ecran.innerHTML=op;
    });
    
    sept.addEventListener('click', function(){
        op = op + 7;
        ecran.innerHTML=op;
    });
    
    huit.addEventListener('click', function(){
        op = op + 8;
        ecran.innerHTML=op;
    });
    
    neuf.addEventListener('click', function(){
        op = op + 9;
        ecran.innerHTML=op;
    });
    
    zero.addEventListener('click', function(){
        op = op + 0;
        ecran.innerHTML=op;
    });

    plus.addEventListener('click', function(){
        op = op + "+";
        ecran.innerHTML=op;

    });

    moins.addEventListener('click', function(){
        op = op + "-";
        ecran.innerHTML=op;
    });

    mult.addEventListener('click', function(){
        op = op + "*";
        ecran.innerHTML=op;
    });

    divi.addEventListener('click', function(){
        op = op + "/";
        ecran.innerHTML=op;
    });


    egal.addEventListener('click', function(){
        /*
        séparre les nombres dans la chaine op pour traiter les nombres de plus de deux chiffres. 
        traite les nombres dans le tableau nombres en fonction des opérateurs
        */
        indNombre=1;

        nombres = op.split(/[-+*/]/);

        ecran.innerHTML= "e1.1";

        if(nombres.length===0){
            res="err"; 
            ecran.innerHTML= "e1.2";

        }else{
            if(nombres[0]=='' && op.charAt(0)=='-'){
                ecran.innerHTML= "e1.3";

                nombres=nombres.reverse();
                ecran.innerHTML= nombres;
                nombres.pop()
                nombres.push(0);
                nombres=nombres.reverse();
            }
            ecran.innerHTML= nombres;

            res = parseInt(nombres[0]);
        }     
        
        for (boucle=0; boucle< op.length; boucle++){
            pointeur = op.charAt(boucle);
            ecran.innerHTML= "e2";

        

            switch (pointeur){
               
                case "+":
                    if (op.charAt(boucle+1).match(/[*+-/]/)){
                        ecran.innerHTML= "e4";
                        res= "err";
                        boucle= op.length+1;
                    }
                    res = res + parseInt(nombres[indNombre]);
                    indNombre+=1;
                    break;

                case "-":
                    if (op.charAt(boucle+1).match(/[*+-/]/)){
                    ecran.innerHTML= "e4";
                    res= "err";
                    boucle= op.length+1;
                }
                    
                    res = res - parseInt(nombres[indNombre]);
                    indNombre+=1;
                    break;

                case "*":
                    if (op.charAt(boucle+1).match(/[*+-/]/)){
                        ecran.innerHTML= "e4";
                        res= "err";
                        boucle= op.length+1;
                    }
                    res = res * parseInt(nombres[indNombre]);
                    indNombre+=1;
                    break;

                case "/":
                    if (op.charAt(boucle+1).match(/[*+-/]/)){
                        ecran.innerHTML= "e4";
                        res= "err";
                        boucle= op.length+1;
                    }
                    res = res / parseInt(nombres[indNombre]);                    
                    indNombre+=1;
                    break;
            }
        }
        ecran.innerHTML= res;
        op=res;
    });