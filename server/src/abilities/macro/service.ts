import * as manifest from './manifest.json';
import * as robot from 'robotjs';
import keys from './keys';

// https://github.com/octalmage/robotjs/blob/c9cbd98ec47378dfae62871f0f2830782322b06d/src/robotjs.cc

/**
    Example:
    ```
    robot.keyTap("d", ["command"]);
    robot.keyTap("r", ["command"]);
    robot.typeString("cmd");
    robot.setKeyboardDelay(500);
    robot.keyTap("enter");
    robot.typeString("rundll32.exe user32.dll, LockWorkStation");
    robot.keyTap("enter");
    ```
 */

const mediaToggle = (): void => {
    robot.keyTap(keys.audio.play);
};

const mediaNext = (): void => {
    robot.keyTap(keys.audio.next);
};

const mediaPrev = (): void => {
    robot.keyTap(keys.audio.prev);
};

const desktop = (): void => {
    robot.keyTap("D", keys.modifiers.winkey);    
};

const lorem = (): void => {
    return; // this is the devil lmao
    robot.typeString(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    );
}

export { desktop, lorem, mediaToggle, mediaNext, mediaPrev };
