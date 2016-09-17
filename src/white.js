/**
 * Created by fengyuanzemin on 16/9/16.
 */


const CONFIG = {
    container: document.querySelector('.container')
};


window.onload = () => {
    init();
};


function init() {
    generateBlackWhite();
    getRule();
    roll();
    setInterval(roll, 4000);

}


function generateBlackWhite() {
    // 页面第一次加载的时候
    const classIndex = ['first', 'second', 'third'];
    const item = [...document.querySelectorAll('.row-item .col-item')];
    // 按顺序排序
    [...document.querySelectorAll('.row-item')].map((v, i)=> {
        v.classList.add(classIndex[i]);
        return item;
    });
    // 先将所有的变成白块
    for (let i = 0; i < item.length; i += 1) {
        item[i].classList.add('white');
    }
    // 然后随机变黑块
    for (let i = 0; i < item.length; i += 3) {
        const random = Math.floor(Math.random() * 3);
        item[random + i].classList.remove('white');
        item[random + i].classList.add('black');
    }
}

function changeBlackWhite() {
    const item = [...document.querySelectorAll('.row-item')];
    item.map((v) => {
        if (v.className === 'row-item insert roll') {
            v.className = 'row-item first';
        } else if (v.className === 'row-item first roll') {
            v.className = 'row-item second';
        } else if (v.className === 'row-item second roll') {
            v.className = 'row-item third';
        }
    });
}


function getRule() {
    CONFIG.container.addEventListener('click', (e) => {
        const target = e.target;
        switch (target.className) {
            case 'col-item white':
                console.log('game over');
                break;
            case 'col-item black':
                target.classList.remove('black');
                target.classList.add('white');
                break;
            default:
                break;
        }
    });

}


function roll() {
    const firstItem = document.querySelector('.row-item');
    const newItem = createRowItem();
    const promise = new Promise((resolve) => {
        // 添加节点
        CONFIG.container.insertBefore(newItem, firstItem);
        resolve();
    });
    promise.then(()=> {
        // 开始滚动
        [...document.querySelectorAll('.row-item')].map((v)=> {
            if (!v.classList.contains('roll')) {
                v.classList.add('roll');
            }
            return this;
        });
        // 异步删除节点,并重新生成class
        setTimeout(()=> {
            removeRowItem();
            changeBlackWhite();
        }, 3000);
    });
}

function createRowItem() {
    let colItem;
    const random = Math.floor(Math.random() * 3);
    const rowItem = document.createElement('div');
    rowItem.setAttribute('class', 'row-item insert');
    for (let i = 0; i < 3; i += 1) {
        colItem = document.createElement('div');
        i === random ? colItem.setAttribute('class', 'col-item black')
            : colItem.setAttribute('class', 'col-item white');
        rowItem.appendChild(colItem);
    }
    return rowItem;
}


function removeRowItem() {
    const lastChild = CONFIG.container.lastElementChild;
    CONFIG.container.removeChild(lastChild);
}
