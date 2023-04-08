//recuperation des elements du dom

const generateEl = document.getElementById('generate');
let result = document.querySelector("#passwordEL")
const resultContainer = document.querySelector('.result-container')
const clipboard = document.querySelector('.clipboard')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const lengthEl = document.getElementById('length');
const notification = document.querySelector('.notification')
const warning = document.querySelector('.warning')
const infoWarnig = document.querySelector('.info_warning')

//objet d"element 

const clee = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    caractereSpeciaux: "!@#$%^&*()_+~\\`|}{[]:;?><,./-="
}





// tableau de function

let getKey = [
     
    function getUppercase(){
        return clee.uppercase[(Math.floor(Math.random() * clee.uppercase.length))];
    },

    function getLowercase(){
        return clee.lowercase[(Math.floor(Math.random() * clee.lowercase.length))];
    },

    function getnumber(){
        return clee.numbers[(Math.floor(Math.random() * clee.numbers.length))];
    },

    function symbol(){
        return   clee.caractereSpeciaux[(Math.floor(Math.random() * clee.caractereSpeciaux.length))];
    }
]



function colletct() {
     let upperCheck = uppercaseEl.checked
     let lowerCheck = lowercaseEl.checked
     let numberCheck = numbersEl.checked
     let symbolsCheck = symbolsEl.checked
     const lengthEl = document.getElementById('length');
     let lettersCollect = [];      
     let count =  upperCheck + lowerCheck + numberCheck + symbolsCheck ;
      validation(upperCheck, lowerCheck,numberCheck, symbolsCheck) ;    

      if (count < 1) {
         notifAnim(warning, infoWarnig, "veuilez checked au moins une case")      
         notifNone(warning);
         return ;
      }  


       for (let i = 0; i < lengthEl.value ;) {
         if (upperCheck   && i< lengthEl.value) {
             lettersCollect.push(getKey[0]()) 
             i++; 
  
       }if (lowerCheck && i < lengthEl.value) {            
             lettersCollect.push(getKey[1]())  
             i++;  
   
        }if (numberCheck && i< lengthEl.value){

            lettersCollect.push(getKey[2]())  
            i++; 

        } if (symbolsCheck && i< lengthEl.value){
            lettersCollect.push(getKey[3]())    
              i++;      
       }        
       
       }
       return lettersCollect.join('');

       
}


 generateEl.addEventListener('click', function(){
   let passwordFinal = colletct();
   result.textContent= passwordFinal;
    // result.textContent=colletct()
     copy(passwordFinal);
       
 })


 //function de validation

function validation(upperCheck, lowerCheck,numberCheck,symbolsCheck) {    
    let count =  upperCheck + lowerCheck + numberCheck + symbolsCheck ;
     let len = lengthEl.value
     if (isNaN(len)) {
        
        notifAnim(warning, infoWarnig, "Desolé ce n'est pas un nombre")
     }
     
     if (count > len ) {     
     
        notifAnim(warning, infoWarnig, "Desolé la taille du password est inferieur à la nombre check")
        notifNone(warning);
        
    }
    
   
    
}

// fonction qui permet de faire disparaite un element en 3s

function notifNone(element) {
    setTimeout(() => {
        element.style.transform='translate(100%)'
    }, 3000);
    
}

//evenement qui permet d'afficher le btn copié quand l'on survol
resultContainer.addEventListener('mouseover', ()=>{
        clipboard.classList.add('active')
    
})

//evenement qui permet de cacher le btn quand l'on survol
resultContainer.addEventListener('mouseleave', ()=>{
    clipboard.classList.remove('active')       

})

//function permet de copier un element
function copy(el) {
    clipboard.addEventListener('click', ()=>{
      
                
            return navigator.clipboard.writeText(el)      
   })    
}


//function permet de afficher des notifications
function notifAnim(n, text, content) {
    n.style.transform="translate(0%)"
    text.textContent= content
}

