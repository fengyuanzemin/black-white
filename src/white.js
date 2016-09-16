/**
 * Created by fengyuanzemin on 16/9/16.
 */


const container = document.querySelector('.container');


window.onload = ()=> {
    init();
};

function generateBlackWhite() {
    // 给row-item下面的随机一个col-item赋值
    const item = [...document.querySelectorAll('.row-item .col-item')];
    for(let i =0 ;i<item.length;i+=1){
        item[i].classList.add('white');
    }
    for (let i = 0; i < item.length; i += 3) {
        const random = Math.floor(Math.random() * 3);
        item[random + i].classList.remove('white');
        item[random + i].classList.add('black');
    }
}


function init() {
    generateBlackWhite();
}