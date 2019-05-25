/**************************************
Code by ELECFREAKS co.ltd 
Lionkk 
Software engineer
**************************************/
//% weight=0 color=#000000  icon="\uf26e" block="M5Core"
//% groups='["PORT:C","PORT:B"]'
namespace M5Core {
    export enum Finger_id {
        //% block="Finger1" enumval=1
        Finger_1,
        //% block="Finger2" enumval=2
        Finger_2,
        //% block="Finger3" enumval=3
        Finger_3,
        //% block="Finger4" enumval=4
        Finger_4,
        //% block="Finger5" enumval=5
        Finger_5,
        //% block="Finger6" enumval=6
        Finger_6,
        //% block="Finger7" enumval=7
        Finger_7,
        //% block="Finger8" enumval=8
        Finger_8,
        //% block="Finger9" enumval=9
        Finger_9
    }
    /**
    * TODO: initialization M5Core 
    */
    //% weight=99
    //% blockId=M5Core_init block="Init M5Core for micro:bit"
    //% group=PORT:C
    export function m5core_init(): void {
        serial.redirect(SerialPin.P8, SerialPin.P12, 115200)
    }
    /**
    * TODO: read a new finger for fingerid
    */
    //% weight=98
    //% blockId=m5core_setFinger block="Enter %fingerid fingerprint"
    //% group=PORT:B
    export function m5core_setFinger(fingerid: Finger_id): void {
        let serial_string = "cmd,setFinger," + fingerid + ",1" + "\u000D" + "\u000A"
        serial.writeString(serial_string)
    }
    /**
    * TODO: Judge the specified fingerprint press
    */
    //% weight=97
    //% blockId=m5core_getFinger block="Fingerprint %fingerid is pressed"
    //% group=PORT:B
    export function m5core_getFinger(fingerid: Finger_id): boolean {
        let serial_string_arr: string[] = []
        let serial_string = "req,getFinger,0,0" + "\u000D" + "\u000A"
        let fingeridstr = fingerid + ""
        basic.pause(100)
        serial.writeString(serial_string)
        serial_string = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial_string_arr[0] = serial_string.substr(0, serial_string.indexOf(","))
        serial_string = serial_string.substr(serial_string.indexOf(",") + 1, serial_string.length)
        serial_string_arr[1] = serial_string.substr(0, serial_string.indexOf(","))
        serial_string = serial_string.substr(serial_string.indexOf(",") + 1, serial_string.length)
        serial_string_arr[2] = serial_string.substr(0, serial_string.indexOf(","))
        if (serial_string_arr[0] == "rep") {
            if (serial_string_arr[1] == "getFinger") {
                if (serial_string_arr[2] == fingeridstr) {
                    return true
                } else {
                    return false
                }
            }
        }
        return false
    }
    /**
    * TODO: Clear all saved fingerprints
    */
    //% weight=96
    //% blockId=m5core_clearFinger block="Clear all saved fingerprints"
    //% group=PORT:B
    export function m5core_clearFinger(): void {
        let serial_string = "cmd,clearFinger,0,0" + "\u000D" + "\u000A"
        serial.writeString(serial_string)
    }
	
	
	
	
	
	/***********************************
	serial.writeString("req,getFinger,0,0" + "\u000D" + "\u000A")
    //basic.pause(100)
    serial_string = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    OLED.showStringWithNewLine(serial_string)
    serial_string_arr[0] = serial_string.substr(0, serial_string.indexOf(","))
    serial_string = serial_string.substr(serial_string.indexOf(",") + 1, serial_string.length)
    serial_string_arr[1] = serial_string.substr(0, serial_string.indexOf(","))
    serial_string = serial_string.substr(serial_string.indexOf(",") + 1, serial_string.length)
    serial_string_arr[2] = serial_string.substr(0, serial_string.indexOf(","))
    serial_string = serial_string.substr(serial_string.indexOf(",") + 1, serial_string.length)
    serial_string_arr[3] = serial_string.substr(0, serial_string.length)
    if (serial_string_arr[0] == "rep") {
        if (serial_string_arr[1] == "getFinger") {
            if (serial_string_arr[2] == "1") {
                basic.showIcon(IconNames.Yes)
            } else {
                basic.showIcon(IconNames.No)
            }
        }
    }
	****************************/
	
	
	
}

