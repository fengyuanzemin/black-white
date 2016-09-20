/**
 * Created by fengyuanzemin on 16/9/16.
 */


const config = {
    container: document.querySelector('.container'),
    num: 0
};


window.onload = () => {
    init();
};


function init() {
    generateBlackWhite();
    getRule();
    roll();
    // setInterval(roll, 3050)
}

// 生成
function generateBlackWhite() {
    // 页面第一次加载的时候
    // const classIndex = ['first', 'second', 'third'];
    const item = [...document.querySelectorAll('.row-item .col-item')];
    // 按顺序排序
    // [...document.querySelectorAll('.row-item')].map((v, i)=> {
    //     v.classList.add(classIndex[i]);
    //     return item;
    // });
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

// 重置
// function changeBlackWhite() {
//     const item = [...document.querySelectorAll('.row-item')];
//     item.map((v) => {
//         if (v.className === 'row-item insert roll') {
//             v.className = 'row-item first';
//         } else if (v.className === 'row-item first roll') {
//             v.className = 'row-item second';
//         } else if (v.className === 'row-item second roll') {
//             v.className = 'row-item third';
//         }
//     });
// }

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
    document.querySelector('.row-item').addEventListener('scroll', (e) => {
        console.log(1)
    });
}

// 滚动
function roll() {
    let firstItem = document.querySelector('.container').firstElementChild;
    let newItem = createRowItem();
    // 开始滚动
    config.num += 1;

    setTimeout(() => {
        config.container.insertBefore(newItem, firstItem);
        [...document.querySelectorAll('.row-item')].map((v)=> {
            if (!v.classList.contains('roll')) {
                // v.style.transform = `translate(0, ${33.3 * config.num}vh)`;
                // v.style.transition = `transform ${3 * config.num}s linear`;
                // // } else {
                v.classList.add('roll');
            }
            return this;
        });
        // config.container.style.transform = `translate(0, ${33.3 * config.num}vh)`;
        // config.container.style.transition = `transform ${3 * config.num}s linear`;

        removeRowItem();
        roll()
    }, 3000);
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
    rowItem.setAttribute('class', 'row-item');
    for (let i = 0; i < 3; i += 1) {
        colItem = document.createElement('div');
        i === random ? colItem.setAttribute('class', 'col-item black')
            : colItem.setAttribute('class', 'col-item white');
        rowItem.appendChild(colItem);
    }

    return rowItem;
}

// 删除下面的元素
function removeRowItem() {
    const lastChild = config.container.lastElementChild;
    config.container.removeChild(lastChild);
}
