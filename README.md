准备写一个 别踩白块儿 的游戏。


#Level 1

|黑|白|
|---|---|
|白|黑|
|白|黑|

#Level 2

|白|白|黑|
|---|---|---|
|白|黑|白|
|白|黑|白|
|黑|白|白|

#游戏规则

1. 滑块在不停向下滚动，手指触摸点击滑块。
2. 若点击到黑滑块，黑滑块变绿，游戏继续。
3. 若点击到白滑块，白滑块变红，游戏结束。
4. 若在黑滑块消失之前没有变绿，游戏结束。

#游戏计划
先做CSS3版,然后通过socket.io与手机端通信,通过扫码来玩

使用HTML5的重力感应API

#游戏实现
##CSS3版
###绘出基本的白块黑块图形
###创建对象
