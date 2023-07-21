let boss_params = {
    0: {
        name: '魔理沙',
        image: 'marisa',
        width: 128,
        height: 128,
        normal: {
            indexX: 0,
            indexY: 0,
            num: 2,
        },
        startTalk: [
            {
                message: "hello",
                name: "魔理沙",
                image: 'marisa_stand',
            },
            {
                message: "魔理沙你又在乱逛",
                name: "reimu",
                image: 'reimu_stand',
            },
        ],
        endTalk: [
            {
                message: "no",
                name: "魔理沙",
                image: 'marisa_stand',
            }
        ]
    }
}
export default boss_params;