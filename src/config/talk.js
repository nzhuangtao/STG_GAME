const RUMIA = "露米娅";
const MARISA = '魔理沙';
const REIMU = '灵梦';
const MOKOU = '藤原妹红';

const RUMIA_STAND = 'rumia_stand',
    MARISA_STAND = 'marisa_stand',
    REIMU_STAND = 'reimu_stand',
    MOKOU_STAND = 'mokou_stand';
const TALK_CONFIG = {
    0: {
        startTalk: [
            {
                name: RUMIA,
                message: '你能让我吃了你吗',
                image_stand: RUMIA_STAND,
            },
            {
                name: REIMU,
                message: "不好!",
                image_stand: REIMU_STAND,
            }
        ],
        endTalk: [
            {
                name: RUMIA,
                message: '好饿',
                image_stand: RUMIA_STAND,
            },
            {
                name: MARISA,
                message: "好险好险，差点被吃了",
                image_stand: REIMU_STAND,
            }
        ]
    },
    1: {
        startTalk: [
            {
                name: RUMIA,
                message: '你能让我吃了你吗',
                image_stand: RUMIA_STAND,
            },
            {
                name: MARISA,
                message: "原来是你小子",
                image_stand: MARISA_STAND,
            },
            {
                name: MARISA,
                message: "接招吧",
                image_stand: MARISA_STAND,
            },
        ],
        endTalk: [
            {
                name: MARISA,
                message: "知道厉害了吧",
                image_stand: MARISA_STAND,
            },
            {
                name: RUMIA,
                message: '好饿呀',
                image_stand: RUMIA_STAND,
            },
        ]
    }
}
export default TALK_CONFIG;