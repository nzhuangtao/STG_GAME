const BOSS_CONFIG = {
    1: {
        name: '露米娅',
        image: 'rumia',
        imageStand: "rumia_stand",
        normal: {
            indexX: 0,
            indexY: 0,
            num: 4,
            width: 128,
            height: 128,
        },
        left: {
            indexX: 2,
            indexY: 0,
            num: 2,
            width: 128,
            height: 128,
        },
        right: {
            indexX: 2,
            indexY: 2,
            num: 2,
            width: 128,
            height: 128,
        },
        attack: {
            1: {
                indexX: 3,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            },
            2: {
                indexX: 4,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            },
            3: {
                indexX: 5,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            }
        },
        cards: [
            {
                name: "月符 月亮光",
            },
            {
                name: "夜符 夜雀"
            },
            {
                name: "暗符 境界线"
            }
        ]
    },
    2: {
        name: '妹红',
        image: 'mokou',
        imageStand: "mokou_stand",
        normal: {
            indexX: 0,
            indexY: 0,
            num: 3,
            width: 128,
            height: 128,
        },
        left: {
            indexX: 2,
            indexY: 0,
            num: 2,
            width: 128,
            height: 128,
        },
        right: {
            indexX: 2,
            indexY: 2,
            num: 2,
            width: 128,
            height: 128,
        },
        attack: {
            1: {
                indexX: 3,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            },
            2: {
                indexX: 4,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            },
            3: {
                indexX: 5,
                indexY: 0,
                num: 3,
                width: 128,
                height: 128,
            }
        },
        cards: [
            {
                name: "时效 月岩笠的诅咒",
            },
            {
                name: "不死 火鸟 -凤翼天翔"
            },
            {
                name: "蓬莱人形"
            }
        ]
    }
}
export default BOSS_CONFIG;