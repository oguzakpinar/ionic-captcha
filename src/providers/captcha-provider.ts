import { Injectable } from '@angular/core';

enum Operants {
    PLUS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAjCAQAAADRPYmtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAADUSURBVDjL7ZExDgFBFIa/3eyKgmyWRCQKiXoP4Aa0SkdwBbfQOoXKIRQOQFQKConYLArMaJ5Z2V1ClPYvZv6Zee/9/3sDOf4dVurco4vNhhG796kuEzSaE+3kk/1CR6VfbD5GMlSjDUvAkbUiSS5FsVGlLjERUeysz1CSLBqUAMWas4TOGRA+qgYEKWNNwwuUCb9qyxGJmTHQwgMUS47GQPgs5+Hj41NjikYT0ZEbXxqVWoqDUbkIC9m/n6uVwX7/LVCy37InEOPKmBU2Wxaf6+VI4Q6yKSqvo2uFaAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNC0yNVQxNDozOToyMyswMjowMHKaTnwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDQtMjVUMTQ6Mzk6MjMrMDI6MDADx/bAAAAAAElFTkSuQmCC',
    MINUS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAjCAQAAADRPYmtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAABhSURBVDjLY2AYBaNgWAJGKCnAwI5TzW+G9wz/GBhYGBgYGBiUGWYzSOBU+pkhh+EUjGPL8I3hPx4YxsDAwMBEvFshDnjCsB+vA24jvMXAwM3AhlPpH4YvDP/pE8qjYHADAGO6HBBVK62mAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA0LTI1VDE0OjM4OjM2KzAyOjAwA8oKewAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNC0yNVQxNDozODozNiswMjowMHKXsscAAAAASUVORK5CYII='
}

