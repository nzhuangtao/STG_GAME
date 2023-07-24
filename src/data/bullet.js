let bullet_type = {};
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 16; j++) {
        bullet_type[(i*16) + j] = {
            indexX: j,
            indexY: i,
            width: 16,
            height: 16,
        };
    }
}

export default function getBulletType(index) {
    return bullet_type[index];
};