/**
 * Created by fengyuanzemin on 16/9/16.
 */


const config = {
    container: document.querySelector('.container'),
    num: 0,
    animate: 3,
    start: null
};


window.onload = () => {
    init();
};


function init() {
    generateBlackWhite();
    getClickRule();
    config.start = setInterval(roll, 1000 / 60);
}

// 生成
function generateBlackWhite() {
    const item = [...document.querySelectorAll('.row-item .col-item')];
    // 先将所有的变成白块
    for (let i = 0; i < item.length; i += 1) {
        item[i].classList.add('white');
    }
    // 然后随机变黑块
    for (let i = 0; i < item.length - 3; i += 3) {
        const random = Math.floor(Math.random() * 3);
        item[random + i].classList.remove('white');
        item[random + i].classList.add('black');
    }
}

// 规则
function getClickRule() {
    config.container.addEventListener('click', (e) => {
        const target = e.target;
        switch (target.className) {
            case 'col-item white':
                target.classList.add('red')
                fail();
                break;
            case 'col-item black':
                target.classList.remove('black');
                target.classList.add('white');
                break;
            default:
                fail();
                break;
        }
        e.stopPropagation();
    });
}

// 滚动
function roll() {
    const container = document.querySelector('.container');
    let top = parseInt(window.getComputedStyle(document.querySelector('.container'), null).top);
    if (top + config.animate > 0) {
        top = 0;
    } else {
        top += config.animate;
    }

    container.style.top = top + 'px';
    if (top === 0) {
        addRowItem();
        container.style.top = '-33.5vh';
        removeRowItem();
        judge();
    }
}

// 插入上面的元素
function createRowItem() {
    let colItem;
    const random = Math.floor(Math.random() * 3);
    const rowItem = document.createElement('div');
    rowItem.setAttribute('class', 'row-item');
    for (let i = 0; i < 3; i += 1) {
        colItem = document.createElement('div');
        i === random ? colItem.setAttribute('class', 'col-item black')
            : colItem.setAttribute('class', 'col-item white');
        rowItem.appendChild(colItem);
    }

    return rowItem;
}

// 添加上面的元素
function addRowItem() {
    let firstItem = document.querySelector('.container').firstElementChild;
    let newItem = createRowItem();
    config.container.insertBefore(newItem, firstItem);
}

// 删除下面的元素
function removeRowItem() {
    const lastChild = config.container.lastElementChild;
    config.container.removeChild(lastChild);
}

// 游戏失败
function fail() {
    clearInterval(config.start);
    console.log('game over');
}

// 判断黑块是否触底
function judge() {
    const row = [...document.querySelectorAll('.row-item')];
    const last = row[row.length - 1].childNodes;
    last.forEach((v)=> {
        if (v.nodeType === 1 && v.classList.contains('black')) {
            fail();
        }
    });
}