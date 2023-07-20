class Input {
    BUTTON_LEFT = 0x01;
    BUTTON_RIGHT = 0x04;
    BUTTON_Z = 0x10;
    BUTTON_X = 0x20;
    BUTTON_DOWN = 0x08;
    BUTTON_UP = 0x02;
    constructor() {
        this.keyflag = null;
        this.before_keyflag = null;
    }
    handleKeyDown(e) {

        this.keyflag |= this._keyCodeToBitCode(e.keyCode);
        e.preventDefault();
    }
    handleKeyUp(e) {
        this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
        e.preventDefault();
    }
    _keyCodeToBitCode(keyCode) {
        let flag;
        switch (keyCode) {
            case 37:
                flag = this.BUTTON_LEFT;
                break;
            case 38:
                flag = this.BUTTON_UP;
                break;
            case 39:
                flag = this.BUTTON_RIGHT;
                break;
            case 40:
                flag = this.BUTTON_DOWN;
                break;
            case 88:
                flag = this.BUTTON_X;
                break;
            case 90:
                flag = this.BUTTON_Z;
                break;
            default:
                break;
        };
        return flag;
    }
    bindKey() {
        let self = this;
        window.addEventListener('keydown', function (e) {
            self.handleKeyDown(e);
        });
        window.addEventListener('keyup', function (e) {
            self.handleKeyUp(e);
        })
    }
    saveBeforeKey() {
        this.before_keyflag = this.keyflag;
        this.keyflag = 0x0;
    }
    iskeyPush(flag) {
        return !(this.before_keyflag & flag) && this.keyflag & flag;
    }
    iskeyDown(flag) {
        return this.keyflag & flag;
    }
}
export default Input;