const numbers = {
    0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAARhJREFUKJGtk61OQ0EQRs9cc0PqaiAVhARXAeIqNBKBLq+A5hEwGHQVz8ADVEKKwyBICAQIhoSmCaQp6kPM3d3716SCVTNzZme+nd01sWplwXg5NjOzg9vEJEk6r2QfekiOnmqVLipo1OiSS5JMgDUVKMi4c38wXT4Wbp4EGe6eSpIm7jx7r+uqVO1FlYRNHwqaQ6KpFBGnEt04jfZqoz4Asy60BcADZHw30D4A95Ax72z0mgrmMThYLWOZUA+A34hmAGxCVoqlgba7Cr4DsAP/NagqGgJwVQZ+EpMWbiyq1zUuX1QekiTtJhtJU3eHb/o6cnO0xmPjs0HGfkDvW9un2rlURNAPd2vpf13ezHvF2Ub0bY2v115/oB2ZFXBy6noAAAAASUVORK5CYII=',
    1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAjBAMAAABm2DcrAAAACGFjVEwAAAABAAAAALQt6aAAAAAbUExURf///729vQAAABISEvv7+zg4OLGxsSMjI/b29m9u+7EAAAAaZmNUTAAAAAAAAAAUAAAAIwAAAAAAAAAAAAAD6AEAy1y6vgAAADJJREFUGJVjYEADjEpKClAmM4LphGAqwZmscCabEpRZrKQEYyqRwOwAAiVsVgw/JjoAAD9ZFeeE4+YFAAAAAElFTkSuQmCC',
    2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAjCAAAAABEY/50AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAZAAAAIwAAAAAAAAAAAAAD6AEA/HcqgQAAAP9JREFUKJGVk6FOA0EQhr+7HGlNzeGoxKMQvEMbPKYSg+RpUFgMDougb0BCEAg0ISEkJSEVTX7E7OzNlm0Iv9nb/Wb/mZ3JNWKHWv/Y3B7vj6fzlwFJknQWgpd2ZKT0OcrkeztF7+R39oWRixzax+zkK48x41MgN1bR2nanEloAMFPSldshM3918jGQ+GBJX77P3XE9WJnQQV+QcwDm0cZ0ks2bsgObvUTCFACYJrACugiatN5NinIH2/swH0nvGaxUkMsMPLQrSoLB02pzcBDfIOl528jzpJEwKrvRwthAv6aU3mpWktAhNUl8VgFSe10nQN0MidEu0vz9//yD/ADXbPbb04aQOgAAAABJRU5ErkJggg==',
    3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAjCAAAAABEY/50AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAZAAAAIwAAAAAAAAAAAAAD6AEA/HcqgQAAARNJREFUKJF1krFKA0EQhr8NgQQhKCltz8pa0Cr4BOmtLS3TCb6ApWCRN/AVUthY5QVMHRC1EEErT6L8Fje3O7sXp5rZ//abf24niH+in9Kf99+dPSepieu2HizsxBSPuXDKomiRlLL5uFXKK3BjSlOdSFKdeEgzAA7lvUgKIjS5fT38tqpXtjh1DrOJNXa0PCK7pF0CUHmKdDab4AZwtJB6wxZvUN3nnvzfuypozYyR52i1pDvL3zKaZ1bxTVNY+42Cjj6Ar+fC/PK4z+tL1zh80uMAgIdC2QUVc03bMr5Cnc8rxXmGTwDGZg5I8y0GbHf2O8Jtu4mD7g3rU08zYZW5jXt6vrET9wqPa0aTdLOzOzH+AAqg/7XZCSs+AAAAAElFTkSuQmCC',
    4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAAL9JREFUKJG9kz0OwjAMRp8LEuxsSExsHIKFlaNwAS7DCVi4C0LiAEgsLKhDO1Tp0JLaibsghKfYL/r8OT8SGIupTcs30Ky6JOg46ZoYQekRAIUmC6uu5I62ptA92a56yYCSXvtssI/cOqtFBMDVQwBsgmNjXnftJbdRAzwcG6+4ygQFYFbF2QbBA8Cycua6acPWPABnD+0AtsFBT3NcGhUNANIHMSvtLdv4ObKPzTv5v9j4DiX/6zIB+kuV8V/ZAu3hw9AE+kcNAAAAAElFTkSuQmCC',
    5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAASpJREFUKJF1kzFKBDEUhr8MI7HYQqZRtJJtRDu9gjewmt5reIG9wTaCpbCgLngBYQsLQQQ9gDYi7FrYjAzyW2SSycxkX5W8P////veSGLEucgAeN3rpYwBJehswakkZwE1aUZKKJMsIMEMohyyt9UcMLRSFBVrBOu8xM+AV8B32oGuAcdJ8ATCVns6s3S0rXw/JTfG99oeLBgoOv8MYV2blBefDKstGsEy03EDNzi6l6iKqF6DS1Z61NCNOc8DeeS0365+RU+2EO3AZmQ9hAbhPXco5AM8paNMvcva2gN/Fts/cAnAENGUnPRtTCY3b/iXpM2zRlVs/dEh0BjWJkUMHDV+huzKj1DMUuL4Gn6XCQ8Gl59iO6TD4k9CgadVePr52DvZbsln/K/8BCfvXznECI38AAAAASUVORK5CYII=',
    6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAARRJREFUKJF1k6FOA0EQhv/ZNFmD4UgQR1JTh8BUU1OBQqH6DEieoLaij4BAVPEUVTVU1aNqCcklGMSP2NndmS4dczvz7e38MzsrxDkbmfX+E9f3xmey3xKIBw0pWtmTDhbNfJauopdTBRVpYLHb6u/TjJI/sXI+FDmp7wCAWUK9JSRijBEkhZCEmm6ErLdtVMB3Uge8XYmI3HzVElLeLW99wST40KZ6VjT5J5eiWALdvLfMIJqeLS160uR92QezJkkOxQ0Y+0IvTMmPbR8ymgMAYova9hY3tLvrgWp7/W4qI9dOfXLu3AC4bhwVDU2aV6YByKKMscjQO8vWuRlz1+WfA7nUfizK1Im5+eEnXJr3Judf5R8uZPm14iwSMwAAAABJRU5ErkJggg==',
    7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAANhJREFUKJGt0ytOREEQheGvyST4kVgcFsMC0CQwajS7YQcINkDCAjA4dkDG4EhIJhgsgqQQ99XNrWsIZTpdf6fq1KNLWLIVD5l/QwklQ8HBYrz/RyseG8f9HWwhWnsHm4iI3wisI0FbU6QWXVQkStPDAodfifgn8Dpcq3Af4HZUVKF1+7ZC1+AoQ12ClwR9guNI0Bl4ntBUVzfsqsyxrvP5VFoRk74qV4d2CXqb9WZEJ7N4McjYgctaRY++u+MqUXgzTzXkOk1Q341+75uR/3l7YZ+gsvwrfwDcNk9IFhB0BAAAAABJRU5ErkJggg==',
    8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAAaAAAAIwAAAAAAAAAAAAAD6AEAXyGsKAAAAShJREFUKJGNk69LBFEUhb8ZxMFimLjYbPsH6CarYcFismwxGs0G6wbDgnX/Aotxq7BgWdMiGLQtiCAuLCzIhGO4b2bu/AJfevd9zD3nnvcmEl1rp9yuX344OHZMti7Lk1k4CqjSaerQsC5TooaDRY6CTnq3mF+5z5Ayq75MweCFoUcA7iXvyNC1H8KhGHa74pBWLV/1g0MABoFsAZgHNAHgXJL0CUBSjNzrTkPjCuhZ67jN2ruLpL7eQsNNqPvTZZFhMJ9Y9SBJyhIflO0/qkE9S2jp/KqYMpHQLQDDAhX5xsHpUXOEfK6nlvE0q2mdlVqh93dVauQQKyMjq7buAQCn45vDQseST5sONv+5r0kFnLg3LykbhPP0Nbcaucta/7K/V5ZR91/5B48TTVOFbf/RAAAAAElFTkSuQmCC',
    9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAAAAACvVEV3AAAABGdBTUEAAYagMeiWXwAAAAJiS0dEAP+Hj8y/AAAB/ElEQVQoz2P4jxMwwBj/Pl3ft3X78Uc/MKTu97rI8HFyCalFLH+HIvVzqT4zAxRweJ9Ekvrexs+ABFS3w6X+TedhQAFa52BSJ+TAAowiepq8ELngDxCpn0lgLlvcsRdPt3kwgdhcKyBS56XAetI/gUx5FgBW5/cFLDWZEcTRuAlx1ykZEE/sFEjqTwJYXdZfiNSvOLAZE0FSn11BbOZZsECYADYk9hdQ6r0V2BErYVILWUB8i3cgKWsQkwmuaypYl8IdoNRXL7Bd+f8gMn+zwVyR00Cpf3lgtv4DiNQ9HTCXby/I8cvZwO6o+gmS+VoA9jMD11aQ1BMDMIen5MqHt6fSOBmQpP5PYgXzmGQsTMQYoSHMtQ0s9TYcOdhFREAk/wFIfD2KYIXLCHdbgijxi9BYftujAbGdSXfFHXUQQ/MJLG38uzM1ytrEJnzyvf8nBUFSnl8QKer/r3ev3v0C0nPAqaQMHClfHoPAR5iKWHDaWQ+W2qWtqqamXPYbInVBFiSl+wQsdUEcnIyuQ5JdLtg5lZAE8MkNzEt4C5KZxgdiK16EpqhZ4EBkDdxwYVcmOEEyN/+FSr32gKZbES5IOHm9gKfek1ooKdTqClKaP2zJBJdgC7iGklMeNmhDYoPHctpbtEz099Gmttz0/J5dr/5hZD1QQP77h8T7DwAWOuTzyK2SYgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNC0yNlQxMzoyNzo0MyswMjowMD8JGiIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDQtMjZUMTM6Mjc6NDMrMDI6MDBOVKKeAAAAAElFTkSuQmCC'
}

