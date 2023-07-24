let bullet_type = {};
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 16; j++) {
        bullet_type[(i * 16) + j] = {
            indexX: j,
            indexY: i,
            width: 16,
            height: 16,
        };
    }
}
let beam = {};
for (let j = 0; j < 7; j++) {
    beam[j] = {
        indexX: j,
        indexY: 0,
        width: 16,
        height: 256,
        type:'beam',
        image:'beam'
    };
}
export default function getBulletType(index) {
    return bullet_type[index];
};
export function getBeam(index){
    return beam[index]
}