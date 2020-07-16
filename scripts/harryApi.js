'use strict';

const API_Key = "$2a$10$vWOXkTdKcX54yPWkpx2aCOSQcmAFUlVk2QarF9ruUP2X0Ag35OMS.";

const houses = {
    Gryffindor: "Bravery, daring, nerve, and chivalry",
    Ravenclaw: "Wit, intelligence, and knowledge",
    Slytherin: "Ambition, cunning and resourcefulness",
    Hufflepuff: "Hard work, dedication, patience, loyalty, and fair play"
};

/******* sorting hat */

/******** getting school */
let section = document.getElementById('section-ghost');
let hat = document.querySelector('.hat');

function newLi() {
    return document.createElement('li');
}

hat.addEventListener('click', function getSchool() {
    section.innerHTML = '';
    fetch(`https://www.potterapi.com/v1/sortingHat`)
        .then(response => {
            return response.json();
        })
        .then((school) => {

            section.classList.add('results');
            const divTitle = document.createElement('div');
            divTitle.classList.add('main-title', 'results-title');
            divTitle.innerHTML = `<h2>${school}</h2>`;

            section.appendChild(divTitle);

            const divValues = document.createElement('div');
            divValues.classList.add('info-author', 'values');
            for (const i in houses) {
                if (school === i) {
                    divValues.innerHTML = `<p>${houses[i]}</p>`;
                }
            }
            section.appendChild(divValues);


            return school;
        })
        .then((school) => {
            let schoolTmp = school;
            fetch(`https://hp-api.herokuapp.com/api/characters`)
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    const divContainer = document.createElement('div');
                    divContainer.classList.add('card-container');



                    for (let i = 0; i < data.length; i++) {
                        if (data[i].house === schoolTmp) {
                            //data[i].name  
                            //imgCh.src = data[i].image;
                            //li1.innerHTML = `Name: ${data[i].name}`;
                            //li2.innerHTML = `Species: ${data[i].species}`;
                            let image = data[i].image;
                            let name = data[i].name;
                            let species = data[i].species;
                            const divCard = document.createElement('div');
                            divCard.classList.add('result-card');
                            divContainer.appendChild(divCard);
                            const divImg = document.createElement('div');
                            divImg.classList.add('img-result');
                            const imgCh = document.createElement('img');
                            divCard.appendChild(divImg);
                            divImg.appendChild(imgCh);
                            const divContent = document.createElement('div');
                            divContent.classList.add('result-info');
                            const ulList = document.createElement('ul');
                            ulList.classList.add('result-info-list');
                            divContent.appendChild(ulList);
                            divContainer.appendChild(divContent);
                            const li1 = document.createElement('li');
                            const li2 = document.createElement('li');
                            const li3 = document.createElement('li');
                            const li4 = document.createElement('li');
                            const li5 = document.createElement('li');
                            li1.classList.add('newli');
                            li2.classList.add('newli');
                            li3.classList.add('newli');
                            li4.classList.add('newli');
                            li5.classList.add('newli');

                            ulList.appendChild(li1);
                            ulList.appendChild(li2);
                            ulList.appendChild(li3);
                            ulList.appendChild(li4);
                            ulList.appendChild(li5);
                            imgCh.src = data[i].image;
                            li1.innerHTML = `Name: ${data[i].name}`;
                            li2.innerHTML = `Species: ${data[i].species}`;

                            (data[i].ancestry) ? li3.innerHTML = `Ancestry: ${data[i].ancestry}` : li3.style.display = "none";



                            (data[i].patronus) ? li5.innerHTML = `Patronus: ${data[i].patronus}` : li5.style.display = 'none';
                            if (data[i].wand.wood) {
                                li4.innerHTML = `Wand: ${data[i].wand.wood} ${data[i].wand.core}`;
                            } else {
                                li4.style.display = 'none';
                            }


                            divCard.onmouseover = () => {
                                divContent.classList.add('result-info-hover');
                            };
                            divCard.onmouseout = () => {
                                divContent.classList.remove('result-info-hover');
                            };
                            console.log(image);
                        }
                        //imgCh.src = `${image}`;

                        //li2.innerHTML = `Species: ${species}`;

                    }

                    section.appendChild(divContainer);
                });
        });
});
