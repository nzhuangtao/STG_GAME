let enemyList = [];
for (let i = 0; i < 6; i++) {
    let enemy = {
        index: i,
        count: i * 40,
        x: (i + 1) * 50,
        y: 0,
        type: 2,
        moveType: 1,
        angle: 90,
        speed: 150,
    };
    enemyList.push(enemy)
};
for (let i = 0; i < 6; i++) {
    let enemy = {
        index: i,
        count: 150 + i * 50,
        x: 480 - (i + 1) * 50,
        y: 0,
        type: 3,
        moveType: 2,
        angle: 90,
        speed: 150,
    };
    enemyList.push(enemy)
};
for (let i = 0; i < 6; i++) {
    let enemy = {
        index: i,
        count: 300 + i * 20,
        x: (i + 1) * 50,
        y: 0,
        type: 2,
        moveType: 1,
        angle: 90,
        speed: 150,
    };
    enemyList.push(enemy)
};
for (let i = 0; i < 6; i++) {
    let enemy = {
        index: i,
        count: 300 + i * 20,
        x: (i + 1) * 50,
        y: 0,
        type: 2,
        moveType: 1,
        angle: 90,
        speed: 150,
    };
    enemyList.push(enemy)
};
export default enemyList;