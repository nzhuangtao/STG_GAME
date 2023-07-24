let enemyList = [];
for (let i = 0; i < 3; i++) {
    let enemy = {
        index: i,
        count: i * 20,
        x: 0 + (i + 1) * 50,
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
        count: 200+i * 20,
        x: 0 + (i + 1) * 50,
        y: 0,
        type: 2,
        moveType: 1,
        angle: 90,
        speed: 150,
    };
    enemyList.push(enemy)
};
export default enemyList;