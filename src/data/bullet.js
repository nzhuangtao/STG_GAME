let bullet_type = {};
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        bullet_type[i+j] = {
            indexX:j,
            indexY:i,
            width:16,
            height:16,
        };
    }
}

export default bullet_type;