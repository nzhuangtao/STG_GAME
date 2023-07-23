
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
        startTalk: [
            {
                name: "露米娅",
                image: "rumia_stand",
                message: "你是谁?"
            },
            {
                name: "灵梦",
                image: 'reimu_stand',
                message: '看来你就是罪魁祸首',
            },
            {
                name: '露米娅',
                image: "rumia_stand",
                message: "能让我吃了你吗"
            },
            {
                name: "灵梦",
                image: "reimu_stand",
                message: "看招"
            }
        ],
        endTalk: [
            {
                name: "露米娅",
                image: "rumia_stand",
                message: "好饿啊"
            },
            {
                name: "灵梦",
                image: "reimu_stand",
                message: "好险好险"
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
        startTalk: [

        ],
        endTalk: [

        ]
    }
}
export default BOSS_CONFIG;