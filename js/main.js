const registerForm = document.querySelector('#registerForm');
const sectionPacients = document.querySelector('#pacientList');
let id = 13;

function printPacients(pPacientList, pDom) {
    pDom.innerHTML = "";
    if (pPacientList.length !== 0) {
        pPacientList.forEach(pacient => printOnePacient(pacient, pDom));
    } else {
        pDom.innerHTML = `<article class="card p-2">
                    <h3>No existen pacientes que cumplan con los requisitos de la búsqueda realizada</h3>
                    </article> `
    }
}


function printOnePacient(pPacient, pDom) {
    //para crear los elementos
    let article = document.createElement('article');
    article.classList.add('card', 'p-2', 'mb-3');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    let p5 = document.createElement('p');
    //para crear los contenidos
    p1.innerText = 'Nombre: ' + pPacient.name;
    p2.innerText = 'Apellido: ' + pPacient.lastname;
    p3.innerText = 'Edad: ' + pPacient.age;
    p4.innerText = 'Diagnóstico: ' + pPacient.diagnostic;
    p5.innerText = 'Número de Seguridad Social: ' + pPacient.secure;

    //para colocar los elementos creados con sus texto dentro del article
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    article.appendChild(p4);
    article.appendChild(p5);

    //para colocar el article dentro del pDom donde tiene que ir
    pDom.appendChild(article);

}

printPacients(pacients, sectionPacients)

//para capturar boton e inputs

const inputAgeMin = document.querySelector('#ageMin');
const inputAgeMax = document.querySelector('#ageMax');
const btnAge = document.querySelector('#btnAge');

btnAge.addEventListener('click', getMaxMinAge)

function getMaxMinAge() {
    //para recoger los datos de los inputs
    let max = inputAgeMax.value;
    let min = inputAgeMin.value;

    if (max !== "" && min !== "") {
        //para filtrar
        let filterPacient = filterByAge(pacients, Number(min), Number(max))

        //para pintar
        printPacients(filterPacient, sectionPacients);
    } else {
        printPacients(pacients, sectionPacients)
    }
    inputAgeMax.value = "";
    inputAgeMin.value = "";

}

function filterByAge(pPacientList, pMin, pMax) {
    return pPacientList.filter(pacient => pacient.age >= pMin && pacient.age <= pMax);
}


//para saber qué diagnósticos hay
const allDiagnostics = pacients.map(item => item.diagnostic)

//para remover diagnósticos duplicados
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

const diagnostics = allDiagnostics.filter(onlyUnique);

//seleccionar diagnósticos
var select = document.getElementById("selectDiagnostic");

for(var i = 0; i < diagnostics.length; i++) {
    var diag = diagnostics[i];
    var el = document.createElement("option");
    el.textContent = diag;
    el.value = diag;
    select.appendChild(el);
}

// filtrar por enfermedad

const inputDiagnostic = document.querySelector('#selectDiagnostic');
const btnDiagnostic = document.querySelector('#btnDiagnostic');

btnDiagnostic.addEventListener('click', getDiagnostics)

function getDiagnostics() {
        //pararecoger los datos de los input
    let wantedDiagnostic = inputDiagnostic.value;

    if (wantedDiagnostic !== "") {
        //para filtrar
        let filterPacient = filterByDiagnostic(pacients, String(wantedDiagnostic))

        //para pintar
        printPacients(filterPacient, sectionPacients);
    } else {
        printPacients(pacients, sectionPacients)
    }
    inputDiagnostic.value = "";
}

function filterByDiagnostic(pPacientList, pDiag) {
    return pPacientList.filter(pacient => pacient.diagnostic == pDiag);
}


// filtrar por palabra clave

//capturamos boton e input

const inputKeyWord = document.querySelector('#keyWord');
const btnKeyWord = document.querySelector('#btnKeyWord');

btnKeyWord.addEventListener('click', getKeyWord)

function getKeyWord() {
    //pararecoger los datos de los input
    let keyWord = inputKeyWord.value.toLowerCase();

    if (keyWord !== "") {
        //para filtrar
        let filterPacient = filterByKeyWord(pacients, String(keyWord))

        //para pintar
        printPacients(filterPacient, sectionPacients);
    } else {
        printPacients(pacients, sectionPacients)
    }
    inputKeyWord.value = "";
}

function filterByKeyWord(pPacientList, pWord) {
    return pPacientList.filter(pacient => pacient.name.toLowerCase().includes(pWord) || pacient.lastname.toLowerCase().includes(pWord) || pacient.secure.toLowerCase().includes(pWord));
}