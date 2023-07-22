let enemy_list = [];
for (let i = 0; i < 6; i++) {
    let enemy = {
        index: i,
        count: i * 20,
        x: 0 + (i + 1) * 50,
        y: 0,
        type: 1,
        moveType: 1,
        angle: 90,
        speed: 200,
        bullets: [
            { moveType: 3, step: 50, count: 10, type: 15, shotType: 1, speed: 300, angle: 90, num: 10 },
        ]
    };
    enemy_list.push(enemy)
};

// for (let i = 0; i < 8; i++) {
//     let enemy = {
//         index: i,
//         count: 200 + i * 20,
//         x: 0 + (i + 1) * 50,
//         y: 0,
//         type: 1,
//         moveType: 3,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };
// for (let i = 0; i < 5; i++) {
//     let enemy = {
//         index: i,
//         count: 500 + i * 20,
//         x: 480 - (i + 1) * 30,
//         y: 0,
//         type: 2,
//         moveType: 4,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };
// for (let i = 0; i < 8; i++) {
//     let enemy = {
//         index: i,
//         count: 600 + i * 20,
//         x: 0 + (i + 1) * 50,
//         y: 0,
//         type: 1,
//         moveType: 5,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };
// for (let i = 0; i < 8; i++) {
//     let enemy = {
//         index: i,
//         count: 800 + i * 20,
//         x: (i + 1) * 50,
//         y: 0,
//         type: 1,
//         moveType: 5,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };
// for (let i = 0; i < 8; i++) {
//     let enemy = {
//         index: i,
//         count: 800 + i * 20,
//         x: 0 + (i + 1) * 30,
//         y: 0,
//         type: 1,
//         moveType: 6,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };
// for (let i = 0; i < 8; i++) {
//     let enemy = {
//         index: i,
//         count: 800 + i * 20,
//         x: 0 + (i + 1) * 30,
//         y: 0,
//         type: 3,
//         moveType: 6,
//         angle: 90,
//         speed: 200,
//     };
//     enemy_list.push(enemy)
// };

let enemy_type = {
    1: {
        indexX: 0,
        indexY: 0,
        width: 32,
        height: 32,
        num: 3,
    },
    2: {
        indexX: 0,
        indexY: 1,
        width: 48,
        height: 42,
        num: 3,
    },
    3: {
        indexX: 0,
        indexY: 2,
        width: 48,
        height: 42,
        num: 3,
    },
    4: {
        indexX: 0,
        indexY: 3,
        width: 48,
        height: 42,
        num: 3,
    },
    5: {
        indexX: 0,
        indexY: 4,
        width: 48,
        height: 42,
        num: 3,
    },
    6: {
        indexX: 0,
        indexY: 5,
        width: 64,
        height: 48,
        num: 3,
    },
    7: {
        indexX: 0,
        indexY: 6,
        width: 64,
        height: 48,
        num: 3,
    }
}
export {
    enemy_list,
    enemy_type
}