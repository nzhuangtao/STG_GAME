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
export default function getEnemyType(index){
    return enemy_type[index];
}