@Injectable()
export class CaptchaProvider {
    public result;
    private imageArray = [];
    constructor() {
    }

    public generateCaptcha(useMinus: boolean, negativeAllowed: boolean, minNumLength: number, maxNumLength: number) {
        this.imageArray = [];
        let maxNum = maxNumLength
        let firstNum = this.getNum(minNumLength, maxNum);
        let firstLength = this.imageArray.length;
        let operation = Operants.PLUS;
        if (useMinus) {
            operation = this.getRandom() % 2 === 0 ? Operants.PLUS : Operants.MINUS;
        }
        this.imageArray.push(operation);
        if (operation === Operants.MINUS && !negativeAllowed) {
            maxNum = firstLength;
        }
        let secondNum = this.getNum(minNumLength, maxNum);
        if (operation === Operants.PLUS) {
            this.result = firstNum + secondNum;
        } else {
            this.result = firstNum - secondNum;
        }
        if (!negativeAllowed && this.result < 0) {
            return this.generateCaptcha(useMinus, negativeAllowed, minNumLength, maxNumLength);
        } else {
            return this.imageArray;
        }
    }

    private getNum(minNumLength: number, maxNumLength: number) {
        let range = maxNumLength - minNumLength + 1;
        let numbCnt = this.getRandom() % range;
        numbCnt = numbCnt + minNumLength;
        let resultNum = 0;
        let first = true;
        for (let i = numbCnt; i > 0; i--) {
            let calc = first ? (this.getRandom() % 9 + 1) : this.getRandom() % 10;
            this.imageArray.push(numbers[calc]);
            let num = this.over(calc, i-1);
            resultNum = resultNum + num;
            first = false;
        }
        return resultNum;
    }

    private over(num, over) {
        let val = 1;
        for (let i = 0; i < over; i++) {
            val = val * 10;
        }
        return num * val;
    }

    private getRandom() {
        let number = Math.random() * 100;
        return parseInt(number.toString(), 10);
    }
}