/**
 * Created by fengyuanzemin on 16/9/16.
 */


const config = {
    container: document.querySelector('.container'),
    num: 0,
    animate: 10
};


window.onload = () => {
    init();
};


function init() {
    generateBlackWhite();
    getRule();
    // roll();
    setInterval(roll, 1000)
}

// 生成
function generateBlackWhite() {
    // 页面第一次加载的时候
    const classIndex = ['first', 'second', 'third', 'fourth'];
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

// 规则
function getRule() {
    config.container.addEventListener('click', (e) => {
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
        e.stopPropagation();
    });
}

// 滚动
function roll() {
    const rowItem = [...document.querySelectorAll('.row-item')];

    if (config.num % 3 === 0 && config.num !== 0) {
        addRowItem();
        removeRowItem();
        config.num = 0;
    } else {
        config.num += 1;
    }

    rowItem.map((v)=> {
        if (!v.classList.contains('roll')) {
            v.classList.add('roll');
        }
        return this;
    });


}

// 判断.row-item触底
function judgeToBottom() {
    console.log(document.querySelector('.third').getBoundingClientRect().top)
}

// 插入上面的元素
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

// 添加上面的元素
function addRowItem() {
    let firstItem = document.querySelector('.container').firstElementChild;
    let newItem = createRowItem();
    config.container.insertBefore(newItem, firstItem);
    newItem.classList.add('roll');
}

// 删除下面的元素
function removeRowItem() {
    const lastChild = config.container.lastElementChild;
    config.container.removeChild(lastChild);
}
